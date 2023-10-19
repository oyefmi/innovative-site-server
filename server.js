const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-email', (req, res) => {
    const { name, email, phoneNumber, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Microsoft's SMTP server
        port: 587, // Port for TLS
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'info@isithreecs.org', 
          pass: 'gtxhzkfgsbqkqddc' 
        },
        debug: true,
        logger: true

      });

    const mailOptions = {
        from: 'info@isithreecs.org',
        to: 'info@isithreecs.org',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nPhone: ${phoneNumber}\nMessage: ${message}`
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email', error);
        res.status(500).json({ message: 'Error sending email' });
        } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.use('/', (req, res) => {
  res.send('server is working')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})
