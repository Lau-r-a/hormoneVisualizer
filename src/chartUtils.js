import moment from "moment";

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
        type: "timeseries",
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

function generateHormonesList(jsonData) {
  let hormoneList = [];

  for (const entry of jsonData.results) {
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

export { generateChartConfig, generateHormonesList };
