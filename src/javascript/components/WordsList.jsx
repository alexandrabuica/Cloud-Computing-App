import React, { useState, useEffect } from "react";
import axios from "axios";

function WordsList() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${REACT_APP_API_URL}/searches`);

      if (result.data.searches) {
        let searchesArray = result.data.searches;
        searchesArray.reverse();
        setWords(result.data.searches);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="WordsList">
      <div className="text-2xl font-bold mb-4">Latest searches</div>
      <ul className="-mb-8 max-h-96 overflow-auto">
        {words.length ? (
          words.map((word, wordIdx) => (
            <li key={words.entryID}>
              <div className="relative pb-8">
                {wordIdx !== words.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <span
                    className={
                      "h-4 w-4 rounded-full flex items-center justify-center ring-8 ring-white bg-blue-500"
                    }
                  ></span>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {word.userName}
                      </span>
                      <span className="font-medium font-bold">
                        {` searched a word in the dictionary: ${word.wordSearch}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <span>No words yet</span>
        )}
      </ul>
    </div>
  );
}

export default WordsList;
