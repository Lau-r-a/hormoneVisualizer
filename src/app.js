import { Chart, registerables } from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';
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
    }
  };

  return options;
}




const config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: generateOptions(50, 80)
};

new Chart(
  document.getElementById('myChart'),
  config
);

//dataset min
//dataset max
//dataset data

