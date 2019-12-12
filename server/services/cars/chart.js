
_out.json(
    _db.query(
        "select "+
        "  marca.nome as brand, "+
        "  ( "+
        "    select "+
        "      count(carro.uid) "+
        "    from carro " +
        "      inner join modelo on carro.modelo_id = modelo.id " +
        "    where modelo.marca_id = marca.id " +
        "  ) as total "+
        "from marca"
    )
);
