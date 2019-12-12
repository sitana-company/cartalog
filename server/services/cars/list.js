
const query = ""+
    "select "+
    "  carro.uid, "+
    "  marca.nome as brand, "+
    "  modelo.nome as model, "+
    "  carro.placa as plate " +
    "from carro " +
    "  inner join modelo on carro.modelo_id = modelo.id " +
    "  inner join marca on modelo.marca_id = marca.id";

_out.json({
        "items": _db.query(
            query
        ),
        "total": _db.queryFirst(
            "select count(1) as total from ("+ query +") as results"
        ).getInt("total")
    }
);

/*
var columnOrder = ""
if (_req["sortField"] == "brand") {
    columnOrder = "marca.nome"
} else if (_req["sortField"] == "model") {
    columnOrder = "modelo.nome"
} else if (_req["sortField"] == "plate") {
    columnOrder = "carro.nome"
}

var columnOrderDirection = "asc"
if (_req["sortOrder"] == "descend") {
    columnOrderDirection = "desc"
}

if (columnOrder != "") {
    query += " order by "+ columnOrder +" "+ columnOrderDirection
}
 */