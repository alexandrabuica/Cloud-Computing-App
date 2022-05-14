import React from "react";
import axios from "axios";

function WordsSubmit() {
  const handleWordSearch = async (e) => {
    const userName = document.getElementById("userName").value;
    const userMail = document.getElementById("userMail").value;
    const wordSearch = document.getElementById("wordSearch").value;

    let word = wordSearch;

    function insertWordIntoDB(word, definition, partOfSpeech, phonetics) {
      axios.post(`${REACT_APP_API_URL}/dictionary`, {
        word,
        definition,
        partOfSpeech,
        phonetics,
      });
    }

    try {
      let result = await axios.get(
        `${REACT_APP_API_URL}/dictionary/${wordSearch}`
      );

      let definition = "";
      let partOfSpeech = "";
      let phonetics;

      if (result.status === 200) {
        alert(
          `Your word was found in the dictionary:\n============================\nDEFINITION: ${result.data._wordMeanings}\n\rPART OF SPEECH: ${result.data._wordPartsOfSpeech}\n\rPHONETICS: ${result.data._wordPhonetics}`
        );

        word = wordSearch;

        for (let i = 0; i < result.data._wordMeanings.length; i++) {
          definition += result.data._wordMeanings[i] + " ";
        }

        for (let i = 0; i < result.data._wordPartsOfSpeech.length; i++) {
          partOfSpeech += result.data._wordPartsOfSpeech[i] + " ";
        }

        phonetics = result.data._wordPhonetics;

        console.log(
          word + " - " + definition + " - " + partOfSpeech + " - " + phonetics
        );

        insertWordIntoDB(word, definition, partOfSpeech, phonetics);
      } else {
        alert(
          "We could not find a definition for you word. Please try another word."
        );
        return;
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }

    try {
      let response = await axios.post(`${REACT_APP_API_URL}/searches`, {
        userName,
        userMail,
        wordSearch,
      });
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div id="WordsSubmit">
      <div className="text-2xl font-bold mb-4">Get definition</div>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="userName"
            >
              Your name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="userName"
              type="text"
              placeholder="John"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="userMail"
            >
              Your mail
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="userMail"
              type="text"
              placeholder="jane@mail.com"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="wordSearch"
            >
              Search Word
            </label>
            <textarea
              rows={1}
              name="comment"
              id="wordSearch"
              className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800 rounded-md p-5"
              placeholder={"apple"}
            />
          </div>
        </div>
      </form>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize"
        onClick={handleWordSearch}
      >
        Search
      </button>
    </div>
  );
}

export default WordsSubmit;
