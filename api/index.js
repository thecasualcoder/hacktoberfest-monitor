const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const axios = require('axios');
const config = require('config')
const app = express();
const port = config.app.port;
const Influx = require('influx');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 60 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(bodyParser.json());

const dbProtocol = process.env.DB_PROTOCOL || "http";
const dbHost = process.env.DB_HOST || "influxdb";
const dbPort = process.env.DB_PORT || "8086";
const dbUrl = `${dbHost}://${dbHost}:${dbPort}`
const influx = new Influx.InfluxDB({
    protocol: dbProtocol,
    host: dbHost,
    port: dbPort,
    database: 'hacktober_metrics'
})

app.get('/ping', (req, res) => res.json({ "message": "pong" }));

app.post('/api/pr', async (req, res) => {
    console.log(req.body);
    const {pr_link: prLink, language} = req.body;

    if (!prLink || !language) {
        res.status(400).json({ "message": "wrong data" });
        return
    }

    try {
        const prUrl = new URL(prLink);
        console.log(config.hosts)
        if (!config.hosts.includes(prUrl.host)) {
            console.log(prUrl.host + " not allowed");
            throw Error(prUrl.host + " not allowed");
        }

        await axios({
            method: 'head',
            url: prLink
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({ "message": "wrong PR URL" });
        return;
    }

    try {
        let response = await influx.query(`select * from pull_request where pr_link = ${Influx.escape.stringLit(prLink)}`)
        if (response != undefined && response.length > 0) {
            return res.status(409).json({ "message": "This PR already added" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ "message": "Internal error" });
    }

    const body = `pull_request,pr_link=${prLink.trim().replace(/ +/g, "-")},language=${language.trim().replace(/ +/g, "-")} value=1`;

    const url = `${dbUrl}/write?db=hacktober_metrics`;
    console.log(`Sending request to: ${url}`);
    try {
        await axios({
            method: 'post',
            url,
            data: body,
        });
        res.sendStatus(204)
    } catch (e) {
        res.sendStatus(500)
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
