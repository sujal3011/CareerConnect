const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);

module.exports = app;
