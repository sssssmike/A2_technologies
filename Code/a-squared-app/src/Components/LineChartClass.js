import { Component } from "react";
import CanvasJSReact from "../canvasjs.react";

/* Other React Libraries from data vis prof

  https://Plotly.com/javascript/react/

*/

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps = [{ x: 1, y: 0 }]; //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;
export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
  }
  componentDidMount() {
    setInterval(this.updateChart, updateInterval);
  }
  updateChart() {
    yVal = this.props.data;
    dps.push({ x: xVal, y: yVal });
    xVal++;
    if (dps.length > 10) {
      dps.shift();
    }
  }
  render() {
    const options = {
      title: {
        text: this.props.title,
      },
      width: 500,
      height: 200,
      data: [
        {
          type: "line",
          dataPoints: dps,
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
