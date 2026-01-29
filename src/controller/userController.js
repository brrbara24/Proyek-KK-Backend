const db = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const tampilData = async(req,res) =>{
    try {
        const query = 'SELECT * FROM user';
        const [rows] = await db.query(query);
        await res.status(200).json({
            message: 'berhasil get data user',
            data: rows
        })
    } catch (error) {
        throw error
        
    }
}

const getById = async(req,res) =>{
    try {
        const {id} = req.params;
        const query = 'SELECT * FROM user WHERE id = ?';
        const [rows] = await db.query(query, id);
        await res.status(200).json({
            status: "success",
            message: 'berhasil get data',
            data: rows
        })
    } catch (error) {
        next(error)
    }
}

const createData = async (req, res, next) => {
    try {
        const data = {
            nama: req.body.nama,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
    }
     if (!data.nama || !data.password || !data.email || !data.role) {
            return res.status(400).json({
                status: 'error',
                message: 'nama, email, password, dan role wajib diisi'
            })
        }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const query = 'INSERT INTO user(nama, email, password, role) VALUE (?, ?, ?, ?)';
    await db.execute(query, [data.nama, data.email, hashedPassword, data.role]);
    return res.status(201).json({
        status: "success",
        message: 'registrasi berhasil'
    })
    } catch (error) {
        next(error)
        
    }
}

const loadData = async (req, res, next) => {
    try {
        const data = {
            nama: req.body.nama,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
         if (!data.nama || !data.password || !data.email || !data.role) {
            return res.status(400).json({
                status: 'error',
                message: 'nama, email, password, dan role wajib diisi'
            })
        }

    } catch (error) {
        
    }
}

const updateData = async (req, res) => {
    try {
        const {id} = req.params;
        const data= {
            nama: req.body.nama,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }
        const query = 'UPDATE user SET nama = ?, email = ?, password=?, role=? WHERE id = ?';
        await db.execute(query, [data.nama, data.email, data.password, data.role, id]);
        return res.status(200).json({
            message: 'berhasil update data'
        })
    } catch (error) {
        throw error
    }
}

const deleteData = async (req, res) =>{
    try {
        const {id}=req.params;
        const query = 'DELETE FROM user WHERE id = ?'
        await db.query(query, id);
        return res.status(201).json({
            message: 'berhasil delete data!'
        })
    } catch (error) {
        throw error
        
    }
}

module.exports = {
    tampilData,
    createData,
    updateData,
    deleteData,
    getById
}