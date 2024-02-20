const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());

app.use(bodyParser.json());

// Define a POST endpoint to receive data from the frontend
app.post('/send-email', async (req, res) => {
    try {
        // Read the HTML email template with .hbo extension
        const template = fs.readFileSync('emailTemplate.hbo', 'utf8');

        // Extract data from the request body sent by the frontend
        const { subject, name, balance, recipientEmail } = req.body;

        // Replace placeholders in the template with actual data
        const htmlEmail = template
            .replace('{subject}', subject)
            .replace('{name}', name)
            .replace('{balance}', balance);

        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Your SMTP host (e.g., smtp.gmail.com)
            port: 587, // Your SMTP port (e.g., 587 for TLS or 465 for SSL)
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'rajeshchintu2000@gmail.com', // Your email address
                pass: 'jfaj lpdm fwme mwrs' // Your email password
            }
        });

        // Setup email data
        const mailOptions = {
            from: '"rajesh" <rajeshchintu2000@gmail.com>', // sender address
            to: recipientEmail, // recipient's email address
            subject: subject, // Subject line
            html: htmlEmail // HTML email content
        };

        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





//JSON

// {
//     "subject":"repost",
//     "name":"suvendu",
//     "balance":"2000",
//     "recipientEmail":"tana@yopmail.com"
// }
