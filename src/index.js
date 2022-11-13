const express = require("express")
const fs = require("fs")
require('./db/mongoose')
const Note = require('./models/note')

const app = express()
app.use(express.json())


app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({})
        res.status(200).send(notes)
    } catch(err) {
        res.status(500).send(err)
    }
    
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
    } catch(err) {
        res.status(500).send(err)
    }
})

app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            res.status(404).send(err)
        }
        note.note = req.body.note
        await note.save()
        req.status(200).send(note)
    } catch (err) {
        res.status(404).send(err)
    }
})

app.listen(3000, () => {
    console.log("API Started on port 3000")
})