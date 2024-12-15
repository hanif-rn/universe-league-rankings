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
      const filteredPayload = payload
        .filter((item) => item.value >= 1 && item.value <= 7)
        .sort((a, b) => a.value - b.value);

      return (
        <div className="custom-tooltip bg-secondary p-2 text-secondary-content">
          {filteredPayload.map((entry) => (
            <div key={entry.name} className="text-secondary-content">
              {entry.value}){" "}
              <strong className="text-secondary-content">{entry.name} </strong>
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

  const CustomDot = ({ cx, cy, payload, dataKey }) => {
    // Find the rank from the episode for the specific contestant
    const rank = payload[dataKey];

    // Hide the dot if the rank is -1 or undefined
    if (rank === undefined || rank < 0) return null;

    return (
      <g>
        {/* Bigger Circle */}
        <circle cx={cx} cy={cy} r={12} />

        {/* Rank Text inside the Circle */}
        {rank !== undefined && (
          <text
            x={cx}
            y={cy}
            dy={4}
            textAnchor="middle"
            fill="white"
            fontSize={14}
          >
            {rank}
          </text>
        )}
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={450} className="pr-9">
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
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
                    strokeWidth={7}
                    dot={(props) => (
                      <CustomDot
                        cx={props.cx}
                        cy={props.cy}
                        payload={props.payload}
                        dataKey={contestantName} // Passing the dataKey as the name of the contestant
                      />
                    )}
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
