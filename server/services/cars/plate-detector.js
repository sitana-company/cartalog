
const os = _os.init();

const file = _req.getFile("file");

if (file == null) {
    _header.status(400);
} else {
    const uid = _uid.generate();

    const storage = _storage.filesystem("public", "cars/photos", `${uid}.jpg`);
    file.save(storage);

    let plate = "";

    if (os.isWindows()) {
        plate = "IH786P0J";
    } else {
        const tempPath = _app.settings.getString("openalpr_temp_path");

        os.directory(tempPath);

        os.command(
            `cp ${storage.absolutePath()} ${uid}.jpg`
        );

        const result = _val.fromJSON(
            os.command(
                `docker run --rm -v ${tempPath}:/data:ro openalpr ` +
                `-c eu --json --ignore_rest ${uid}.jpg`
            ).output()
        );

        os.command(`rm -f ${uid}.jpg`);

        if (!result.isEmpty()) {
            plate = result
                .getValues("results")
                .getValues(0)
                .getString("plate");
        } else {
            _header.status(404);
        }
    }

    const dbCars = _db.search("carro", { "placa": plate });
    let isNew = false;
    let dbCarUid = "";
    if (dbCars.total == 1) {
        const dbCar = dbCars.results.get(0);
        _db.update("carro", dbCar.getInt("carro_id"), {
            "foto": file,
            "ultima_entrada": _db.timestamp()
        });
        dbCarUid = dbCar.getString("carro_uid");
        isNew = dbCar.getInt("carro_modelo_id") == 0;
    } else {
        const dbCarId = _db.insert("carro", {
            "modelo_id": 0,
            "placa": plate,
            "foto": file,
            "ultima_entrada": _db.timestamp()
        });
        dbCarUid = _db.get("carro", dbCarId).getString("uid");
        isNew = true;
    }

    _out.json({
        plate,
        isNew,
        uid: dbCarUid,
        photo: storage.url()
    });
}
