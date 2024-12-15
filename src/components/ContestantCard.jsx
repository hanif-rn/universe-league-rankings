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
  const strokeColor = getStrokeColor(contestant["Master's \nEvaluation"]);

  return (
    <div
      className="contestant-card relative group card bg-yellow-300 p-2 transform transition-transform duration-300 ease-in-out hover:scale-125 hover:shadow-md hover:shadow-yellow-300 hover:z-20"
      onClick={() => onClick(contestant.Name)}
    >
      <img
        className="relative w-full rounded-lg"
        src={`/images/${contestant.Image}`}
        alt={contestant.Name}
      />
      <h3 className="text-center">
        {contestant.Name.split("(")[0].replace(/-/g, "")}
      </h3>

      <div
        className="absolute top-2 right-1 text-white text-sm px-2 py-1 rounded-lg"
        style={{ backgroundColor: strokeColor }}
      >
        {contestant["Master's \nEvaluation"]}
      </div>
    </div>
  );
};

export default ContestantCard;
