const express = require('express')
const router  = express.Router();
const MenuItem = require('./../models/menu');

//POST route for adding menu items
router.post('/', async (req, res)=>{
    try{
        const data = req.body;
        const newItem = new MenuItem(data);

        const response = await newItem.save();
        console.log('Menu Item added successfully!!');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error!'});
    }
})

router.get('/', async (req, res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data Retrieved Successfully!!');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error Occured!!'});
    }
})

router.get('/:taste', async (req, res)=>{
    try{
        //Extract the taste from URL parameter
        const tasteType = req.params.taste;
        if(tasteType=='sweet'||tasteType=='spicy'||tasteType=='sour')
        {
            const response = await MenuItem.find({taste: tasteType});
            console.log('Response Fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


router.put('/:id', async(req, res)=>{
    try{
        const menuId = req.params.id;
        const UpdatedMenuData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, UpdatedMenuData,{
            new: true,
            runValidators: true,
        })

        if(!response)
        {
            return res.status(404).json({error:'Not found!'})
        }

        console.log('Menu data Updtaed !');
        res.status(200).json(response);
    }

    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error!'});
    }
})


router.delete('/:id',async (req, res)=>{
    try
    {
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response)
        {
            return res.status(404).json({error:'Not Found!'});
        }

        console.log('Deletion Successfull!');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:'Internal Server Error Occured!!'});
    }
})

module.exports = router;