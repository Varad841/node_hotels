const express = require('express');
const router = express.Router();
const person = require('./../models/person');

//POST route to add person
router.post('/', async (req,res)=>{
   try{ 
    //Assuming the request body contains person data
    const data = req.body 

    //Create a new person dicument using the mongoose model
    const newPerson = new person(data);

    //Save the new person to the database
    const response = await newPerson.save();
    console.log('Data saved Successfully');
    res.status(200).json(response);
   }
   catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error occured'});
   }

})

router.get('/',async (req, res) =>{
    try{
        const data = await person.find();
        console.log('Data fetched!');
        res.status(200).json(data);
    }
    catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error occured'});
    }
})

router.get('/:workType', async (req, res)=>{
    try{
        //Extract the work type from URL parameter
        const workType = req.params.workType;
        if(workType=='chef'||workType=='waiter'||workType=='manager')
        {
            const response = await person.find({work: workType});
            console.log('Response Fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


router.put('/:id',async (req, res)=>{
    try{
        const personId = req.params.id;//Extract id from URL parameter
        const updatedPersonData = req.body;//Updated data fro the person

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {        
            new: true,//Return updated document
            runValidators:true,//Run mongoose validations
        })

        if(!response)
        {
            return res.status(404),json({error: 'Person Not Found!'});
        }

        console.log('Data Updated.');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.delete('/:id', async (req, res)=>{
    try
    {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        if(!response)
        {
            return res.status(404).json({error:'Not Found'});
        }

        console.log('Data Deleted Successfully!');
        res.status(200).json({message:'Person deleted Successfully!'});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})
module.exports = router;