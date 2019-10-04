import React, { Component } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";

const totalWidth = window.innerWidth - 750;
const totalHeight = 500;
const margin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
};
const width = totalWidth - margin.left - margin.right;
const height = totalHeight - margin.top - margin.bottom;

class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    d3.selectAll("svg > *").remove();
    this.createChart();
  }

  createChart() {
    const data = this.props.data;
    const _this = this;
    let svg = d3
      .select("#areaChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("stroke", "white")
      .attr("fill", "none")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let sumstat = d3
      .nest()
      .key(function(d) {
        return d.timestamp;
      })
      .entries(data);

    /** stacking data: each group will be represented on top of each other */
    let mygroups = _this.props.keys;
    let mygroup = _this.props.keyIndex;

    let stackedData = d3
      .stack()
      .keys(mygroup)
      .value(function(d, key) {
        return d.values[key].reactorValue;
      })(sumstat);

    /** X axis */
    let x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function(d) {
          return d.timestamp;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5));

    /** Y axis */
    let y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function(d, key) {
          return d.reactorValue;
        }) * 1.2
      ])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    /** color palette */
    let color = d3
      .scaleOrdinal()
      .domain(mygroups)
      .range(this.props.color);

    /** plotting areas */
    svg
      .selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
      .style("fill", function(d) {
        let reactorName = mygroups[d.key - 1];
        return color(reactorName);
      })
      .attr(
        "d",
        d3
          .area()
          .x(function(d, i) {
            return x(d.data.key);
          })
          .y0(function(d) {
            return y(d[0]);
          })
          .y1(function(d) {
            return y(d[1]);
          })
      );
  }

  render() {
    return (
      <div>
        <svg
          id="areaChart"
          ref={node => (this.node = node)}
          width={totalWidth}
          height={totalHeight}
        ></svg>
      </div>
    );
  }
}

AreaChart.propTypes = {
  data: PropTypes.array,
  keys: PropTypes.array,
  keyIndex: PropTypes.array,
  color: PropTypes.array
};

export default AreaChart;
