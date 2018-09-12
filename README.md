# CSE NodeJS Server
The intention of this module is to have a server for testing the different client implementations.

## Requirements
Either **NodeJS** or **Docker**

### With NodeJS

#### Installation
`npm i`
`npm run dev`
You can specify on which port the server will listen with the environment Variable PORT. For example use `PORT=3030 npm run dev` to have the server listen on port 3030.

### With Docker
To build the image use
`docker build -t sec-micro .`
and to run the server on port 3030 use 
`docker run -p 3030:3000 -d sec-micro`

