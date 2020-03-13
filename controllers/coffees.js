const express = require("express");
const router = express.Router();
const Coffee = require("../models/coffee.js");

// NEW
router.get("/new", (req, res) => {
  res.render("new.ejs");
  // res.send("Test test");
});

//CREATE
router.post("/", (req, res) => {
    console.log(req.body);
  if (req.body.inStock === "on") {
    req.body.inStock = true;
  } else {
    req.body.inStock = false;
  }
  Coffee.create(req.body, (error, result) => {
    // res.send(result);
    res.redirect("/coffee");
  });
});

//SHOW
router.get("/:id", (req, res) => {
  Coffee.findById(req.params.id, (err, foundCoffee) => {
    res.render("coffee.ejs", {
      Coffee: foundCoffee
    });
  });
});

// EDIT
router.get("/:id/edit", (req, res) => {
  Coffee.findById(req.params.id, (err, foundCoffee) => {
    res.render("edit.ejs", {
      coffee: foundCoffee
    });
  });
});

// PUT/UPDATE
router.put("/:id", (req, res) => {
  if (req.body.inStock === "on") {
    req.body.inStock = true;
  } else {
    req.body.inStock = false;
  }
  Coffee.findByIdAndModify(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedModel) => {
      res.redirect("/coffee");
    }
  );
});
// INDEX
router.get("/", (req, res) => {
  Coffee.find({}, (error, coffee) => {
    res.render("coffee.ejs", { coffee });
  });
});
//DELETE
router.delete("/:id", (req, res) => {
  Coffee.findByIdAndModify(req.params.id, (err, data) => {
    res.redirect("/coffee");
  });
});

module.exports = router;
