"use client";

import { useState, useEffect } from "react";
import Typo from "typo-js";

const dictionary = new Typo("no-names", null, null, {
  dictionaryPath: "dictionaries",
});

export default function Home() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const checkSpelling = async () => {
      if (!dictionary.check(input)) {
        const nearestSuggestion = await dictionary.suggest(input)[0];
        setSuggestion(nearestSuggestion);
      } else {
        setSuggestion("");
      }
    };

    checkSpelling();
  }, [input]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="hero">
        <h1 className="text-4xl font-bold">
          spellcheck but it doesn&apos;t know names
        </h1>
      </div>
      <div className="result-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="text-center text-black"
        />
        {suggestion && (
          <p className="text-red-500 text-center my-10">{`Did you mean "${suggestion}"?`}</p>
        )}
      </div>

      <div></div>
    </div>
  );
}
