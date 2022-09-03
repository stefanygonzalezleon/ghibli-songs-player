const mongoose = require('mongoose')
const Song = mongoose.model('Song', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    artistName: {
        type: String,
        required: true,
        trim: true
    },
    genres:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    fileName: {
        type: String,
        required: true
    },
    cover:{
        type: String,
        required: true
    }
})

module.exports = Song