
import React from "react";

const GranularityBlock = ({setGranularity, current}) => {
    const granularity = [{key: 'hour', value: 'Hour'}, {key: 'day', value: 'Day'}, {key: 'week', value: 'Week'}, { key: 'month', value: 'Month' }];
    return <div className='granularityBlock'>{granularity.map(elem => <span className={elem.key == current ? 'selected' : ''} onClick={setGranularity.bind(this, elem.key)}>{elem.value}</span>)}</div>
};

export default GranularityBlock;