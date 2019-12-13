// _core : mail
// _core : sms

const mail = new Mail(_req.getString("carro_uid"));
const sms = new SMS(_req.getString("carro_uid"))

const carro = _db.queryFirst(
  "SELECT id FROM carro WHERE uid = ?::varchar",
  _val.init().add(_req.getString("carro_uid"))
);

if (_req.getString("modelo_uid") != "undefined") {
    const modelo = _db.get("modelo", _req.getString("modelo_uid"));

    _db.update(
      "carro",
      carro.getInt("id"),
      _val.init().set("modelo_id", modelo.getInt("id"))
    );
    
    mail.send();
    sms.send();
}

_out.json(carro);
