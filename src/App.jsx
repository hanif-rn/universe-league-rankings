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
          <h1 className="text-3xl font-bold underline text-center mb-8">
            Rankings
          </h1>
          <RankingChart contestants={contestants} highlighted={highlighted} />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Search for a contestant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto px-5 pt-5">
            {filteredContestants.map((contestant) => (
              <ContestantCard
                key={contestant.Name}
                contestant={contestant}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
