cube(`Tags`, {
  sql: `SELECT * FROM cubejs.tags`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [tag]
    },
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    eventId: {
      sql: `event_id`,
      type: `string`
    },
    
    service: {
      sql: `service`,
      type: `string`
    },
    
    tag: {
      sql: `tag`,
      type: `string`
    },
    country: {
      sql: `country`,
      type: `string`
    },
    timestamp: {
      sql: `timestamp`,
      type: `time`
    }
  }
});
