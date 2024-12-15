import React, { useState } from "react";
import contestants from "./data/contestant.json";
import ContestantCard from "./components/ContestantCard";
import RankingChart from "./components/RankingChart";
import Header from "./components/Header";
import "./index.css";

const App = () => {
  const [highlighted, setHighlighted] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardClick = (contestant) => {
    setHighlighted((prevHighlighted) =>
      prevHighlighted === contestant ? null : contestant
    );
  };

  const normalizeName = (str) => str.replace(/-/g, "").toLowerCase();

  const filteredContestants = contestants.filter((contestant) =>
    normalizeName(contestant.Name).includes(normalizeName(searchQuery))
  );

  return (
    <div className="min-h-screen bg-blue-400 p-5" data-theme="lemonade">
      <Header />
      <div className="card bg-blue-100 w-full md:w-11/12 lg:w-5/6 mx-auto shadow-xl flex flex-col md:flex-row gap-6 p-6 max-h-full md:max-h-[555px] overflow-y-auto">
        <div className="flex-1">
          <h1 className="text-2xl font-bold underline text-center">
            Trainee Rankings
          </h1>
          <RankingChart contestants={contestants} highlighted={highlighted} />
        </div>

        <div className="flex-1 flex flex-col">
          <input
            type="text"
            placeholder="Search for a trainee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md text-center mb-2"
          />
          <p className="md:hidden text-center mt-1">
            Click on trainee profiles to see rank history!
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 overflow-auto px-4 py-5">
            {filteredContestants.map((contestant) => (
              <ContestantCard
                key={contestant.Name}
                contestant={contestant}
                onClick={handleCardClick}
              />
            ))}
          </div>
          <p className="text-center mt-1 sm:block hidden">
            Click on trainee profiles to see rank history
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
