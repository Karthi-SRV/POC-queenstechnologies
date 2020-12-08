const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const methodOverride = require("method-override");
const helmet = require("helmet");
const cors = require("cors");
const _ = require("lodash");
const moment = require("moment");

const { filterSitesData } = require('./helpers');
const statsData = require("./data.json");
const apiBaseUrl = '/api';
const port = 3000;

app.use(helmet());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
	bodyParser.urlencoded({
		limit: "100mb",
		extended: true,
		parameterLimit: 100000,
	})
);
app.use(methodOverride());

const corsOptions = {
	// ADD front end url
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionsSuccessStatus: 204,
	credentials: true,
	allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

app.get(`${apiBaseUrl}/site/stats`, async (req, res) => {
	try {
        let responseData = {
            success: true,
            data: {},
            message: 'Successfully Fetched!'
        }
        console.log(statsData);
        switch (_.get(req, 'query.filterType').toString()) {
            case '1':
                const fromDate = _.get(req, 'query.from');
                const toDate = _.get(req, 'query.to');
                if(!moment(fromDate, 'YYYY-MM-DD', true).isValid()) {
                    return res.status(400).json({ success: false, errorMessage: 'Invalid from date format'});
                }
                if(!moment(toDate, 'YYYY-MM-DD', true).isValid()) {
                    return res.status(400).json({ success: false, errorMessage: 'Invalid to date format'});
                }         
                const case1Response = await filterSitesData(fromDate, toDate);
                _.set(responseData, 'data', case1Response);
            break;
            case '2':
                const dateToFilter = _.get(req, 'query.date');
                if(!moment(dateToFilter, 'YYYY-MM-DD', true).isValid()) {
                    return res.status(400).json({ success: false, errorMessage: 'Invalid date format'});
                }
                const case2Response = await filterSitesData(dateToFilter, dateToFilter);
                _.set(responseData, 'data', case2Response);
            break;
            default:
                const modifiedDataSource = _.map(statsData, o => { return { ...o, date: moment(o.date).format('YYYY-MM-DD') } });
                const groupedData = _.groupBy(modifiedDataSource, 'date');
                _.set(responseData, 'data', {
                    structuredData: groupedData
                });
            break;
        }
		return res.send(responseData);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

app.listen(port, () => {
	console.log(`Site Statistics API listening at http://localhost:${port}`);
});
