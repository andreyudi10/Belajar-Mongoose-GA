const mongoose = require('mongoose');
// gak ada findById tapi kok bisa task.js import findById dari sini ya
// sedangkan model.js pakek findById tapi gak perlu import

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