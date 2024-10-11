FROM node:lts-alpine

COPY . . 

RUN npm install
#to Install dependencies

RUN npm run build

#RUN npm install -g serve

EXPOSE 3004
#Port we wamt the container to run

CMD [ "npm", "run", "preview" ]
#command to start the server inside the container

#CMD ["serve", "-s", "dist", "-l", "3004"]