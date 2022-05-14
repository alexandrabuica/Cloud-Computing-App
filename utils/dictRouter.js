const express = require('express');
const router = express.Router();  
const connection = require('../db');
const mysql = require('mysql');

const { getWordDef } = require('./searchDictFunctions');

router.get('/:word', async (req,res)=> {
    const { word } = req.params;
  try{ 
    let wordDescription = await getWordDef(word);
    
    res.status(200).json(wordDescription);
  }catch(e){ 
    res.status(500).json({ message: "Could not retrieve data" });
  }
});

router.get('/', (req, res) => {
  connection.query("SELECT * FROM words", (err, results) => {
      if (err) {
          console.log(err);
          return res.send(err);
      }

      return res.json({
          words: results,
      })
  })
});

router.post("/", (req, res) => {
  const {
      word,
      definition,
      partOfSpeech,
      phonetics
  } = req.body;

  if (!word || !definition || !partOfSpeech || !phonetics) {
      return res.status(400).json({
          error: "All fields are required",
      })
  }

  connection.query(`INSERT INTO words (word, definition, partOfSpeech, phonetics) values (${mysql.escape(word)}, ${mysql.escape(definition)}, ${mysql.escape(partOfSpeech)}, ${mysql.escape(phonetics)})`, (err, results) => {
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