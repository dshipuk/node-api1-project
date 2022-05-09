// BUILD YOUR SERVER HERE
const express = require("express");
const model = require("./users/model");

const server = express()

server.use(express.json())


// | Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

server.post("/api/users", (req,res) => {
    model.insert(req.body)
        .then(result => {
            if (Object.keys(req.body).length < 2) {
                console.log(Object.keys(req.body).length)
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                res.status(201).json(result)
            }
        })
})

server.get("/api/users", (req,res) => {
    model.find()
        .then(result => {
            if (result == null) {
                res.status(500).json({ message: "There was an error while saving the user to the database" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch( () => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    model.findById(id)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.delete("/api/users/:id", (req,res) => {
    model.remove(req.params.id)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user could not be removed" })
        })
})

server.put("/api/users/:id", (req,res) => {
    model.update(req.params.id, req.body)
        .then(result => {
            if (result == null) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else if (Object.keys(req.body).length < 2) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                res.status(200).json(result)
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The user information could not be modified" })
        })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
