const express = require('express');
const bodyParser = require('body-parser');
const route=require("./routes/userRoutes")
const expressValidator=require('express-validator')
var cors = require('cors')
var socketIO = require('socket.io');
var chatController=require('./controller/chatController')



// create express app
const app = express();

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(expressValidator())

app.use("/",route)


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});



// listen for requests
var server=app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
 
const io=socketIO(server);

// Listen 'connection' event, which is automatically send by the web client (no need to define it)
io.on('connection', (socket) => 
{
    console.log('user is connected');

    // Listen 'chat message' event, which is sent by the web client while sending request
    socket.on('chat messages', function(message) {
        console.log(`Received message: ${message}`);

        chatController.sendMessage(message, (err, data) =>
        {
            if(err)
            {
                console.log("Error..", err);
            }
            else
            {
                console.log("chat message",data);

                //Sending to all connected clients
                // Emit event to all connected users. The second parameter should be the content of the message
                io.emit('chat message', message);
            }
        })
    })

    socket.on('disconnect' , ()=> {
        console.log("user is disconnected");
    })
});
