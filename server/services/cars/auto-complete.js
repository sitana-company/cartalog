var text = _req.getString("text")
_out.json(
    _db.query(
        "select "+
        "  carro.uid, " +
        "  marca.nome as brand, "+
        "  modelo.nome as model, "+
        "  carro.placa as plate " +
        "from carro " +
        "  inner join modelo on carro.modelo_id = modelo.id " +
        "  inner join marca on modelo.marca_id = marca.id " +
        "where carro.placa like concat(concat('%', ?::varchar), '%') "+
        "  or modelo.nome like concat(concat('%', ?::varchar), '%') "+
        "  or marca.nome like concat(concat('%', ?::varchar), '%') ",
        _val.init().add(text).add(text).add(text)
    )
)
