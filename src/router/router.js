const express = require('express');
const router = express.Router();
const basoController = require('../controller/basoController');
const userController = require('../controller/userController');
const auth = require('../middlewares/auth');

router.get('/api', (req,res) =>{
    res.send('Selamat datang di API SMK Telkom kota Makassar');
})

//2. parameter routing
router.get('/data/:id', (req, res)=>{
    const { id } = req.params;
    res.send(`Anda sedang melihat data ${id}`)
})

//4. implementasi get
router.get('/produk', auth, basoController.tampilData);

//5. implementasi post
router.post('/produk/register', auth, basoController.createData);

//6. implementasi put
router.put('/produk/:id', auth, basoController.updateData);

// 7. implementasi delete
router.delete('/produk/:id', auth, basoController.deleteData);

// 8. implementasi get by id
router.get('/produk/:id', auth, basoController.getById);

router.get('/user', auth, userController.tampilData);
router.post('/user/register', auth, userController.createData);
router.put('/user/:id', auth, userController.updateData);
router.delete('/user/:id', auth, userController.deleteData);
router.get('/user/:id', userController.getById)

router.post('/user/login', userController.login);

module.exports = router