# Alkemy-Fullstack Frontend
First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Alkemy-Fullstack Backend
To run locally, is needed a `PostgreSQL` database 
```
cd server
docker-compose up -d
```

## Server configuration

This is the __default__ server config:
```
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_NAME=alkemydb
DB_USER=alkemyuser
DB_PASSWORD=alkemy
```
In case you need to change any configuration you can rename the file __.env.template__ to __.env__ and put your customized data.