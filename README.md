Hello :D! welcome to this Project which features a Personal Finance APP.    
This front-end and back-end was created to complete a full-stack-js challenge in [Alkemy](https://www.alkemy.org/).  

[Challenge instructions](https://drive.google.com/file/d/1xR92xRBg8uQDbdajch0sVb9xa4VtHXtU/view?pli=1)

__Relevant dependencies that I used:__    
-ReactJS    
-NextJS   
-MaterialUI   
-SweetAlert2  
-React Hook Form
-Express    
-Axios    
-Sequelize

# Finance-App Backend
First, to run locally, is needed a `MariaDB` database.

Create the database instance with Docker:
```
cd server
docker-compose up -d
```

Then run the server
```bash
npm install
npm start
```

__For API details you can visit the next link__
[API Documentation](https://documenter.getpostman.com/view/11898595/UVyxRtwT) 

## Server configuration
All necessary configuration is already set by default.

In case you need to change any configuration you can rename the file __.env.template__ to __.env__ and put your customized data.

This is the __default__ server config:
```
# Json web token
SECRET_KEY=s3cr37k3yof4lk3mych4ll3ng3

# Server config
PORT=8080

# Database config
DB_HOST=localhost
DB_PORT=5432
DB_NAME=alkemydb
DB_USER=alkemyuser
DB_PASSWORD=alkemy

# Cors config to allow send cookies
WEB_URL=http://localhost:3000

```

# Finance-App Frontend
Run the web application:

```bash
npm install
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This is the __default__ webapp config:
```
FINANCE_APP_API_URL=http://localhost:3000
```
