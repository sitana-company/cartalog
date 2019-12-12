
const os = _os.init();

const file = _req.getFile("file")
if (file == null) {
    _header.status(400);
} else {
    const uid = _uid.generate();
    const storage = _storage.filesystem("public", "car/photos", uid +".jpg");
    file.save(storage);
    if (os.isWindows()) {
        _out.json({"plate": 'IH786P0J'});
    } else {
        os.directory("/usr/local/temp");

        os.command(
            "mv " + storage.absolutePath() +
            " "+ uid +".jpg"
        )

        const result = _val.fromJSON(
            os
                .command(
                    "docker run --rm -v /usr/local/temp:/data:ro openalpr " +
                    "-c eu --json --ignore_rest "+ uid +".jpg"
                )
                .output()
        );

        os.command("trash-put "+ uid +".jpg");

        if (!result.isEmpty()) {
            const plate = result
                .getValues("results")
                .getValues(0)
                .getString("plate");
            _out.json({plate});
        } else {
            _header.status(404);
        }
    }
}
