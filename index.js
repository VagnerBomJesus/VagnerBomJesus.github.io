const express = require("express");
const nodemailer = require('nodemailer');
const createError = require("http-errors");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true })); // Para parsing application/x-www-form-urlencoded
app.use(express.json()); // Para parsing application/json

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use outros como Outlook, Yahoo, etc., ou SMTP direto
  auth: {
    user: 'vagneripg@gmail.com',
    pass: 'sua-senha'
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs", {});
});


app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: 'vagneripg@gmail.com',
    to: 'vagneripg@gmail.com',
    subject: `Mensagem de ${name}`,
    text: `Você recebeu uma mensagem de ${name} (${email}): ${message}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('error'); // ou renderizar uma página de erro
    } else {
      console.log('Email enviado: ' + info.response);
      res.send('sent'); // ou renderizar uma página de sucesso
    }
  });
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
