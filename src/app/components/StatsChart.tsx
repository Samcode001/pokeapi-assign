import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface StatsChartProps {
  stats: { name: string; value: number }[];
}

const COLORS = [
  "#007bff",
  "#00a76f",
  "#ffc107",
  "#ff4d4d",
  "#8a2be2",
  "#ff69b4",
];

const StatsChart: React.FC<StatsChartProps> = ({ stats }) => {
  return (
    <div className="relative w-full h-full ">
      <div className="absolute text-center">
        <p className="text-lg font-semibold">Stats</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <PieChart width={300} height={300}>
          <Pie
            data={stats}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={5}
            label
          >
            {stats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Center Text */}

        {/* Legend */}
        <div className="mt-4 space-y-2">
          {stats.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ background: COLORS[index % COLORS.length] }}
              ></span>
              <p className="text-gray-700">{entry.name}</p>
              <p className="font-semibold">{entry.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsChart;
