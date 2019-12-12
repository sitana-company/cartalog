
const os = _os.init();

if (os.isWindows()) {
    _out.json({ "plate": 'IH786P0J' });
} else {
    os.directory("/usr/local/temp");

    const result = _val.fromJSON(
        os
            .command(
                "docker run --rm -v /usr/local/temp:/data:ro openalpr " +
                "-c eu --json --ignore_rest test-1.jpg"
            )
            .output()
    );

    if (!result.isEmpty()) {
        const plate = result
            .getValues("results")
            .getValues(0)
            .getString("plate");
        _out.json({ plate });
    } else {
        _header.status(404);
    }
}
