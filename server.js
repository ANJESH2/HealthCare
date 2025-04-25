const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for users and appointments
let users = [];
let appointments = [];

// Example of a basic test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Register route
app.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ email, password, role });
  res.json({ message: 'Registered successfully' });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ message: 'Login successful', email, role });
});

// Route to handle appointment booking
app.post('/appointments', (req, res) => {
    const { doctorId, problem, appointmentDate, patientEmail } = req.body;

    // Store the appointment in memory
    const appointment = { doctorId, problem, appointmentDate, patientEmail };
    appointments.push(appointment);

    console.log('Appointment booked:', appointment);  // Log to verify

    res.json({ message: 'Appointment booked successfully!' });
});

// Route to view all appointments for a specific patient
app.get('/appointments/:email', (req, res) => {
    const patientEmail = req.params.email;
    const patientAppointments = appointments.filter(app => app.patientEmail === patientEmail);
    
    res.json(patientAppointments);  // Send back the patient-specific appointments
});

// Fetch available doctors (mock data for now)
app.get('/api/doctors', (req, res) => {
    const doctors = [
        { id: '1', name: 'Dr. Smith', specialization: 'Cardiologist' },
        { id: '2', name: 'Dr. Johnson', specialization: 'Neurologist' },
        { id: '3', name: 'Dr. Lee', specialization: 'Dermatologist' }
    ];
    res.json(doctors);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
