# dockerfile

FROM node:16.17.1

WORKDIR /src

COPY . .

RUN yarn


EXPOSE 8080

ENTRYPOINT ["yarn"]

CMD [ "dev:prod" ]