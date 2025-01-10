const connection = require("../configurazione.js");

function index(req, res) {
  let sql = "SELECT * FROM `movies`";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
}
module.exports = { index };
