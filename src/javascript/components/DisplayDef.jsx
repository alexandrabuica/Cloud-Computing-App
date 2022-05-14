import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayDef() {
  const [defs, setDefs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${REACT_APP_API_URL}/dictionary`);
      
      if (result.data.words) {
        let wordsArray = result.data.words;
        wordsArray.reverse();
        setDefs(result.data.words);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="defsDef">
      <div className="text-2xl font-bold mb-4">Words definition summary</div>
      <ul className="-mb-8 max-h-96 overflow-auto">
        {defs.length ? (
          defs.map((def, defIdx) => (
            <li key={defs.entryID}>
              <div className="relative pb-8">
                {defIdx !== defs.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <span
                    className={
                      "h-2 w-2 rounded-full flex items-center justify-center ring-8 ring-white bg-black"
                    }
                  ></span>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">
                        {def.word}
                      </span>
                      <span className="font-medium">
                        {` => ${def.definition}`}
                      </span>
                      <span className="font-medium font-bold text-orange-600">
                        {`PART OF SPEECH: ${def.partOfSpeech}`}
                      </span>
                      <span className="font-medium">{` => `}</span>
                      <span className="font-medium font-bold text-violet-600">
                        {`PHONETICS: ${def.phonetics}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <span>No definitions yet</span>
        )}
      </ul>
    </div>
  );
}

export default DisplayDef;
