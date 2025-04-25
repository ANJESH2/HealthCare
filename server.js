
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const users = [];
const appointments = [];


// Example of a basic test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});



app.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ email, password, role });
  res.json({ message: 'Registered successfully' });
});

app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', email, role });
});

app.post('/appointments', (req, res) => {
  const { doctor, date, time, problem, patientEmail } = req.body;
  appointments.push({ doctor, date, time, problem, patientEmail });
  res.json({ message: 'Appointment booked' });
});

app.get('/appointments/:email', (req, res) => {
  const patientEmail = req.params.email;
  const result = appointments.filter(app => app.patientEmail === patientEmail);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
