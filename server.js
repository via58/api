var express = require('express');
var mongoose= require('mongoose');
var bodyparser= require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyparser.json());
var CustomerDetails= require('./model/customerModel');
mongoose.connect('mongodb://localhost/vijaytest');
var db = mongoose.Connection;


// to check the application running status 
app.get('/',function(request,response){
    response.send('The application is running');
});


// get the Customer from the database
app.get('/customers',function(request,response){
    
   CustomerDetails.getCustomer(function(err,customers){
      if (err)
{
throw err
}
response.json(customers); 
   })
});



// post the values to the data base

app.post('/addcustomer',function(request,response){
 var details = request.body;
 CustomerDetails.addCustomer(details,function(err,details){
if (err)
{
throw err
}
response.json(details);

 });
});

//get customer by ID

app.get('/customer/:customer_id',function(request,response){

var cid = request.params.customer_id;

CustomerDetails.getCustomerById(cid,function(err,customers){
if (err)
{
throw err
}
response.json(customers);

})

});

//get the values from html form
app.post('/getValues',function(request,response){

var userval={
customer_name:request.query.customer_name,
customer_id:request.query.customer_id,
customer_phonenumber:request.query.customer_phonenumber,
customer_location:request.query.customer_location,
customer_mobilename:request.query.customer_mobilename,
customer_language:request.query.customer_language
}
CustomerDetails.AddallUsers(userval,function(err,customers){
if (err)
{
throw err
}
response.json(customers);

})

});

//update customer
app.put('/updatecustomer/:_id',function(request,response){

var id =request.params._id;
var customerObject=request.body;

CustomerDetails.updateCustomers(id,customerObject,function(err,customerObject){

if (err)
{
throw err
}
response.json(request.params._id +" has been updated...");


})
});
// delete customer
app.delete('/deletecustomer/:_id',function(request,response){

var id =request.params._id;
CustomerDetails.deleteCustomer(id,function(err){

if (err)
{
throw err
}
response.json(request.params._id +" has been deleted...");


})
});

///for dialog flow
app.get('/:_num1/:_num2',function(request,response){

var number1 = request.params._num1;
var number2 = request.params._num2;
const result =Math.round(number1)+ Math.round(number2);
response.json(Number(result));
});
/// dialog flow post method
app.post('/webhook',function(request,response){
var tokenFromRequest=request.body.responseId;
var jsonresponse = {
  "responseId": "982ae2eb-df30-4636-887b-45291a485260",
  "queryResult": {
    "queryText": "shops near me",
    "parameters": {
      "speedwayStore": [
        "Store"
      ]
    },
    "allRequiredParamsPresent": true,
    "fulfillmentText": "Find Below",
    "fulfillmentMessages": [
      {
        "platform": "ACTIONS_ON_GOOGLE",
        "simpleResponses": {
          "simpleResponses": [
            {
              "textToSpeech": "Find Below"
            }
          ]
        }
      },
      {
        "platform": "ACTIONS_ON_GOOGLE",
        "basicCard": {
          "title": "Texas",
          "image": {
            "imageUri": "https://firebasestorage.googleapis.com/v0/b/speedway-8f435.appspot.com/o/Speedway%20Texas.PNG?alt=media&token=b3a813c1-fd68-45f3-8663-50608c80b884",
            "accessibilityText": "SpeedWay"
          },
          "buttons": [
            {
              "title": "Start Navigation",
              "openUriAction": {
                "uri": "https://www.google.co.in/maps/search/speedway+gas+station+texas/@31.3146931,-102.6298962,6z"
              }
            }
          ]
        }
      },
      {
        "text": {
          "text": [
            "Find Below"
          ]
        }
      }
    ],
    "outputContexts": [
      {
        "name": "projects/speedway-8f435/agent/sessions/6027c37e-b98c-7116-a73e-1bde1be01f49/contexts/storelocation1-followup",
        "lifespanCount": 2,
        "parameters": {
          "speedwayStore": [
            "Store"
          ],
          "speedwayStore.original": "shops"
        }
      }
    ],
    "intent": {
      "name": "projects/speedway-8f435/agent/intents/76d9c6c5-4541-4e42-bb7a-e7e66c8a8abd",
      "displayName": "Store Location1"
    },
    "intentDetectionConfidence": 1,
    "languageCode": "en"
  }
}
response.json(jsonresponse);
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
