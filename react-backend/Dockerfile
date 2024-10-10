FROM node:lts-alpine

COPY . . 

RUN npm install
#to Install dependencies

EXPOSE 8080
#Port we wamt the container to run

CMD [ "npm", "run", "start" ]
#command to start the server inside the container