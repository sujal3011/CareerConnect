const app = require('./app');
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});