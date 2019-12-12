var carro = _db.queryFirst(
  "SELECT id FROM carro WHERE uid = ?::varchar",
  _val.init().add(_req.getString("uid"))
);

_db.update(
  "carro",
  carro.getInt("id"),
  _val.init().set("modelo_id", _req.getInt("modelo_id"))
);

_out.json(true);
