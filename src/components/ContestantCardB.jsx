import Bio from "./Bio";

const ContestantCard = ({ contestant, onClick }) => {
  const getStrokeColor = (evaluation) => {
    switch (evaluation) {
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

  const getRankChangeIndicator = (contestant) => {
    const recentRank = contestant["Ep. 5"]; // CHANGE THIS LATER
    const previousRank = contestant["Ep. 3"];

    if (recentRank === -1 || previousRank === -1) {
      return null;
    }

    if (recentRank < previousRank) {
      return { symbol: "↑ " + (previousRank - recentRank), color: "#32CD32" }; // Bright green
    } else if (recentRank > previousRank) {
      return { symbol: "↓ " + (recentRank - previousRank), color: "#FF4500" }; // Red-orange
    } else {
      return { symbol: "=", color: "#FFD700" }; // Gold
    }
  };

  const strokeColor = getStrokeColor(contestant["Team"]);
  const rankChange = getRankChangeIndicator(contestant);

  return (
    <div
      className="contestant-card relative group card p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
      style={{
        width: "269px",
        height: "100%",
        backgroundColor: "#121212", // Dark grayish background
        borderColor: strokeColor, // Dynamic border color based on evaluation
        borderWidth: "2px",
      }}
    >
      <div className="flex items-center justify-center flex-col mb-4">
        <img
          className="w-28 h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 
          rounded-full border-4"
          style={{
            borderColor: strokeColor, // Dynamic border color
            boxShadow: `0 0 8px ${strokeColor}`, // Subtle glowing effect
          }}
          src={`/images/${contestant.Image}`}
          alt={contestant.Name}
        />
        <h3 className="text-center text-lg font-semibold mt-2 text-white">
          {contestant.Name.replace(/-/g, "")}
        </h3>
        <h4 className="text-center text-md text-gray-300">
          {contestant.Company.replace(/-/g, "")}
        </h4>
      </div>

      {/* Rank Change Indicator */}
      <div className="absolute top-4 left-3 right-3 flex justify-between items-center">
        {rankChange && (
          <div
            className="text-lg font-bold"
            style={{
              color: rankChange.color,
              textShadow: "0px 0px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            {rankChange.symbol}
          </div>
        )}

        {/* Team Icon */}
        <div className="absolute top-0 right-0">
          <img
            src={`/images/${contestant.Team}.png`}
            className="w-8 h-8 rounded-full border-2"
            style={{
              borderColor: strokeColor,
              boxShadow: `0px 0px 6px ${strokeColor}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContestantCard;
