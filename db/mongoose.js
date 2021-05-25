const mongoose = require('mongoose');
//untuk database pake ini

mongoose.connect('mongodb://127.0.0.1:27017/database-mongoose', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})