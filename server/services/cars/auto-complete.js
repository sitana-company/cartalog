var text = _req.getString("text")
_out.json(
    _db.query(
        "select " +
        "  modelo.uid, " +
        "  marca.nome as brand, "+
        "  modelo.nome as model "+
        "from modelo " +
        "  inner join marca on modelo.marca_id = marca.id " +
        "where modelo.nome like concat(concat('%', ?::varchar), '%') "+
        "  or marca.nome like concat(concat('%', ?::varchar), '%') ",
        _val.init().add(text).add(text)
    )
)
