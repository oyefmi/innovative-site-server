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
          user: 'your-email@outlook.com', // Your Microsoft email address
          pass: 'your-password' // Your Microsoft email password
        }
      });

    const mailOptions = {
        from: `${email}`,
        to: 'recipient@example.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nPhone: ${phoneNumber}\nMessage: ${message}`
      };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email', error);
        res.status(500).json({ message: 'Error sending email' });
        } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  })
