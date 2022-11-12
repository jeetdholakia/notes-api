const mongoose = require('mongoose')

const schema = new mongoose.Schema({ note: 'string'});
const Note = mongoose.model('Note', schema)

module.exports = Note