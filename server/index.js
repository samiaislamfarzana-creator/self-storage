const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data (replace with a database later)
const units = [
  { id: 'A1', size: '5x5', price: 49, status: 'available' },
  { id: 'A2', size: '5x10', price: 79, status: 'occupied' },
  { id: 'B1', size: '10x10', price: 129, status: 'available' },
];

const customers = [];
const bookings = [];

// Units
app.get('/api/units', (req, res) => res.json(units));

// Customers
app.get('/api/customers', (req, res) => res.json(customers));
app.post('/api/customers', (req, res) => {
  const customer = { id: Date.now().toString(), ...req.body };
  customers.push(customer);
  res.status(201).json(customer);
});

// Bookings
app.get('/api/bookings', (req, res) => res.json(bookings));
app.post('/api/bookings', (req, res) => {
  const { unitId, customerId } = req.body;
  const unit = units.find((u) => u.id === unitId);
  if (!unit || unit.status !== 'available') {
    return res.status(400).json({ error: 'Unit not available' });
  }
  unit.status = 'occupied';
  const booking = { id: Date.now().toString(), unitId, customerId, startDate: new Date().toISOString() };
  bookings.push(booking);
  res.status(201).json(booking);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
