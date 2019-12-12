
const volkswagenId = _db.insertIfNotExists(
    "marca", {
        "nome": "Volkswagen"
    }
);

const bmwId = _db.insertIfNotExists(
    "marca", {
        "nome": "BMW"
    }
);

const fordId = _db.insertIfNotExists(
    "marca", {
        "nome": "Ford"
    }
);

_db.insertIfNotExists(
    "marca", {
        "nome": "Audi"
    }
);

_db.insertIfNotExists(
    "marca", {
        "nome": "Mercedes"
    }
);

_db.insertIfNotExists(
    "marca", {
        "nome": "Fiat"
    }
);

_db.insertIfNotExists(
    "marca", {
        "nome": "Renault"
    }
);

_db.insertIfNotExists(
    "marca", {
        "nome": "Peugeot"
    }
);

_db.insertIfNotExists(
    "modelo", {
        "marca_id": volkswagenId,
        "nome": "Golf"
    }
);

_db.insertIfNotExists(
    "modelo", {
        "marca_id": bmwId,
        "nome": "X1"
    }
);

_db.insertIfNotExists(
    "modelo", {
        "marca_id": bmwId,
        "nome": "Série 8"
    }
);

_db.insertIfNotExists(
    "modelo", {
        "marca_id": fordId,
        "nome": "Focus"
    }
);

