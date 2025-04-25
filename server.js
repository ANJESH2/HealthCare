const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Example data (for testing)
const users = [];
const appointments = [];
const doctors = [
  { id: 1, name: 'Dr. Smith', specialization: 'Cardiologist' },
  { id: 2, name: 'Dr. Johnson', specialization: 'Dermatologist' }
];

// Basic test route (for verifying backend functionality)
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Register a new user (doctor, nurse, or patient)
app.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ email, password, role });
  res.json({ message: 'Registered successfully' });
});

// User login (doctor, nurse, or patient)
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', email, role });
});

// Booking an appointment
app.post('/appointments', (req, res) => {
  const { doctorId, problem, appointmentDate, patientEmail } = req.body;
  const doctor = doctors.find(d => d.id === doctorId);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  
  appointments.push({ doctor: doctor.name, specialization: doctor.specialization, problem, appointmentDate, patientEmail });
  res.json({ message: 'Appointment booked successfully!' });
});

// Get all appointments for a specific patient
app.get('/appointments/:email', (req, res) => {
  const patientEmail = req.params.email;
  const result = appointments.filter(app => app.patientEmail === patientEmail);
  res.json(result);
});

// Get all available doctors (for frontend to display)
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
