const connection = require("../configurazione.js");

function index(req, res) {
  let sql = "SELECT * FROM `movies`";

  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    const updatedResults = results.map((movie) => ({
      ...movie,
      image: genMoviesImage(movie.image),
    }));

    res.json(updatedResults);
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
      image: genMoviesImage(moviesResults[0].image),
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

const genMoviesImage = (imageName) => {
  const { APP_HOST, APP_PORT } = process.env;
  return ` ${APP_HOST}:${APP_PORT}/movies_cover/${imageName}`;
};
module.exports = { index, show };
