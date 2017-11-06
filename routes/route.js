const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");//class contact schema

//get contact 
router.get('/contacts', (req, res, next) => {
    Contact.find(function(err, contacts){
        res.json(contacts);
    })
})

//add contact
router.post('/contact', (req, res, next)=>{
    let newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    newContact.save((err, contact)=>{
        if(err){
            res.json({msg: 'failed to add contact'});
        }else{
            res.json({msg: 'contact added successfully'});
        }
    });
});

//delete contact
router.delete('/contact/:id',(req, res, next)=>{
    //logic to add contact
    Contact.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);  
        }else{
            res.json(result);
        }
    })
})
//update contact
router.put('/contact/:id',(req, res, next)=>{
    console.log("server > PUT ", req.params.id);
    console.log("server > PUT ", req.body)
    Contact.update({_id:req.params.id}, req.body, (err, rawData)=>{
        if(err){
            res.json(err);  
        }else{
            res.json("Update success");
        }
    })
})

module.exports = router;