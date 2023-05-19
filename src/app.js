import { Chart, registerables } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-moment';
import moment from 'moment';

import hormoneData from "../doc/example_data.json";
import hormoneReferences from "../doc/example_references.json";


Chart.register(...registerables);
Chart.register(annotationPlugin);


function generateOptions (min, max) {
  const options = {
    plugins: {
      annotation: {
        annotations: {
          min: {
            type: 'line',
            yMin: min,
            yMax: min,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          },
          max: {
            type: 'line',
            yMin: max,
            yMax: max,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
          },
        }
      }
    },
    scales: {
      x: {
          type: 'timeseries',
          time: { 
            round: 'day',
            unit: 'day',
            displayFormats: {
              day: 'DD.MM.YY'
            }
          }
      }
    }
  }

  return options;
}

function constructDataset(json, value) {
  const result = json.results.map((item) => {
    return {
      x: moment(item.date, 'DD.MM.YYYY'),
      y: item[value]
    }
  });
  return result;
}

function generateChart(value, jsonData, jsonReference) {

  const min = jsonReference[value].reference[0];
  const max = jsonReference[value].reference[1];


  const config = {
    type: 'line',
    data: {
      datasets: [{
        label: value,
        data: constructDataset(jsonData, value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: generateOptions(min, max)
  };

  return config;
}



new Chart(
  document.getElementById('estradiol'),
  generateChart('estradiol', hormoneData, hormoneReferences)
);

new Chart(
  document.getElementById('testosteron'),
  generateChart('testosteron', hormoneData, hormoneReferences)
);
