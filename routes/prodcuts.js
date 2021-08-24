//**************LOG HISTORY ***********************
//24.08.2021        Ruchira Wishwajith        Created.
//24.08.2021        Ruchira Wishwajith        Created Model for Pizza Cart

const express = require('express');
const  pizzacart  = require('../models/pizzacartmodel');
const router = express.Router();

//GET ALL
router.get("/", async (req, res) =>
{
    try{
        let prodcuts = await pizzacart.find();
        res.send(prodcuts)
    }
  catch (ex)
  {
      return req.statusCode(500).send("Error",ex.message);
  }
});



//Post Method


router.post("/", (req, res)=>
{
    if (!req,body.name)
    {
        return res.status(400).send("Some Mandotory values are missed. Please check and try again");
    }

    let cart = new cart({
        order: req.body.order,
        products: req.body.prodcuts,
        CreationDate: req.body.CreationDate,
        updatedDate: req.body.updatedDate

    });

    cart =  cart.save();
    res.send(cart);
})