var db = _db.init("netuno-wp")

_out.json(db.query("select post_title from wp_posts limit 10"))