"use client";

import { useState, useEffect } from "react";
import Typo from "typo-js";

export default function Home() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const dictionary = new Typo("no-names", null, null, {
      dictionaryPath: "dictionaries",
    });

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
          spellcheck but it doesn't know names
        </h1>
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="text-center text-black"
      />
      <div
        className="result-container"
        style={{ height: suggestion ? "auto" : "0" }}
      >
        {suggestion && (
          <p className="text-red-500">{`Did you mean: ${suggestion}`}</p>
        )}
      </div>
    </div>
  );
}
