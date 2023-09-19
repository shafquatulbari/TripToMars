const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();

const YOUR_EMAIL = process.env.EMAIL;
const YOUR_PASSWORD = process.env.PASSWORD;
const uri = process.env.MONGODB_URI;

const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);

let reservationsCollection;

if (!YOUR_EMAIL || !YOUR_PASSWORD || !uri) {
    console.error("Environment variables are not set correctly.");
    process.exit(1);
}

client.connect()
    .then(() => {
        reservationsCollection = client.db("test").collection("reservations");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB", err);
    });
const transporter = nodemailer.createTransport({
    service: 'gmail',  // or another service
    auth: {
        user: YOUR_EMAIL,
        pass: YOUR_PASSWORD
    }
});
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).send('Internal Server Error');
});

app.post('/reserve', async (req, res) => {
    const { email, gender, eventName, eventDate } = req.body;
    
    try {
        // Insert into database
        await reservationsCollection.insertOne({ email, gender, eventName, eventDate });
        console.log("Successfully inserted into database");

        const mailOptions = {
            from: YOUR_EMAIL,
            to: YOUR_EMAIL,  // You're sending email to yourself
            subject: `Reservation for ${eventName}`,
            text: `User Email: ${email}\nGender: ${gender}\nEvent: ${eventName}\nEvent Date: ${eventDate} \nhttps://forms.gle/bEaHiXKTGBa4e4Xs6`
        };

        // Sending email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully!');

    } catch (error) {
        console.error("Error:", error);
        
        // If error is related to MongoDB, respond with database error
        if (error.name && error.name === 'MongoError') {
            return res.status(500).send('Error storing data.');
        }

        // If error is related to Nodemailer, respond with email error
        if (error.responseCode) {
            return res.status(500).send('Error while sending email.');
        }

        // General error
        res.status(500).send('An error occurred.');
    }
});



const PORT = 3002;
