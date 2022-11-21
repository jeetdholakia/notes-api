const express = require("express")
const fs = require("fs")
require('.db/mongoose.js')

const app = express()

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({})
        res.status(200).send(notes)
    } catch(err) {
        res.status(500).send(err)
    }
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
        console.log(note)
        if(!note) {
            res.status(404).send(err)
        }
        note.note = req.body.note
        await note.save()
        res.status(200).send(note)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id)
        if(!note) {
            res.status(404).send(err)
        }
        res.status(200).send("Note has been deleted")
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(3000, () => {
    console.log("API Started on port 3000")
})