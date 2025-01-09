//Moduli
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Aplikacioni
const app = express();

//export to json
app.use(express.json());
//Porti i serverit

const PORT = 3000;


//Konektimi me databazen
mongoose.connect('mongodb://localhost:27017/singupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log('Database connection error', err);
});

//Skema e databazes
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true}
});

//Modeli i databazes
const User = mongoose.model('User', userSchema);

//eshte per te bere te mundur qe te marrim te dhenat nga formulari
app.post('/api/signup', (req, res) => {

    const{name, email, password, phone} = req.body;

    const newUser = new User({  name, email, password, phone});
    newUser
    .save()
    .than(() => {
        res.send('Useri eshte regjistruar me sukses');
    })
    .catch((err) => {
        console.log("Ska shku mir diqka" + err.mesaage);
    });
});

//Serveri ne te cilin port eshte duket u bere runing
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

