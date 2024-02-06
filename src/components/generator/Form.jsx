import { useState } from "react";
import { gameProviders, specialGameProviders } from "../../gameProviders";
import Output from "./Output";
import OutputBad from "./OutputBad";

const Form = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [gameNames, setGameNames] = useState("");
  const [gameCodes, setGameCodes] = useState([]);
  const [providerError, setProviderError] = useState(false);
  const [gameCodeTooLong, setGameCodeTooLong] = useState([]);

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
    setProviderError(false);
  };

  const handleGameNamesChange = (event) => {
    setGameNames(event.target.value);
  };

  const generateCodes = (event) => {
    event.preventDefault();

    if (!selectedProvider) {
      setProviderError(true);
      return;
    }

    // create array of unique game names, split by new line, remove empty strings
    const games = [
      ...new Set(
        gameNames
          .split("\n")
          .map((name) => name.trim())
          .filter((name) => name.length > 0)
      ),
    ];

    // loop over unique game names and manipulate the name to create the game code

    const gameCodes = games.flatMap((game) => {
      let gameName;

      if (selectedProvider === specialGameProviders.Amatic) {
        gameName = game
          .replace(/&/g, " AND ")
          .replace(/ñ/g, "n")
          .replace(/Ñ/g, "N")
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .replace(/ +/g, "")
          .toLowerCase();
      } else {
        gameName = game
          .replace(/&/g, " AND ")
          .replace(/ñ/g, "n")
          .replace(/Ñ/g, "N")
          .replace(/O'(\w)/g, "O $1")
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .replace(/ +/g, " ")
          .replace(/ /g, "_")
          .toUpperCase();
      }

      // handle special cases
      if (selectedProvider === specialGameProviders.Amatic) {
        return [
          `${selectedProvider}_${gameName.toLowerCase()}`,
          `${selectedProvider}M_${gameName.toLowerCase()}`,
        ];
      } else if (selectedProvider === specialGameProviders.Microgaming) {
        return [
          `${selectedProvider}D_${gameName.toUpperCase()}`,
          `${selectedProvider}M_${gameName.toUpperCase()}`,
        ];
      } else if (
        Object.values(specialGameProviders).includes(selectedProvider)
      ) {
        return [
          `${selectedProvider}_${gameName.toUpperCase()}`,
          `${selectedProvider}M_${gameName.toUpperCase()}`,
        ];
      } else {
        return [`${selectedProvider}_${gameName.toUpperCase()}`];
      }
    });

    const newGameCodes = [];
    const newGameCodeTooLong = [];

    // check if any game codes are too long
    gameCodes.forEach((code) => {
      if (code.length >= 50) {
        newGameCodeTooLong.push(code);
      } else {
        newGameCodes.push(code);
      }
    });

    setGameCodes(newGameCodes);
    setGameCodeTooLong(newGameCodeTooLong);
    setGameNames("");
  };

  return (
    <div className="form-output-wrapper">
      <form className="generator__form" onSubmit={generateCodes}>
        <select
          onChange={handleProviderChange}
          className={providerError ? "generator__form--error" : ""}
        >
          <option value="">Select a game provider</option>
          {Object.entries(gameProviders).map(([provider, code], index) => (
            <option key={index} value={code}>
              {provider}
            </option>
          ))}
        </select>
        <textarea
          rows="8"
          value={gameNames}
          placeholder="Enter game names here, one per line"
          onChange={handleGameNamesChange}
          className="generator__textarea"
        ></textarea>
        <button className="generator__button" type="submit">
          Generate game codes
        </button>
      </form>
      <Output gameCodes={gameCodes} />
      <OutputBad gameCodeTooLong={gameCodeTooLong} />
    </div>
  );
};

export default Form;
