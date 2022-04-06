const cors = require('cors');
const express = require('express')
const path = require('path')
const { db } = require('./database/config');
const { readDir } = require('./helpers/handle-routes');

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 8080;
    
    // Connect to database
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // Routes
    this.apiRoutes();
  }
  
  async dbConnection() {
    try {
        await db.authenticate();
        console.log('Database online');
    } catch (error) {
        throw new Error( error );
    }
  }

  /*
    Load express routes automatically.
    The files must be in the routes folder
    and must end with "_route". 
  */
  async apiRoutes() {
    const _route = '/api'
    const _path = path.join(__dirname,'routes');
    const _replace = '_route';
    let routes = await readDir(_path,_replace);
    
    routes.map(route=>{
      let apiPath = path.join(_route,route.name).replace(/[\\]/g, '/');
      let filePath = path.join(_path,route.filename);
      
      this.app.use(apiPath, require(filePath));
    })
  }

  middlewares() {
    // Cors
    this.app.use(cors());
    
    // Reading and parsing of body
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
        console.log('Server running on port:', this.port)
    }) ;
  }
}

module.exports = Server;