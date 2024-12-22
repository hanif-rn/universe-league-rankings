import React, { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ContestantCardB from "./ContestantCardB";
import Draggable from "react-draggable";
import { FaGripHorizontal } from "react-icons/fa";

const RankingChart = ({ contestants, highlighted }) => {
  const convertData = (contestants) => {
    const episodes = ["Ep. 3", "Ep. 5"];
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
            .filter((item) => item.value >= 1 && item.value <= 7) // Apply Top 7 rule
            .sort((a, b) => a.value - b.value);

      return (
        <div className="custom-tooltip bg-blue-300 p-2 text-secondary-content max-w-56 md:max-w-96 z-50 rounded-md drop-shadow-lg">
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
    const rank = payload[dataKey];

    if (rank === undefined || rank < 0) return null;

    return (
      <g>
        <circle cx={cx} cy={cy} r={12} />

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
  const nodeRef = useRef(null);

  return (
    <ResponsiveContainer
      minHeight={333}
      maxHeight={490}
      className="pr-4 sm:pr-0"
    >
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        animationDuration={100}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          domain={(1, 42)}
          reversed={true}
          ticks={[1, 10, 20, 30, 40, 42]}
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
                        dataKey={contestantName}
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
      {highlighted && (
        <Draggable nodeRef={nodeRef}>
          <div
            ref={nodeRef} // Attach the ref to the element
            className="fixed bottom-7 left-7 p-4 z-50 ease-in-out"
            style={{
              width: "300px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "16px",
            }}
          >
            <div className="flex items-center justify-center cursor-grab bg-gray-300 rounded-t-lg">
              <FaGripHorizontal className="text-gray-600 text-xl" />
            </div>
            <ContestantCardB
              contestant={contestants.find(
                (contestant) => contestant.Name === highlighted
              )}
              onClick={() => {}}
              highlighted={highlighted}
            />
          </div>
        </Draggable>
      )}
    </ResponsiveContainer>
  );
};

export default RankingChart;
