const ContestantCard = ({ contestant, onClick, highlighted }) => {
  const getRankChangeIndicator = (contestant) => {
    const recentRank = contestant["Ep. 5"];
    const previousRank = contestant["Ep. 3"];

    if (recentRank === -1 || previousRank === -1) {
      return null; // Handle missing data
    }

    if (recentRank < previousRank) {
      return { symbol: " ↑", color: "#228B22" }; // Darker Green for improvement
    } else if (recentRank > previousRank) {
      return { symbol: " ↓", color: "#D43F00" }; // Darker Red-Orange for decline
    } else {
      return { symbol: " =", color: "#B8860B" }; // Darker Gold for no change
    }
  };

  const getShadowColor = (team) => {
    switch (team) {
      case "Eliminated":
        return "hover:shadow-black"; // Black shadow for Eliminated team
      case "Rhythm":
        return "hover:shadow-red-500"; // Red shadow for Rhythm team
      case "Groove":
        return "hover:shadow-green-500"; // Green shadow for Groove team
      case "Beat":
        return "hover:shadow-blue-500"; // Blue shadow for Beat team
      default:
        return "hover:shadow-black"; // Default shadow if no team matches
    }
  };

  const rankChange = getRankChangeIndicator(contestant);
  const getBgColor = (team) => {
    switch (team) {
      case "Eliminated":
        return "#2D3748"; // Darker background for Eliminated team
      case "Rhythm":
        return "#C53030"; // Darker red background for Rhythm team
      case "Groove":
        return "#2F855A"; // Darker green background for Groove team
      case "Beat":
        return "#2B6CB0"; // Darker blue background for Beat team
      default:
        return "#4A5568"; // Default darker background if no team matches
    }
  };
  const bgColor = getBgColor(contestant.Team);

  const shadowColor = getShadowColor(contestant.Team);
  return (
    <div
      className={`relative group card p-2 transform transition-transform 
        duration-300 ease-in-out
        ${
          rankChange
            ? "bg-[#1A202C]  hover:bg-[#2D3748] ${shadowColor}"
            : "bg-[#1A202C] hover:shadow-black hover:bg-[#2D3748]"
        }
        ${
          highlighted && highlighted === contestant.Name
            ? "scale-110 shadow-md z-30 border border-[#3B82F6]"
            : `hover:scale-110 hover:shadow-md hover:z-20 ${shadowColor}`
        }`}
      style={{
        backgroundColor:
          highlighted && highlighted === contestant.Name
            ? rankChange
              ? bgColor // Dark Blue
              : "#4A5568" // Dark Gray
            : "",
      }}
      onClick={() => onClick(contestant.Name)}
    >
      <img
        className="relative w-full rounded-lg"
        src={`/images/${contestant.Image}`}
        alt={contestant.Name}
      />
      <h3 className="text-center text-xs font-bold text-white">
        {contestant.Name.split("(")[0].replace(/-/g, "")}
      </h3>
      <h3 className="text-center text-xxs text-gray-400">
        {contestant.Company.split("(")[0].replace(/-/g, "")}
      </h3>

      {rankChange && (
        <div
          className="absolute top-1 md:top-2 left-3 text-2xl font-bold"
          style={{ color: rankChange.color }}
        >
          {rankChange.symbol}
        </div>
      )}

      <div className="absolute top-2 right-1 text-white text-xs px-2 py-1 rounded-md">
        <img
          src={`/images/${contestant.Team}.png`}
          className="w-6 h-6 rounded-md"
        />
      </div>
    </div>
  );
};

export default ContestantCard;
