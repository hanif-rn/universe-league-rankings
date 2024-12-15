import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RankingChart = ({ contestants, highlighted }) => {
  const convertData = (contestants) => {
    const episodes = ["Ep. 2", "Ep. 3", "Ep. 5", "Ep. 6", "Ep. 8"];
    return episodes
      .map((episode) => {
        const dataPoint = { name: episode };
        contestants.forEach((contestant) => {
          const contestantName = contestant.Name.split("\n")[0];
          const rank = contestant[episode];
          if (rank !== -1) {
            dataPoint[contestantName] = rank;
          }
        });
        return dataPoint;
      })
      .filter((dataPoint) => Object.keys(dataPoint).length > 1);
  };

  const data = convertData(contestants);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const filteredPayload = highlighted
        ? payload.sort((a, b) => a.value - b.value)
        : payload
            .filter((item) => item.value >= 1 && item.value <= 7)
            .sort((a, b) => a.value - b.value);

      return (
        <div className="custom-tooltip bg-secondary p-2 text-secondary-content">
          TOP 7
          {filteredPayload.map((entry) => (
            <div key={entry.name} className="text-secondary-content">
              <strong className="text-secondary-content">{entry.name}: </strong>
              Rank {entry.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStrokeColor = (evaluation) => {
    switch (evaluation) {
      case "S":
        return "#9C27B0"; // Purple for S
      case "A":
        return "#FF6022"; // Orange for A
      case "B":
        return "#FFB300"; // Yellow for B
      case "C":
        return "#4CAF50"; // Green for C
      case "D":
        return "#9E9E9E"; // Grey for D
      default:
        return "#8884d8";
    }
  };

  return (
    <ResponsiveContainer width="100%" height={450} className="pr-9">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          reversed={true}
          ticks={[1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <Tooltip content={<CustomTooltip />} />

        {highlighted
          ? contestants
              .filter((contestant) => contestant.Name === highlighted)
              .map((contestant) => {
                const contestantName = contestant.Name.split("\n")[0];
                const evaluation = contestant["Master's \nEvaluation"];
                const strokeColor = getStrokeColor(evaluation);

                return (
                  <Line
                    key={contestantName}
                    type="monotone"
                    dataKey={contestantName}
                    stroke={strokeColor}
                    //stroke="#ff7300"
                    strokeWidth={7}
                    dot={{ r: 6, fill: "#ff7300" }}
                    zIndex={5}
                  />
                );
              })
          : contestants.map((contestant) => {
              const contestantName = contestant.Name.split("\n")[0];
              const evaluation = contestant["Master's \nEvaluation"];
              const strokeColor = getStrokeColor(evaluation);
              return (
                contestant[
                  Object.keys(contestant).find((key) => key.startsWith("Ep."))
                ] !== -1 && (
                  <Line
                    key={contestantName}
                    type="monotone"
                    dataKey={contestantName}
                    stroke={strokeColor}
                    //stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    zIndex={1}
                  />
                )
              );
            })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RankingChart;
