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
        res.status(201).send(user);
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
        }
        res.send(user);
    } catch (err) {
        res.status(500).send();
    }
})

router.patch('/users/:id', async (req, res) => {
    // pelajarin patch
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    //yang diperbolehkan update
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'});
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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
        if(!user) {
            throw res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;