// Assegure-se de instalar com npm install dotenv
require('dotenv').config();
const express = require("express");
const nodemailer = require("nodemailer");
const createError = require("http-errors");
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 8080;

// Configuração da sessão
app.use(session({
  secret: 'THEVBJ',  // Uma chave secreta para assinar a sessão
  resave: false,      // Evita o ressalvamento da sessão se não houve mudanças
  saveUninitialized: false,   // Evita salvar sessões não inicializadas
  cookie: {
    secure: app.get('env') === 'production', // TRUE para produção com HTTPS, FALSE para desenvolvimento
    maxAge: 1000 * 60 * 60 * 24 // Duração da sessão em milissegundos (1 dia neste caso)
  }
}));

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

// Rota para a página de CV
app.get("/cv", (req, res) => {
  res.render("cv", {});
});

// Rotas de usuário e blog
app.use("/", userRoutes);
app.use("/", blogRoutes);

// Rota para a página de Login
app.get("/login", (req, res) => {
  res.render('login', { error: null });
});

// Rota para a página de Registro
app.get("/register", (req, res) => {
  res.render("register");
});

app.get('/profile', (req, res) => {
  if (!req.session.user) {
      return res.status(401).send("Acesso negado");
  }
  res.render('profile', { user: req.session.user });
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

// Middleware de erro 404
app.use((req, res, next) => {
  next(createError(404, "Página Não Encontrada"));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error.ejs", { error: err });
});

// Iniciando o servidor
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

module.exports = app;
