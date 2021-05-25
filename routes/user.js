const express = require('express');
const User = require('../models/user');
// ambil kelas user
const router = new express.Router();
// ini bikin dari blueprint kelas express.Router()
//mirip denga react-router-dom di react

router.post('/users', async (req, res) => {
    // async karena dari sananya mongodb async
    const user = new User(req.body);
    //bikin blueprint dari skema User lalu dia kirim user
    try {
        await user.save();
        // maksudnya pake user.save() itu bagaimana ya?
        // kenapa pake await baca dokumentasi aga bingung2
        // https://mongoosejs.com/docs/promises.html 
        res.status(201).sendStatus(user);
        // gunakan res (variabel kedua) dan kasih status 201 kemudian kirim objek user
    } catch (err) {
        res.send(400).send(err);
        // jika eror kirim dengan status 400 dan masukin status err nya apa.
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        // nunggu fungsi find selese jalan baru dia res.send(users) ya
        res.send(users)
    } catch (err) {
        res.send(500).send(err);
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if(!user) {
            throw res.status(404).send();
            // kosong? iyalah kan yang di send itu user yang dibawah
        }
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.patch('/users/:id', async (req, res) => {
    // pelajarin patch
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    //yang diperbolehkan update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    // pakek fungsi every
    // https://www.w3schools.com/jsref/jsref_every.asp#:~:text=The%20every()%20method%20checks,not%20check%20the%20remaining%20values)
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
        // findByIdAndUpdate(id, update, callback)
        if(!user) {
            throw res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
        // findByIdAndDelete(id)
        if(!user) {
            throw res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;