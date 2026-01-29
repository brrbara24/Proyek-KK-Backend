const express = require('express');
const app = express();
const PORT = 3006;
const router = require('./router/router');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

//1. penerapan routing app.METHOD(PATH & HANDLER);
app.use('/', router);

app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`server berjalan di http://localhost:${PORT}`);
})