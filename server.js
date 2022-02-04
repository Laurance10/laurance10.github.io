const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

let initialPath = path.join(__dirname, "public");
let app = express();

app.use(express.static(initialPath));
app.use(express.json());

// Rota para o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})

// Configurações do envio de email - Formulário de contato
app.post('/mail', (req, res) => {
    const { firstname, lastname, email, msg } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: 'sender email',
        to: 'receiver email',
        subject: 'Novo contato',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err);
            res.json('Ops, um erro ocorreu. Por favor, tente novamente :)')
        } else {
            res.json('Obrigado por entrar em contato comigo! Em até 2 dias, retornarei a sua mensagem.')
        }
    })
})

// Ligando o servidor na porta: 3000
app.listen(3000, () => {
    console.log('Listening...');
})