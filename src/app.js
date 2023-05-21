import hormoneData from "../doc/example_data.json";
import hormoneReferences from "../doc/example_references.json";

import { drawCharts } from "./chartUtils.js";

drawCharts("canvas-container", hormoneData, hormoneReferences);
