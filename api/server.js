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
        .then(result => res.status(201).send(result))
})

server.get("/api/users", (req,res) => {
    model.find()
        .then(result => {
            res.status(200).json(result)
        })
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    model.findById(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send({err})
        })
})

server.delete("/api/users/:id", (req,res) => {
    model.remove(req.params.id)
        .then(result => res.json(result))
})

server.put("/api/users/:id", (req,res) => {
    model.update(req.params.id, req.body)
        .then(result => {
            res.status(201).json(result)
        })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
