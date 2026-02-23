const express = require("express");
const router = express.Router();


const recipesController = require("../controllers/recipeController");

router.post("/add", recipesController.addrecipes);

router.delete("/delete/:id", recipesController.deleterecipes);

router.put("/update/:id", recipesController.recipesUpdate);

module.exports = router;
