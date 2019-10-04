#!/bin/bash

set -e

mkdir -p influxdb-data grafana-data .caddy log
docker-compose up -d