#!/bin/bash

# setting - docker info
DOCKER_USER_NAME=myvue
DOCKER_IMAGE_NAME=vueproj
DOCKER_IMAGE_TAG=1.0
DOCKER_PROJECT_NAME=dev
DOCKER_CONTAINER_NAME=$DOCKER_IMAGE_NAME-$DOCKER_PROJECT_NAME
DOCKER_PORT=28080
DOCKER_VOLUME=/home/docker/volumes/$DOCKER_CONTAINER_NAME
DOCKER_IMAGE=$DOCKER_USER_NAME/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG

# nginx config copy
mkdir -p $DOCKER_VOLUME/nginx/conf.d
cp nginx-default.conf $DOCKER_VOLUME/nginx/conf.d/default.conf

# docker run #################################
docker run --name $DOCKER_CONTAINER_NAME \
-p $DOCKER_PORT:80 \
-v $DOCKER_VOLUME/nginx/conf.d:/etc/nginx/conf.d \
-d \
$DOCKER_IMAGE