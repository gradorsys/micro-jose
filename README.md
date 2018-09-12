## Requirements
Either **NodeJS** or **Docker**

#### Installation
`npm i`

### With NodeJS
`npm run dev`
You can specify on which port the server will listen with the environment Variable PORT. For example use `PORT=3030 npm run dev` to have the server listen on port 3030.

### With Docker
To build the image use
`docker build -t sec-micro .`
and to run the server on port 3030 use 
`docker run -p 3030:3000 -d sec-micro`

