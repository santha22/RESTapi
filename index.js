const express =  require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

let users = [
    {id: 1, name: "jane", age: 20},
    {id: 2, name: "john", age: 22},
    {id: 3, name: "sk", age: 25}
]

// GET route, get all users
app.get("/users", (req, res) => {
    res.json(users);
});


// GET route, get by user id  
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } 
    else {
        res.status(404).send("user not found");
    }
})

// POST Route, post new user 
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
    };

    users.push(newUser);
    res.status(201).json(newUser);
    console.log("users", users);
    
})


// PUT Route, update existing user data 
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        user.name = req.body.name;
        user.age = req.body.age;
        res.json(user);
        console.log("users", users);
        
    } else {
        res.status(404).send("user not found");
    }
})

// DELETE route, 
app.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
        console.log(users);
        
    } else {
        res.status(404).send("user not found");
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    
});
