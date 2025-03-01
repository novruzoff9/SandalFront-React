#!/bin/bash

docker build -t sandal-front .
docker tag sandal-front novruzoff999/sandal-front:latest
docker push novruzoff999/sandal-front:latest