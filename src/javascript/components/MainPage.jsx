import React from "react";
import Header from "./Header";
import WordsList from "./WordsList";
import WordsSubmit from "./WordsSubmit";
import DisplayDef from "./DisplayDef";

function MainPage(props) {
  return (
    <div id="MainPage">
      <Header title={"Dictionary App"} />
      <div className="flex max-w-7xl m-auto px-14 py-7">
        <div className="w-1/2 pr-5">
          <WordsList />
        </div>
        <div className="w-1/2 pl-5">
          <WordsSubmit />
        </div>
      </div>
      <div className="flex max-w-5xl m-auto px-4 py-4 justify-center max-h-64 overflow-y-auto">
        <div>
          <DisplayDef />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
