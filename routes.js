const express = require("express");
const router = new express.Router();
const items = require('./fakeDb')
const ExpressError = require('./error')



router.get('/', function(req,res,next){
    return res.json({"cart": items})
})

router.post('/', function(req,res,next){
    console.log(req)

    try{
        if (Object.keys(req.body).length > 2){
            throw new ExpressError("additional keys detected, only include item name and price",403)
        }

        if (!req.body.name || !req.body.price){
            throw new ExpressError("Item must have name and price", 403)
        }

        if (items.find(el => el.name === req.body.name )){
            throw new ExpressError(message = "Item already in cart", 403)
        }
    }catch(e){return next(e)}
    items.push(req.body);
    res.json({"added": req.body})
})

router.get('/:name', function(req,res,next){
    const item = items.find(el => el.name === req.params.name)
    try{
        if (!item){
            throw new ExpressError("item not found in cart",400)
        }
    }catch(e){return next(e)}

    return res.json(item)
})

router.patch('/:name',function(req,res,next){
    const updated = req.body;
    try{
        if (Object.keys(updated).length > 2){
            throw new ExpressError("additional keys detected, only include item name and price",403)
        }

        if (!req.body.name || !updated.price){
            throw new ExpressError("Item must have name and price", 403)
        }
    }catch(e){return next(e)}

    const item = items.find(el => el.name === req.params.name )
    item.name = updated.name;
    item.price = updated.price;
    res.json(item)
})

router.delete('/:name',function(req,res,next){
    const index = items.findIndex(el => el.name === req.params.name )
    
    try{
        if (!index){
            throw new ExpressError("item not found in cart",400)
        }
    }catch(e){return next(e)}

    items.splice(index,1);
    return res.json({message: "Deleted"})
})


module.exports = router