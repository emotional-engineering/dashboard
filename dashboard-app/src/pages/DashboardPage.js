import React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import GranularityBlock from "../components/GranularityBlock";

import { DatePicker } from "antd";
import "../../node_modules/antd/dist/antd.css";

import moment from 'moment';

const DashboardItems = [
    {
        id: 0,
        name: "Tags Chart",
        vizState: {
            query: {
                measures: ["Tags.count"],
                timeDimensions: [
                    {
                        dimension: "Tags.timestamp",
                        granularity: "day"
                    }
                ],
                dimensions: ["Tags.tag"],
                filters: []
            },
            chartType: "line"
        }
    },
    {
        id: 1,
        name: "Tags for the selected beriod",
        vizState: {
            query: {
                measures: ["Tags.count"],
                timeDimensions: [
                    {
                        dimension: "Tags.timestamp",
                    }
                ],
                dimensions: ["Tags.tag"],
                filters: []
            },
            chartType: "pie"
        }
    },
    {
        id: 2,
        name: "Services distribution - click on bar to select a service",
        vizState: {
            query: {
                measures: [
                    "Tags.count"
                ],
                timeDimensions: [
                    {
                        "dimension": "Tags.timestamp"
                    }
                ],
                dimensions: [
                    "Tags.service"
                ],
                filters: []
            },
            chartType: "bar"
        }
    },
    {
        id: 3,
        name: "Distribution by countries - click to select a country",
        vizState: {
            query: {
                measures: [
                    "Tags.count"
                ],
                timeDimensions: [
                    {
                        dimension: "Tags.timestamp"
                    }
                ],
                dimensions: [
                    "Tags.country"
                ],
                filters: []
            },
            chartType: "table"
        }
    },
];

const createStructure = ({ query, ...vizState }, granularity, dateRange, selectedService, selectedCountry) => {

  let filters = [];

  if (selectedService) {

    filters.push({
      "dimension": "Tags.service",
      "operator": "equals",
      "values": [
        selectedService
      ]
    })
  }

  if (selectedCountry) {

    filters.push({
      "dimension": "Tags.country",
      "operator": "equals",
      "values": [
        selectedCountry
      ]
    })
  }

  return {
    ...vizState,
    query: {
       ...query,
       timeDimensions: [{
                ...query.timeDimensions[0],
                granularity: vizState.chartType == "line" ? granularity : null,
                dateRange : dateRange ? dateRange : null
            }],
            filters: filters

        }
    }
}

const DashboardPage = () => {

  const [timeRange, setRange] = useState([moment().subtract(31, 'days'), moment()]);
  const [granularity, setGranularity] = useState('day');

  const [selectedService, setSelectedService] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);

  //Handle selection of a "service" orr "country" to affect on data request query
  const dispatcher = {
    onServiceSelect: function(service) {

      if (service == selectedService)
      {
        service = false;
      }

      setSelectedService(service);
    },
    onCountrySelect: function(country) {

      if (country == selectedCountry)
      {
        country = false;
      }

      setSelectedCountry(country);
    }
  }

  let interactiveDashboardItems = JSON.parse(JSON.stringify(DashboardItems));

  // Change headers of the elements
  if (selectedService) {
    interactiveDashboardItems[0].name = interactiveDashboardItems[0].name + ' for ' + selectedService + ' service';
    interactiveDashboardItems[1].name = interactiveDashboardItems[1].name + ' for ' + selectedService + ' service';
    interactiveDashboardItems[3].name = interactiveDashboardItems[3].name.replace('-', ' for ' + selectedService + ' service -');
  }

  if (selectedCountry) {
    interactiveDashboardItems[0].name = interactiveDashboardItems[0].name + ', country code: ' + selectedCountry;
    interactiveDashboardItems[1].name = interactiveDashboardItems[1].name + ', country code: ' + selectedCountry;
    interactiveDashboardItems[3].name = interactiveDashboardItems[3].name.replace('-', ', country code: ' + selectedCountry + ' -');
  }

  return [

      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        key={'container2'}
        spacing={2}>
          <DatePicker.RangePicker
            onChange={setRange}
            value={timeRange}
            style={{
              marginTop: 31,
              marginRight: 40,
              marginBottom: 12
            }}
          />
          <GranularityBlock setGranularity={setGranularity} current={granularity}/>
      </Grid>,
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        key={'container2'} >
          <Grid key={'line1'} xs={10} style={{ margin: 30, marginTop: 10 }}>
            <DashboardItem title={interactiveDashboardItems[0].name}><ChartRenderer height={250} vizState={createStructure(DashboardItems[0].vizState, granularity, timeRange, selectedService, selectedCountry)} /></DashboardItem>
          </Grid>
      </Grid>,
      <Grid container
            direction="row"
            justify="center"
            alignItems="center"
            key={'container2'}
            spacing={2}>
              <Grid item key={'pie1'} xs={5}>
                <DashboardItem title={interactiveDashboardItems[1].name}><ChartRenderer height={250} vizState={createStructure(DashboardItems[1].vizState, false, timeRange, selectedService, selectedCountry)} /></DashboardItem>
              </Grid>
              <Grid item key={'bar1'} xs={5}>
                <DashboardItem title={interactiveDashboardItems[2].name}><ChartRenderer height={250} vizState={createStructure(DashboardItems[2].vizState, false, timeRange, false, selectedCountry)} dispatcher={dispatcher} selectedService={selectedService} /></DashboardItem>
              </Grid>
      </Grid>,
      <Grid container
        direction="row"
        justify="center"
        alignItems="center"
        key={'container3'} >
          <Grid key={'table1'} xs={10} style={{ margin: 30, marginTop: 10 }}>
            <DashboardItem title={interactiveDashboardItems[3].name}><ChartRenderer height={250} vizState={createStructure(DashboardItems[3].vizState, false, timeRange, selectedService, false)} dispatcher={dispatcher} selectedCountry={selectedCountry}/></DashboardItem>
          </Grid>
       </Grid>

    ]

};

export default DashboardPage;
