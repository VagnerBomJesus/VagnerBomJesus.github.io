// Assegure-se de instalar com npm install dotenv
const express = require("express");
const nodemailer = require("nodemailer");
const createError = require("http-errors");
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.get("/", (req, res) => {
  res.render("index.ejs", {});
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Mensagem de ${name}`,
    text: `Você recebeu uma mensagem de ${name} (${email}): ${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email enviado: " + info.response);
      res.send("sent");
    }
  });
});

app.get("/cv", (req, res) => {
  res.render("cv", {});
});

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
// Rota para a página de Login
app.get("/login", (req, res) => {
  res.render("login");
});

// Rota para a página de Registro
app.get("/register", (req, res) => {
  res.render("register");
});

// Rota para a criação de Blog
app.get("/create-blog", (req, res) => {
  res.render("create_blog");
});

// Rota para adicionar Comentários em um Blog específico
app.get("/add-comment/:blogId", (req, res) => {
  const blogId = req.params.blogId;
  res.render("add_comment", { blogId: blogId });
});

app.get("/cv", (req, res) => {
  res.render("cv", {});
});
app.use((req, res, next) => {
  next(createError(404, "Página Não Encontrada"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("404.ejs", { error: err });
});

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

module.exports = app;
