const express = require('express')
const mongo = require('mongodb')
var bodyParser = require('body-parser');

// Express specific declarations
const app = express()
const port = 8080

// Mongo specific declarations
const MongoClient = require('mongodb').MongoClient;
const url = process.env.DB_URL || "mongodb://localhost:27017/mydb";

// Some important things for express to work properly
//
//   bodyParser      - Parses body data inside of a request
//   express.static  - Sets where static assets can be found
//   'view engine'   - Tells express what templating engine we're using (ejs)
app.use(bodyParser());
app.use(express.static('static'));
app.set('view engine', 'ejs');

// Create a connection to the database and start up the beautiful server
var db
MongoClient.connect(url,{reconnectTries: 60, reconnectInterval: 1000},function(err, db) {
    // Connect to the entire database
    if (err) throw err;
    db = db.db("mydb");
  
    // Create a stuff collection if it doesn't already exist
    db.createCollection("stuff", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
    
    // Start up the server!
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    })
        
        
    // Index route, just has the form for making new stuff
    app.get('/', (req, res) => {
        console.log(`${req.method} request recieved on ${req.url}`)
        res.render("index");
    })
    
    // Retrieves all the stuff from the database!
    app.get('/stuff', async (req, res) => {
        let stuff = await getDocuments()
        console.log(`${req.method} request recieved on ${req.url}`)
        res.render("stuff", {data: stuff});
    });
    
    // Posts some stuff to the database, woo
    app.post('/stuff', (req, res) => {
        console.log(`${req.method} request recieved on ${req.url}`)
        db.collection('stuff').save(req.body, (err, result) => {
            if (err) return console.log(err)
            console.log('Saved to database')
            res.redirect('/stuff')
        });  
    });
    
    // Function for retrieving all documents
    const getDocuments = () => {
        // Return a promise since the retrieval is asynchronous
        return new Promise((resolve, reject) => {
            // Actually retrieved the documents from the stuff collection
            db.collection('stuff')
                .find()
                .toArray((err,docs) => {
                    if(docs && docs.length>0){
                        resolve(docs)
                    } else {
                        resolve([])  
                    }
                    reject();
            });
        });
    }
});

