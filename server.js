const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Replace these values with your actual email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'monu56410000@gmail.com',
    pass: 'pzhosdarniuynrds'
  }
});

app.post('/send-email', (req, res) => {
  const { username, phone, address, weight, product } = req.body;

  const mailOptions = {
    from: 'monu56410000@gmail.com',
    to: 'deshibullmurhu@gmail.com', // Replace with the actual dealer's email
    subject: 'New Pickup Scheduled',
    html: `
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Weight:</strong> ${weight} kg</p>
      <p><strong>Product:</strong> ${product}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
