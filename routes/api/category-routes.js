const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // query the db to find all categories
  try{
    const getAllCategories = await Category.findAll({
      where: {
        id,
        category_name,
      },
      include: 
      [{ model: Product, attributes: ['product_name', 'id', 'price', 'stock', 'category_id']}]
    })
  
    if(!getAllCategories){
      res
      .status(404)
      .json({ message: 'No categories found' });
    }
    if(getAllCategories){
      res
      .status(200)
      .json(getAllCategories);
    }  
    } catch (err) { 
      res.status(500).json(err);
  }
  });
  

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // query the db to find one category by its id
  try{
     const getOneCatergoryByID = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: 
      [{ model: Product, attributes: ['product_name', 'id', 'price', 'stock', 'category_id']}]
     })
    //  if no category is found, return an error
      if(!getOneCatergoryByID){
        res
        .status(404)
        .json({ message: 'No category found with this id' });
      }
      // if a category is found, return the data
      if(getOneCatergoryByID){
        res
        .status(200)
        .json(getOneCatergoryByID);
      }
    //  if there is an error, return the error
  }   catch (err) {
        res
        .status(500)
        .json(err);
    }
});


router.post('/', async (req, res) => {
  // create a new category
  try{
      const createNewCategory = await Category.create({
        where: {
        category_name: req.body.category_name,
        },
      })
      // test to see if the category was created
      if(createNewCategory[0] === 0){
        res
        .status(404)
        .json({ message: 'Error creating category'});
      }

      if(createNewCategory){
        res
        .status(200)
        .json(createNewCategory);
      }
    // catch any errors
  } catch (err) {
    res
    .status(500)
    .json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update({
      where: {
        id: req.params.id,
        category_name: req.body.category_name,
      },
    })
    // test to see if the category was updated
    if(updateCategory[0] === 0){
      res
      .status(404)
      .json({ message: 'Error updating category'});
    }
    if(updateCategory){
      res
      .status(200)
      .json(updateCategory);
    }
  } catch(err) {
    res
    .status(500)
    .json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      if(deleteCategory === 0){
        res
        .status(404)
        .json({ message: 'Error deleting category'});
      } else {
        res
        .status(200)
        .json(deleteCategory);
      }
  } catch(err){
    res
    .status(500)
    .json(err);
  }
});

module.exports = router;
