const ContestantCard = ({ contestant, onClick, highlighted }) => {
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
    const recentRank = contestant["Ep. 8"]; // UPDATE LATER
    const previousRank = contestant["Ep. 6"]; // UPDATE LATER

    if (recentRank === -1 || previousRank === -1) {
      return null; // Handle if the data is missing
    }

    if (recentRank < previousRank) {
      return { symbol: "↑", color: "green" };
    } else if (recentRank > previousRank) {
      return { symbol: "↓", color: "red" };
    } else {
      return { symbol: "=", color: "black" };
    }
  };

  const strokeColor = getStrokeColor(contestant["Master's \nEvaluation"]);
  const rankChange = getRankChangeIndicator(contestant);

  return (
    <div
      className={`relative group card p-2 transform transition-transform 
        duration-300 ease-in-out
        ${
          rankChange
            ? "bg-yellow-300 hover:shadow-blue-300 hover:bg-blue-300"
            : "bg-gray-300 hover:shadow-black hover:bg-gray-400"
        }
        ${
          highlighted && highlighted === contestant.Name
            ? "scale-110 shadow-md z-30"
            : "hover:scale-110 hover:shadow-md hover:z-20"
        }`}
      style={{
        backgroundColor:
          highlighted && highlighted === contestant.Name
            ? rankChange
              ? "#90caf9"
              : "#bdbdbd"
            : "",
      }}
      onClick={() => onClick(contestant.Name)}
    >
      <img
        className="relative w-full rounded-lg"
        src={`/images/${contestant.Image}`}
        alt={contestant.Name}
      />
      <h3 className="text-center text-xs font-bold">
        {contestant.Name.split("(")[0].replace(/-/g, "")}
      </h3>
      <h3 className="text-center text-xxs">
        {contestant.Company.split("(")[0].replace(/-/g, "")}
      </h3>

      {rankChange && (
        <div
          className="absolute top-1 md:top-2 left-3 text-lg font-bold"
          style={{ color: rankChange.color }}
        >
          {rankChange.symbol}
        </div>
      )}

      <div
        className="absolute top-2 right-1 text-white text-xs px-2 py-1 rounded-md"
        style={{ backgroundColor: strokeColor }}
      >
        {contestant["Master's \nEvaluation"]}
      </div>
    </div>
  );
};

export default ContestantCard;
