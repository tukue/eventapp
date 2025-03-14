const express = require('express');
const  cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
const sequelize = require('./config/database')
require('dotenv').config(); // Load environment variables

const app = express();

// Enable CORS for all routes
app.use(cors());  

const PORT = process.env.PORT || 5000;

app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});