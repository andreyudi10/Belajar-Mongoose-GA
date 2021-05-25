const mongoose = require('mongoose');
const validator = require('validator');

// persiapan untuk yang mau dikirim nanti
const User = mongoose.model('User', {
    //buat class User menggunakan fungsi mongoose
    // const KelasBaru = mongoose.model("nama_kelas", {isinya})
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        //harus ada
        trim: true,
        // apakah dipotong? memastikan string yang kamu simpan
        // melalui skema dengan proper di trim
        // ex "   hello" input jadinnya "hello"
        lowercase: true,
        //jadi lowercase
        validator(value) {
            // pake library luar untuk validasi email
            // https://www.npmjs.com/package/validator
            if(validator.isEmail(value)) {
                throw new Error('Email is invalid!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        // minimal 7 karakter klo kurang dia throw error
        trim: true,
        validator(value) {
            if(value.toLowerCase().include('password')) {
                // ga bisa ada kata password di inputan password
                throw new Error('Password cannot contain word "password"!');
            }
        }
    },
    age: {
        type: Number,
        // harus angka
        default: 0,
        // nilai angka defaultnya
        validator(value) {
            if(value < 0) {
                throw new Error('Age must be number!')
            }
        }
    }
})

module.exports = User;