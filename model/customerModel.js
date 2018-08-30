
///collections to get 
/// customer name 
/// customer id
/// customer phone number 
/// customer location
/// customer mobile name
/// customer known language

var mongoose= require('mongoose');


var customerDetailSchema = mongoose.Schema({

customer_name:{     type:String, require:true },
customer_id:{     type:Number,     require:true },
customer_phonenumber:{     type:Number,     require:true }, 
customer_location:{type:String,require:true},
customer_mobilename:{type:String,require:true},
customer_language:{type:String,require:true}
});

// model creation
var Customers = module.exports = mongoose.model('customerdetails',customerDetailSchema);

// add Customers

module.exports.addCustomer= function(details,callback){

    Customers.create(details,callback);
}


// get Customers
module.exports.getCustomer= function (callback,limit){

    Customers.find(callback).limit(limit);
}

//get customer by id
 module.exports.getCustomerById=function(cid,callback){
var match= {customer_id:cid}
    Customers.find(match,callback);
 }

// update customer details

module.exports.updateCustomers= function(id,customerObject,callback,options){

var updateId = {_id:id}
var cobject=
    {
        customer_name :customerObject.customer_name,
        customer_location: customerObject.customer_location,
        customer_language : customerObject.customer_language,
        customer_id: customerObject.customer_id,
        customer_phonenumber: customerObject.customer_phonenumber,
        customer_mobilename: customerObject.customer_mobilename
    }

    Customers.findOneAndUpdate(updateId,cobject,callback,options);

}

// delete customer details

module.exports.deleteCustomer= function(id,callback){
 var deleteId={_id:id}
Customers.findOneAndRemove(deleteId,callback);
}


// add customer values from html form

module.exports.AddallUsers= function(obj,callback){
Customers.create(obj,callback);
}