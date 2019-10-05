const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit")
const axios = require('axios')
const app = express()
const port = 3000

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 60 // limit each IP to 100 requests per windowMs
})

app.use(limiter)
app.use(bodyParser.json())

const dbUrl = process.env.DB_URL || "http://influxdb:8086"

app.get('/ping', (req, res) => res.json({ "message": "pong" }))

app.post('/api/pr', async (req, res) => {
    console.log(req.body)
    const { pr_link: prLink, language } = req.body

    if (!prLink || !language) {
        res.status(400).json({ "message": "wrong data" })
        return
    }

    const body = `pull_request,pr_link=${prLink.trim().replace(/ +/g, "-")},language=${language.trim().replace(/ +/g, "-")} value=1`

    const url = `${dbUrl}/write?db=hacktober_metrics`
    console.log(`Sending request to: ${url}`)
    try {
        await axios({
            method: 'post',
            url,
            data: body,
        })
        res.sendStatus(204)
    } catch (e) {
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
