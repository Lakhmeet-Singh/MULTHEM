const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/send_email', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  });

  const mailOptions = {
    from: `${req.body.firstName} ${req.body.lastName} <${req.body.email}>`,
    to: 'recipient@example.com',
    subject: req.body.subject,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Message could not be sent.');
    } else {
      console.log('Message sent: ' + info.response);
      res.status(200).send('Message sent.');
    }
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));