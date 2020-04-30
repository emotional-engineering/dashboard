import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';

import * as d3 from 'd3';
const COLORS_SERIES = ['#FF6492', '#141446', '#7A77FF'];

const draw = (node, resultSet, chartType) => {

    if (!resultSet) return false;

    console.log("resultSet:---------->");
    console.log(resultSet)

    // Set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = node.clientWidth - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    d3.select(node).html("");
    const svg = d3.select(node)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    const data = resultSet.series()[0].series.map(s => s.value);
    const data_ready = d3.pie()(data);

    // The radius of the pieplot is half the width or half the height (smallest one).
    const radius = Math.min(400, 400) / 2 - 40;

    // Seprate container to center align pie chart
    const pieContainer = svg.attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width/2 +  ',' + height/2 +')');

    pieContainer
        .selectAll('pieArcs')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', d => COLORS_SERIES[d.index])

}

const pieRender = ({ resultSet }) => (
    <div ref={el => el && draw(el, resultSet, 'pie')} />
)


const API_URL = "http://localhost:4000"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODc4NDI4NzAsImV4cCI6MTU4NzkyOTI3MH0.lVhbrb2s8h7wscf5993BjHY8X_-P8gqj0oMOyIfMGRY",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

const renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
(error && error.toString()) ||
(<Spin />)
)

const ChartRenderer = ({dateRange}) => <QueryRenderer
    query={{
        "measures": [
            "Tags.count"
        ],
            "timeDimensions": [
            {
                "dimension": "Tags.timestamp",
                "dateRange": dateRange ? dateRange : null
            }
        ],
            "dimensions": [
            "Tags.tag"
        ],
            "filters": []
    }}
    cubejsApi={cubejsApi}
    render={renderChart(pieRender)}
/>;

export default ChartRenderer;
