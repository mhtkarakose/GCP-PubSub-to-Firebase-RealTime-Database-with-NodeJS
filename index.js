const { PubSub } = require('@google-cloud/pubsub');

//Loading Firebase Package
const firebase = require("firebase");

firebase.initializeApp({
    serviceAccount: "your-path",
    databaseURL: "your-db-url"
});  //by adding your credentials, you get authorized to read and write from the database

var db = firebase.database();
var ref = db.ref("/user_data");  //Set the current directory you are working in

// Creates a client
const pubsub = new PubSub();

const subscriptionName = 'eniste2';
// const timeout = 60;

// References an existing subscription
const subscription = pubsub.subscription(subscriptionName);

// Create an event handler to handle messages
let messageCount = 0;
var Data = '{"mehmet":"mehmet"}'; 
const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);

    Data = JSON.parse(message.data);

    console.log(Data.lat);
    ref.set({
        angle: Data.angle,
        id: Data.id,
        lat: Data.lat,
        lng: Data.lng
    })

    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
 



