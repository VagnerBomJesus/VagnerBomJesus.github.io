const express = require("express");
const createError = require("http-errors");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index.ejs", {});
});

app.get('/cv', (req, res) => {
  res.render('cv', {});
});
app.use((req, res, next) => {
  next(createError(404, "Página Não Encontrada"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status === 404) {
    // Serve a página 404.html para erros 404
    res.sendFile(__dirname + "/public/404.html");
  } else {
    // Responde com json para outros erros
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  }
});

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

module.exports = app;
