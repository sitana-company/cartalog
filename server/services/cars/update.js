var carro = _db.queryFirst(
  "SELECT id FROM carro WHERE uid = ?::varchar",
  _val.init().add(_req.getString("carro_uid"))
);

const modelo = _db.get("modelo", _req.getString("modelo_uid"));

_db.update(
  "carro",
  carro.getInt("id"),
  _val.init().set("modelo_id", modelo.getInt("id"))
);

_out.json(true);
