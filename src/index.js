const express = require("express")
const fs = require("fs")
require('./db/mongoose')
const Note = require('./models/note')

const app = express()
app.use(express.json())

app.get('/notes', (req, res) => {
    fs.readFile(__dirname + '/' + "notes.json", 'utf-8', (err, data) => {
        if(err) {
            return console.log(err)
        }
        res.send(data)
    })
})

app.post('/notes', async (req, res) => {
    const note = new Note(req.body)

    try {
        await note.save()
        res.status(201).send(note)
    }
    catch(err) {
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("API Started on port 3000")
})