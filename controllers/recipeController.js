const recipes=[
    {id:1,title:"pancik",category:"Cakes_and_Cookies",difficulty:"eazy"},
    {id:2,title:"Chocolate mousse",category:"Desserts",difficulty:"medium"},
    {id:3,title:"chicken",category:"Cooking",difficulty:"eazy"},
    {id:4,title:"matbucha",category:"Salads",difficulty:"difficult"},
]



exports.addrecipes = (req, res) => {
    console.log(req.body);
    recipes.push(req.body);
    res.send(recipes);
};


exports.deleterecipes = (req, res) => {
    const id = Number(req.params.id);
    const index = recipes.findIndex(rec => rec.id === id);

    if (index === -1) {
        return res.status(404).send("recipes not found");
    }

    recipes.splice(index, 1);
    res.send("recipes deleted");
};



exports.recipesUpdate=(req, res) => {
  const recipeId = parseInt(req.params.id);
  const updatedData = req.body;

  // find index
  const index = recipes.findIndex(r => r.id === recipeId);

  if (index === -1) {
    return res.status(404).json({ message: "recipe not found" });
  }

  // merge old + new
  recipes[index] = {
    ...recipes[index],
    ...updatedData
  };

   res.send("recipes update");
};














