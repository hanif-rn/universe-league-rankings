import Bio from "./Bio";
const ContestantCard = ({ contestant, onClick }) => {
  const getStrokeColor = (evaluation) => {
    switch (evaluation) {
      case "S":
        return "#9C27B0";
      case "A":
        return "#FF6022";
      case "B":
        return "#FFB300";
      case "C":
        return "#4CAF50";
      case "D":
        return "#9E9E9E";
      default:
        return "#8884d8";
    }
  };

  const getRankChangeIndicator = (contestant) => {
    const recentRank = contestant["Ep. 11"]; // CHANGE THIS LATERRRRR
    const previousRank = contestant["Ep. 8"];

    if (recentRank === -1 || previousRank === -1) {
      return null;
    }

    if (recentRank < previousRank) {
      return { symbol: "↑ " + (previousRank - recentRank), color: "green" };
    } else if (recentRank > previousRank) {
      return { symbol: "↓ " + (recentRank - previousRank), color: "red" };
    } else {
      return { symbol: "=", color: "black" };
    }
  };

  const strokeColor = getStrokeColor(contestant["Master's \nEvaluation"]);
  const rankChange = getRankChangeIndicator(contestant);

  return (
    <div
      className="contestant-card relative group card p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-white"
      style={{ width: "269px", height: "100%" }}
    >
      <div className="flex items-center justify-center flex-col mb-4">
        <img
          className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 
          rounded-full border-4 border-gray-300"
          src={`/images/${contestant.Image}`}
          alt={contestant.Name}
        />
        <h3 className="text-center text-lg font-semibold mt-2 text-gray-800">
          {contestant.Name.replace(/-/g, "")}
        </h3>
        <h4 className="text-center text-md text-gray-600">
          {contestant.Company.replace(/-/g, "")}
        </h4>
      </div>
      <Bio name={contestant.Name} imgurl={`/images/${contestant.Image}`} />

      <div className="absolute top-4 left-3 right-3 flex justify-between items-center">
        {rankChange && (
          <div
            className="text-lg font-bold"
            style={{ color: rankChange.color }}
          >
            {rankChange.symbol}
          </div>
        )}

        <div
          className="text-white text-xs px-3 py-1 rounded-full"
          style={{ backgroundColor: strokeColor }}
        >
          {contestant["Master's \nEvaluation"]}
        </div>
      </div>
    </div>
  );
};

export default ContestantCard;
