import React from "react";
import PropTypes from "prop-types";
import { useCubeQuery } from "@cubejs-client/react";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as d3 from "d3";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const COLORS_SERIES = [
  "#309E88",
  "#506474",
  "#D99105",
  "#727290",
  "#43436B",
  "#BEF3BE",
  "#68B68C",
  "#FFE7AA",
  "#B2A58D",
  "#64C8E0"
];

const CHART_HEIGHT = 300;

const barColor = "#2A98D1";
const selectedBarColor = "#D12A37";

const drawPieChart = (node, resultSet, options) => {

  if (!resultSet.series()[0]) return false;

  const data = resultSet.series()[0].series.map(s => s.value);
  const data_ready = d3.pie()(data);
  d3.select(node).html(""); // The radius of the pieplot is half the width or half the height (smallest one).

  const radius = CHART_HEIGHT / 2 - 40; // Seprate container to center align pie chart

  const svg = d3
    .select(node)
    .append("svg")
    .attr("width", node.clientWidth)
    .attr("height", CHART_HEIGHT)
    .append("g")
    .attr(
      "transform",
      "translate(" + node.clientWidth / 2 + "," + CHART_HEIGHT / 2 + ")"
    );
  svg
    .selectAll("pieArcs")
    .data(data_ready)
    .enter()
    .append("path")
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius)
    )
    .attr("fill", d => COLORS_SERIES[d.index]);
  const size = 24;
  const labels = resultSet.series()[0].series.map(s => s.x);
  svg
    .selectAll("myrect")
    .data(labels)
    .enter()
    .append("rect")
    .attr("x", 150)
    .attr("y", function(d, i) {
      return -50 + i * (size + 5);
    })
    .attr("width", size)
    .attr("height", size)
    .style("fill", (d, i) => COLORS_SERIES[i]);
  svg
    .selectAll("mylabels")
    .data(labels)
    .enter()
    .append("text")
    .attr("x", 150 + size * 1.2)
    .attr("y", function(d, i) {
      return -50 + i * (size + 5) + size / 2;
    })
    .text(function(d) {
      return d;
    })
    .attr("text-anchor", "left")
    .attr("font-size", "24px")
    .style("alignment-baseline", "middle");
};

const drawChart = (node, resultSet, chartType, options = {}) => {
  if (chartType === "pie") {
    return drawPieChart(node, resultSet, options);
  }

  const margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 60
    },
    width = node.clientWidth - margin.left - margin.right,
    height = CHART_HEIGHT - margin.top - margin.bottom,
    legendMargin = 20;
  d3.select(node).html("");
  const svg = d3
    .select(node)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  const keys = resultSet.seriesNames(options.pivotConfig).map(s => s.key);
  let data, maxData;

  if (chartType === "line") {
    data = resultSet.series(options.pivotConfig).map(series => ({
      key: series.key,
      values: series.series
    }));
    maxData = d3.max(data.map(s => d3.max(s.values, i => i.value)));
  } else {
    data = d3.stack().keys(keys)(resultSet.chartPivot(options.pivotConfig));
    maxData = d3.max(data.map(s => d3.max(s, i => i[1])));
  }

  const color = d3
    .scaleOrdinal()
    .domain(keys)
    .range(COLORS_SERIES);
  let x;

  if (chartType === "bar") {
    x = d3
      .scaleBand()
      .range([0, width])
      .domain(resultSet.chartPivot(options.pivotConfig).map(c => c.x))
      .padding(0.3);
  } else {
    x = d3
      .scaleTime()
      .domain(
        d3.extent(resultSet.chartPivot(options.pivotConfig), c =>
          d3.isoParse(c.x)
        )
      )
      .nice()
      .range([0, width]);
  }

  svg
    .append("g")
    .attr("transform", "translate(0," + (height - legendMargin) + ")")
    .call(d3.axisBottom(x))
    .attr("font-size", () => { if (chartType === "bar") return "22px"; else return "12px"; });
  const y = d3
    .scaleLinear()
    .domain([0, maxData])
    .range([height - legendMargin, 0]);
  svg.append("g").call(d3.axisLeft(y));

  if (chartType === "line") {

      var lines = svg.selectAll(".line")
          .data(data).enter().append('g')

      lines.attr('class', function(d,i) { return 'line line-' + i })
          .classed('hover', function(d) { return d.hover })
          .style('fill', function(d,i) { return COLORS_SERIES[i % 10] })
          .style('stroke', function(d,i) { return COLORS_SERIES[i % 10] })

      d3.transition(lines)
          .style('stroke-opacity', 1)

      var paths = lines.selectAll('path')
          .data(function(d, i) { return [d.values] });

      paths.enter().append('path')
          .attr("fill", "none")
          .attr("stroke", (d, i) => { color(d.key)})
          .attr("stroke-width", 1.5)
          .attr('d', d3.line()
              .x(function(d) { return x(d3.isoParse(d.x)) })
              .y(function(d) { return y(+d.value) })
          );

      var points = lines.selectAll('circle.point')
          .data(function(d) { return d.values });

        points.enter().append('circle')
          .attr('cx', (d) => x(d3.isoParse(d.x)))
          .attr('cy', (d) => y(+d.value))
          .attr('r', (d) => d.value > 0 ? 2 : 0)
          .attr('fill', '#fff')
          .attr('stroke-width', 1.5)
          .attr('fill-opacity', 1)

        points.exit().remove();

        points.attr('class', function(d,i) { return 'point point-' + i });


      var series = svg.selectAll('.series')
          .data(data);

      var seriesEnter = series.enter().append('g').attr('class', 'series');

      seriesEnter.append('circle')
          .style('fill', function(d, i){ return COLORS_SERIES[i % 10] })
          .style('stroke', function(d, i){ return COLORS_SERIES[i % 10] })
          .attr('r', 5);

      seriesEnter.append('text')
          .text(function(d) { return d.key })
          .attr('text-anchor', 'start')
          .attr('dy', '.32em')
          .attr('dx', '8');

      var ypos = 5,
          newxpos = 5,
          maxwidth = 0,
          xpos;

      seriesEnter
        .attr('transform', function(d, i) {

          var length = d3.select(this).select('text').node().getComputedTextLength() + 28;
          xpos = newxpos;

          if (width < margin.left + margin.right + xpos + length) {
            newxpos = xpos = 5;
            ypos += 20;
          }

          newxpos += length;
          if (newxpos > maxwidth) maxwidth = newxpos;

          return 'translate(' + xpos + ',' + (height + legendMargin) + ')';
        });

      series.exit().remove();


  } else if (chartType === "area") {
    svg
      .selectAll("mylayers")
      .data(data)
      .enter()
      .append("path")
      .style("fill", d => color(d.key))
      .attr(
        "d",
        d3
          .area()
          .x(d => x(d3.isoParse(d.data.x)))
          .y0(d => y(d[0]))
          .y1(d => y(d[1]))
      );
  } else {

    var selectedBar = false;

    svg
      .append("g")
      .selectAll("g") // Enter in the stack data = loop key per key = group per group
      .data(data)
      .enter()
      .append("g")
      .selectAll("rect") // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(d => d)
      .enter()
      .append("rect")
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("fill", (d, i) => {

        console.log('---- options-----');
        console.log(options);
        console.log(d.data)

        if (options.selectedService == d.data.category) {
          return selectedBarColor;
        } else {
          return barColor;
        }
      })
      .attr("x", d => x(d.data.x))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .on("click", (d, i) => {

        var unselect = false;

        if (i === selectedBar) {
          selectedBar = false;
          unselect = true;
        }

        if (!unselect) selectedBar = i;

        svg.selectAll("rect").attr("fill", (d, i) => {
          if (i === selectedBar) {
            return selectedBarColor;
          } else {
            return barColor;
          }
        })

        // pass event to the root controller
        if (options.dispatcher && options.dispatcher.onServiceSelect) {

          console.log(d.data);

          options.dispatcher.onServiceSelect(d.data.category);
        }

      })
  }
};

const D3Chart = ({ resultSet, type, ...props }) => (
  <div ref={el => el && drawChart(el, resultSet, type, props)} />
);

const TypeToChartComponent = {
  line: props => <D3Chart type="line" {...props} />,
  bar: props => <D3Chart type="bar" {...props} />,
  area: props => <D3Chart type="area" {...props} />,
  pie: props => <D3Chart type="pie" {...props} />,
  number: ({ resultSet }) => (
    <Typography
      variant="h4"
      style={{
        textAlign: "center"
      }}
    >
      {resultSet.seriesNames().map(s => resultSet.totalRow()[s.key])}
    </Typography>
  ),
  table: ({ resultSet, ...props }) => (
    <Table aria-label="simple table" onCellClick={() => { console.log("click:") }}>
      <TableHead>
        <TableRow>
          {resultSet.tableColumns().map(c => (
            <TableCell key={c.key}>{c.title}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody onCellClick={() => { console.log("click:") }}>
        {resultSet.tablePivot().map((row, index) => {

          let className = false;

          console.log("==== props ====");
          console.log(props)

          if (row["Tags.country"] == props.selectedCountry) {
            className = 'selectedRow';
          }
          return <TableRow key={index} onClick={() => props.dispatcher.onCountrySelect(row["Tags.country"])} className={className}>
            {resultSet.tableColumns().map(c => (
              <TableCell key={c.key}>{row[c.key]}</TableCell>
            ))}
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map(key => ({
    [key]: React.memo(TypeToChartComponent[key])
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = Component => ({ resultSet, error, ...props }) =>
  (resultSet && <Component resultSet={resultSet} {...props} />) ||
  (error && error.toString()) || <CircularProgress />;

const ChartRenderer = ({ vizState, dispatcher, selectedService, selectedCountry }) => {
  const { query, chartType, ...options } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  const renderProps = useCubeQuery(query);

  options.dispatcher = dispatcher;
  options.selectedService = selectedService;
  options.selectedCountry = selectedCountry;

  return component && renderChart(component)({ ...options, ...renderProps });
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
  cubejsApi: PropTypes.object
};
ChartRenderer.defaultProps = {
  vizState: {},
  cubejsApi: null
};
export default ChartRenderer;
