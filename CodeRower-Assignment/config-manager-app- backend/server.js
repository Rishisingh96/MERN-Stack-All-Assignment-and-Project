const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const configRoutes = require('./routes/configRoutes');

const app = express();

app.use(cors());
app.use(express.json());


connectDB();


app.use('/api', configRoutes);

app.get('/', (req, res) => {
  res.send("API Running...");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));