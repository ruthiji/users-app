// imports the express npm module
const express = require("express");
// imports the cors npm module
const cors = require("cors");
const { Sequelize, Model, DataTypes } = require('sequelize');
// Creates a new instance of express for our app
const app = express();


// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


// Define User model
class User extends Model {}
User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

const users = [
    { name: "John Doe",  isAdmin: false, isActive: true},
    { name: "Jane Smith", isAdmin: false, isActive: true},
    { name: "Mike Johnson", isAdmin: false, isActive: true},
    { name: "Sarah Williams", isAdmin: false, isActive: true},
    { name: "David Brown", isAdmin: false, isActive: true}
];


// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());
 // We will be using JSON objects to communcate with our backend, no HTML pages.
app.use(express.json());
// This will serve the React build when we deploy our app
app.use(express.static("react-frontend/dist"));

// This route will return 'Hello Ikea!' when you go to localhost:8080/ in the browser
app.get("/", (req, res) => {
    res.json({ data: 'Hello Ikea!' });
});

app.get('/api/seeds', async (req, res) => {
    users.forEach(u => User.create(u));
    res.json(users);
});

//GET API ENDPOINT
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

//GET BY ID
app.get("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});


//POST method
app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

//PUT or PATCH method
app.put("/api/users/:id", async (req, res) => {
    const { name, isAdmin, isActive } = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({ name, isAdmin, isActive });
    await user.save();
    res.json(user);
});

//DELETE method

app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`});
});



// This tells the express application to listen for requests on port 8080
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});