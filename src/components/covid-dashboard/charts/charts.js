import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export const DoughnutChart = ({ label, data, colors }) => {
  const options = {
    labels: label,
    datasets: [
      {
        label: "# of Votes",
        data: data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 0.8,
        radius: "70%",
        legend: {
          display: false,
          position: "left",
        },
      },
    ],
  };
  return <Doughnut data={options} />;
};
