import React, { useEffect, useState } from "react";
import Plot, { Plotly } from "react-plotly.js";
function LineChartPlotly(props) {
  const [data, setData] = useState();
  const [layout, setLayout] = useState();
  const [xData, setXData] = useState([0]);
  const [yData, setYData] = useState([]);

  let revs = 0;
  useEffect(() => {
    let xTmp = xData;
    let yTmp = yData;
    xTmp.push(xTmp[xTmp.length - 1] + 1);
    yTmp.push(props.data);
    setXData(xTmp);
    setYData(yTmp);
    setData([
      {
        x: xData,
        y: yData,
        type: "line",
        mode: "lines+markers",
        marker: { color: "blue" },
      },
    ]);

    revs += 1;
    let back = 0;
    let length = 20;
    if (xData.length > length) {
      back = xData.length - length;
    }
    setLayout({
      width: 500,
      height: 350,
      title: props.title,
      datarevision: { revs },
      // this needs to move with the graph
      xaxis: { range: [back, xData[xData.length - 1]] },
      yaxis: {
        autorange: props.autorange,
        range: [0, 0.7],
      },
    });
  }, [props.data]);

  return (
    <div>
      <div id="myGraph">
        <Plot data={data} layout={layout} revision={revs} />
      </div>
    </div>
  );
}

export default LineChartPlotly;
