# Hacktoberfest Monitor

A dashboard for tracking hactoberfest PR contributions.

## Setup

1. Setup grafana and influxDB

```bash
## Setup necessary passwords in .env file
$ cp .env.sample .env

## Startup docker-compose
$ docker-compose up -d
```

2. Add influx as Grafana datasource. Visit http://localhost:3000 and add datasource with InfluxDB URL http://influxdb:8086