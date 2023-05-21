import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-moment";

import hormoneData from "../doc/example_data.json";
import hormoneReferences from "../doc/example_references.json";

import { generateHormonesList, generateChartConfig } from "./chartUtils.js";

Chart.register(...registerables);
Chart.register(annotationPlugin);

const hormoneList = generateHormonesList(hormoneData);

for (const item of hormoneList) {
  const element = document.createElement("div");
  const canvas = document.createElement("canvas");

  canvas.id = item;
  element.appendChild(canvas);

  document.getElementById("canvas-container").appendChild(element);

  new Chart(canvas, generateChartConfig(item, hormoneData, hormoneReferences));
}
