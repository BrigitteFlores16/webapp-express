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
function show(req, res) {
  const id = parseInt(req.params.id);
  const sqlMovie = `
        SELECT movies.*, reviews.name AS review_name, reviews.vote AS review_vote, reviews.text AS review_text
        FROM movies
        INNER JOIN reviews ON reviews.movie_id = movies.id
        WHERE movies.id = ?;
      `;

  connection.query(sqlMovie, [id], (err, moviesResults) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (moviesResults.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const movie = {
      id: moviesResults[0].id,
      title: moviesResults[0].title,
      content: moviesResults[0].content,
      reviews: [],
    };

    moviesResults.forEach((result) => {
      movie.reviews.push({
        name: result.review_name,
        vote: result.review_vote,
        text: result.review_text,
      });
    });

    const votes = movie.reviews.map((review) => review.vote).join(", ");

    res.json({
      ...movie,
      votes: votes,
    });
  });
}

module.exports = { index, show };
