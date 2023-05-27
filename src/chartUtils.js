import moment from "moment";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-moment";


Chart.register(...registerables);
Chart.register(annotationPlugin);

function generateOptions(min, max) {
  const options = {
    plugins: {
      annotation: {
        annotations: {
          min: {
            type: "line",
            yMin: min,
            yMax: min,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
          max: {
            type: "line",
            yMin: max,
            yMax: max,
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        ticks: {
          source: "data",
        },
        time: {
          round: "day",
          unit: "day",
          displayFormats: {
            day: "DD.MM.YY",
          },
        },
      },
    },
  };

  return options;
}

function constructDataset(jsonData, value) {
  const result = jsonData.results.map((item) => {
    return {
      x: moment(item.date, "DD.MM.YYYY"),
      y: item[value],
    };
  });
  return result;
}

function generateChartConfig(value, jsonData, jsonReference) {
  const min = jsonReference[value].reference[0];
  const max = jsonReference[value].reference[1];

  const config = {
    type: "line",
    data: {
      datasets: [
        {
          label: value,
          data: constructDataset(jsonData, value),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: generateOptions(min, max),
  };

  return config;
}

function generateHormonesList(hormoneData) {
  let hormoneList = [];

  for (const entry of hormoneData.results) {
    for (const [key, value] of Object.entries(entry)) {
      if (
        key !== "date" &&
        hormoneList.find((item) => item === key) === undefined
      ) {
        hormoneList.push(key);
      }
    }
  }

  return hormoneList;
}

function drawChart(containerId, hormoneData, hormoneReferences, value) {
  const canvas = document.createElement("canvas");
  document.getElementById(containerId).appendChild(canvas);
  new Chart(canvas, generateChartConfig(value, hormoneData, hormoneReferences));
}

function drawCharts (container, hormoneData, hormoneReferences) {
  const hormoneList = generateHormonesList(hormoneData);

  for (const item of hormoneList) {
    const element = document.createElement("div");
    const canvas = document.createElement("canvas");

    canvas.id = item;
    element.classList.add("div-item");
    canvas.classList.add("canvas-item");
    element.appendChild(canvas);

    document.getElementById(container).appendChild(element);

    new Chart(canvas, generateChartConfig(item, hormoneData, hormoneReferences));
  }
}

export { drawCharts, drawChart, generateHormonesList };
