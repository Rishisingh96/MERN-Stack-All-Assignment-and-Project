const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//test routes
app.get('/', (req,res) =>{
    res.send('API Running...');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server running on address http://localhost:${PORT}`);
});