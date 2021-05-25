require('./db/mongoose');
const express = require('express');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT || 3000;
// belum pake process.env.PORT, logika or jadi dapetnya 3000

app.use(express.json());
// adalah inbuilt method di express untuk mengenali objek request yang datang sebagai 
// objek JSON. metode ini dipanggil sebagai middleware dalam aplikasimu menggunakan kode
// app.use(express.json()) 
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded#:~:text=json()%20is%20a%20method,use(express.&text=strings%20or%20arrays.-,This%20method%20is%20called%20as%20a%20middleware,application%20using%20the%20code%3A%20app.

// kemudian perkenalkan routernya di app.js
app.use(userRouter);
app.use(taskRouter);

// gunakan app.listen(port,fungsi)
// untuk menjalankan express js
app.listen(port, () => {
    console.log(`Server berjalan di localhost://${port}`);
});

// melihat package.json jalankan server menggunakan npm run dev

