const express = require('express');
const router = express.Router();
const connection = require('../db');
const mysql = require('mysql');

router.get('/', (req, res) => {
    connection.query("SELECT * FROM searches", (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        return res.json({
            searches: results,
        })
    })
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM searches where entryID = ${mysql.escape(id)} `, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        if(!results.length) {
            return res.status(400).json({
                error: "Searches not found",
            })
        }

        return res.json({
            searches: results,
        })
    })
});

router.post("/", (req, res) => {
    const {
        userName,
        userMail,
        wordSearch
    } = req.body;

    if (!userName || !userMail || !wordSearch) {
        return res.status(400).json({
            error: "All fields are required",
        })
    }

    connection.query(`INSERT INTO searches (userName, userMail, wordSearch) values (${mysql.escape(userName)}, ${mysql.escape(userMail)}, ${mysql.escape(wordSearch)})`, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }

        return res.json({
            results,
        })
    })

});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const {
        userName,
        userMail,
        wordSearch
    } = req.body;
    
    if (!userName || !userMail || !wordSearch) {
        return res.status(400).json({
            error: "All fields are required",
        })
    }

    connection.query(`UPDATE searches SET userName = ${mysql.escape(userName)}, userMail = ${mysql.escape(userMail)}, wordSearch = ${mysql.escape(wordSearch)} WHERE entryID = ${mysql.escape(id)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json({
            results,
        })
    })
});


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM searches where entryID = ${mysql.escape(id)}`, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json({
            results,
        })
    })
});


module.exports = router;
