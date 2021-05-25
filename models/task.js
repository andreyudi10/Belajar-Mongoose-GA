const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        // harus ada
        trim: true
    }, 
    completed: {
        type: Boolean,
        // tipenya boolean
        default: false
    }
})

module.exports = Task;