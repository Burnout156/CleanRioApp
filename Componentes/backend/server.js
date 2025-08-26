const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cleanrio7@gmail.com", // seu email
    pass: "iece evvd oizw zcyz",       // senha de app do Gmail
  },
});

app.post("/enviar-email", async (req, res) => {
  const { cliente } = req.body;

  const mailOptions = {
    from: "cleanrio7@gmail.com",
    to: "cleanrio7@gmail.com", // pode enviar para outro email
    subject: `Novo Cliente Cadastrado: ${cliente.nome}`,
    text: `
      Nome: ${cliente.nome}
      Telefone: ${cliente.telefone}
      Endereço: ${cliente.endereco}
      Bairro: ${cliente.Bairro}
      Qtd. Ar: ${cliente.qtdAr}
      Marcas: ${cliente.marcasAr.join(", ")}
      Tipo de Serviço: ${cliente.tipoServico}
      Data do Serviço: ${cliente.dataServico}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));