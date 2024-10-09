FROM node:22.9.0-alpine3.19
COPY . ./app
WORKDIR /app
RUN yarn
EXPOSE 4200
ENTRYPOINT ["yarn"]
CMD ["run","start"]