const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

const mysql = require('mysql2');

const connection = mysql.createConnection({
   host: 'localhost',
   user: 'admin',
   password: 'admin1234',
   database: 'angels_of_compassion'
});

connection.connect(err => {
   if (err) {
      console.error('Error connecting to database:', err);
      return;
   }
   console.log('Connected to the database');
});

app.post('/register', async (req, res) => {
   console.log(req.body);
   const { username, email, password } = req.body;

   connection.query('SELECT * FROM users WHERE USER_EMAIL = ?', [email], async (selectErr, selectResults) => {
      if (selectErr) {
         console.error('Error executing query:', selectErr);
         return res.status(500).json({ error: 'Failed to check existing user' });
      }

      if (selectResults.length > 0) {
         return res.status(400).json({ error: 'User with this email already exists.' });
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      const hashedPassword = await bcrypt.hash(password, salt);

      connection.query('INSERT INTO users (USER_NAME, USER_EMAIL, USER_PASSWORD) VALUES (?, ?, ?)', [username, email, hashedPassword], (insertErr, insertResults) => {
         if (insertErr) {
            console.error('Error executing query:', insertErr);
            return res.status(500).json({ error: 'Failed to register user' });
         }
         
         console.log('User registered successfully');
         res.status(200).json({ success: true });
      });
   });
});

app.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      connection.query('SELECT * FROM users WHERE USER_EMAIL = ?', [email], async (err, results) => {
         if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
         }

         if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email' });
         }

         const storedHashedPassword = results[0].USER_PASSWORD;
         const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);
         const username = results[0].USER_NAME;

         if (isPasswordValid) {
            res.status(200).json({ success: true, username: username });
         } else {
            res.status(401).json({ error: 'Invalid password' });
         }
      });
   } catch (error) {
      console.error('Error fetching user from database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.post('/check', async (req, res) => {
   const { email, password } = req.body;

   try {
      connection.query('SELECT * FROM users WHERE USER_EMAIL = ?', [email], async (err, results) => {
         if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
         }

         if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email' });
         }

         const storedHashedPassword = results[0].USER_PASSWORD;
         const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

         if (isPasswordValid) {
            res.status(200).json({ success: true, isPasswordValid: true });
         } else {
            res.status(401).json({ error: 'Invalid password' });
         }
      });
   } catch (error) {
      console.error('Error fetching user from database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.post('/change', async (req, res) => {
   const { email, newPassword } = req.body;

   try {
      connection.query('SELECT * FROM users WHERE USER_EMAIL = ?', [email], async (selectErr, selectResults) => {
         if (selectErr) {
            console.error('Error executing query:', selectErr);
            return res.status(500).json({ error: 'Failed to check existing user' });
         }

         if (selectResults.length === 0) {
            return res.status(404).json({ error: 'User not found' });
         }

         const user = selectResults[0];
         const saltRounds = 10;
         const salt = await bcrypt.genSalt(saltRounds);

         const hashedPassword = await bcrypt.hash(newPassword, salt);
         
         connection.query('UPDATE users SET USER_PASSWORD = ? WHERE USER_EMAIL = ?', [hashedPassword, email], (updateErr, updateResults) => {
            if (updateErr) {
               console.error('Error executing query:', updateErr);
               return res.status(500).json({ error: 'Failed to update password' });
            }

            console.log('Password updated successfully');
            res.status(200).json({ success: true });
         });
      });
   } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.post('/donate', async (req, res) => {
   const { username, amount, emailFrom, emailTo, donationTitle, donationTime, imagePath } = req.body;
   console.log(req.body);

   try {
      connection.query('INSERT INTO donations (USER_NAME, AMOUNT, EMAIL_FROM, EMAIL_TO, DONATION_TITLE, DONATION_TIME, IMAGE_PATH) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, amount, emailFrom, emailTo, donationTitle, donationTime, imagePath], (insertErr, insertResults) => {
         if (insertErr) {
               console.error('Error executing query:', insertErr);
               return res.status(500).json({ error: 'Failed to save donation' });
         }

         console.log('Donation saved successfully');
         res.status(200).json({ success: true });
      });
   } catch (error) {
      console.error('Error saving donation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.post('/showDonationHistory', async (req, res) => {
   const { email } = req.body;
   console.log(email);

   try {
      connection.query('SELECT * FROM users WHERE USER_EMAIL = ?', [email], async (err, userResults) => {
         if (err) {
            console.error('Помилка під час виконання запиту:', err);
            return res.status(500).json({ error: 'Внутрішня помилка сервера' });
         }

         if (userResults.length === 0) {
            return res.status(401).json({ error: 'Невірний email' });
         }

         connection.query('SELECT * FROM donations WHERE EMAIL_FROM = ?', [email], (donationErr, donationResults) => {
            if (donationErr) {
               console.error('Помилка під час виконання запиту:', donationErr);
               return res.status(500).json({ error: 'Внутрішня помилка сервера' });
            }

            console.log(donationResults);
            res.status(200).json({ donations: donationResults });
         });
      });
   } catch (error) {
      console.error('Помилка отримання користувача з бази даних:', error);
      res.status(500).json({ error: 'Внутрішня помилка сервера' });
   }
});