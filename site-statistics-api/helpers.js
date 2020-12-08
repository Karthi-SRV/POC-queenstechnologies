const _ = require("lodash");
const moment = require("moment");

const statsData = require("./data.json");

exports.filterSitesData = async (from, to, dataToProcess = statsData) => {
    const filteredData = _.filter(dataToProcess, o => { return o.date >= moment.utc(from).format() && o.date <= moment.utc(to).endOf("day").format()});
    const groupedData = _.groupBy(filteredData, 'domain');
    const domainWiseList = [];
    _.mapKeys(groupedData, (data, key) => { 
        domainWiseList.push({
            domainName: key,
            averageVisitors: _.isEmpty(data) ? 0 : _.meanBy(data, o => { return o['visitors']}),
            totalRecordsFound: data.length,
            totalVisitors: _.isEmpty(data) ? 0 : _.sumBy(data, o => { return o['visitors']})
        });
    })
    return {
        averageVisitors: _.isEmpty(filteredData) ? 0 : _.meanBy(filteredData, o => { return o['visitors']}),
        totalRecordsFound: filteredData.length,
        totalVisitors: _.isEmpty(filteredData) ? 0 : _.sumBy(filteredData, o => { return o['visitors']}),
        domainList: _.map(filteredData, o => { return o['domain'] }),
        domainWiseList
    }
}
