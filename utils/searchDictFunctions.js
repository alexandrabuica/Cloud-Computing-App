
const express = require('express');
const router = express.Router();

const axios = require('axios');

async function getWordDef(word){
  try {
      let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      let wordMeanings = [];
      let wordPartsOfSpeech = [];
      let meaningsLength = response.data[0].meanings.length;
      for (let i=0; i<meaningsLength; i++) {
          wordMeanings.push(response.data[0].meanings[i].definitions[0].definition)
          wordPartsOfSpeech.push(response.data[0].meanings[i].partOfSpeech)
      }
      let phonetics = response.data[0].phonetics[1].text;
      
      return {
          _wordMeanings: wordMeanings,
          _wordPartsOfSpeech: wordPartsOfSpeech,
          _wordPhonetics: phonetics
      }
  } catch (err) {
      console.warn(err)
  }
}

module.exports = {
  getWordDef
}