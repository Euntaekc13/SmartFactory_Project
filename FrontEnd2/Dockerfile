FROM nginx:1.19

# set locale
RUN apt-get update \
    && apt-get install -y vim \
    && apt-get install -y locales
RUN sed -i 's/^# \(ko_KR.UTF-8\)/\1/' /etc/locale.gen
RUN localedef -f UTF-8 -i ko_KR ko_KR.UTF-8
ENV LC_ALL ko_KR.UTF-8

# install node.js
ENV NVM_VERSION v0.34.0
ENV NODE_VERSION 14.15.5
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get -y install curl build-essential
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash
RUN source ~/.nvm/nvm.sh; \
    nvm install $NODE_VERSION; \
    nvm use --delete-prefix $NODE_VERSION;
ENV PATH /root/.nvm/versions/node/v$NODE_VERSION/bin:$PATH

# install home
RUN mkdir -p /home/www
COPY . /home/www
WORKDIR /home/www

# make build && delete source files
RUN npm install \
    && npm run build \
    && rm -rf $(ls | grep -v dist)

# nginx config
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]