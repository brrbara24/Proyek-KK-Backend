const db = require('../config/db.js')
const bcrypt = require('bcrypt')

const tampilData = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM products';
        const [rows] = await db.query(query);
        await res.status(200).json({
            status: "success",
            message: 'berhasil get data',
            data: rows
        })
    } catch (error) {
        next(error)

    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM products WHERE id = ?';
        const [rows] = await db.query(query, id);
        if (rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "data tidak ditemukan"
            });
        }
        return res.status(200).json({
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
            harga: req.body.harga
        }
        if (!data.nama || !data.harga) {
            return res.status(401).json({
                status: "error",
                message: "nama dan harga wajib diisi"
            })
        }

if (typeof data.harga !== "number" || isNaN(data.harga)) {
      return res.status(400).json({
        message: "harga harus berupa angka (number)",
      });
    }
        const query = 'INSERT INTO products(nama, harga) VALUE (?, ?)';
        await db.execute(query, [data.nama, data.harga]);
        return res.status(201).json({
            status: "success",
            message: 'registrasi berhasil'
        })
    } catch (error) {
        next(error)

    }
}

const updateData = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = {
            nama: req.body.nama,
            harga: req.body.harga
        }

        if (!data.nama || !data.harga) {
            return res.status(400).json({
                message: "nama dan harga wajib diisi"
            })
        }

if (typeof data.harga !== "number" || isNaN(data.harga)) {
      return res.status(400).json({
        message: "harga harus berupa angka (number)",
      });
    }

        const query = 'UPDATE products SET nama = ?, harga = ? WHERE id = ?';
        await db.execute(query, [data.nama, data.harga, id]);
        return res.status(200).json({
            status: "success",
            message: 'berhasil update data'
        })
    } catch (error) {
        next(error)
    }
}

const deleteData = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM products WHERE id = ?'
        await db.query(query, id);
        return res.status(201).json({
            status: "success",
            message: 'berhasil delete data'
        })
    } catch (error) {
        next(error)

    }
}

module.exports = {
    tampilData,
    createData,
    updateData,
    deleteData,
    getById
}