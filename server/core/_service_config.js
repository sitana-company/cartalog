
/**
 *  When service need public access...
 */
if (_env.is("dev")) {
    _service.allow()
}

if (_service.path == 'cars/auto-complete'
    || _service.path == 'cars/plate-detector') {
    _service.allow()
}

/**
 * Firebase Listeners
 */
if (_service.path.startsWith("firebase/listener/")
    && _config.getString("_firebase:listener_secret") == _req.getString("secret")) {
    _service.allow()
}

/**
 * Cron Jobs
 */
if (_service.path.startsWith("jobs/")
    && _config.getValues("_cron:jobs")
        .find("name", _service.path.substring("jobs/".length))
        .getValues("params")
        .has("secret", _req.getString("secret"))) {
    _service.allow()
}
