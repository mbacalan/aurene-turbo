FROM node:16-alpine
ENV NODE_ENV development
RUN yarn global add turbo
WORKDIR /app
COPY  ["yarn.lock", "package.json", "./"] 
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "dev"]
