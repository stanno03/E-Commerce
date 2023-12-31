const router = require('express').Router();
const { Tag, Product } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const getAllTags = await Tag.findAll({
      include: 
      [{ model: Product, attributes: ['product_name', 'id', 'price', 'stock', 'category_id']}]
    })
  
    if(!getAllTags){
      res  
      .status(404)
      .json({ message: 'No tags found' });
    }
    if(getAllTags){
      res
      .status(200)
      .json(getAllTags);
    }  
    } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const getOneTagByID = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: 
      [{ model: Product, attributes: ['product_name', 'id', 'price', 'stock', 'category_id']}]
    })
  
    if(!getOneTagByID){
      res
      .status(404)
      .json({ message: 'No tags found' });
    }
    if(getOneTagByID){
      res
      .status(200)
      .json(getOneTagByID);
    }  
    } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try{
    const createNewTag = await Tag.create({
      tag_name: req.body.tag_name,
    })
  
  if(!createNewTag){
    res
    .status(500)
    .json({ message: 'Error creating tag' });
  } else{
    res
    .status(200)
    .json({ message: 'Tag created successfully' });
  }
  } catch (err) {
    res
    .status(500)
    .json(err, { message: 'Server Error: ' + err });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update({

        tag_name: req.body.tag_name,
      },
      {
        where: {
         id: req.params.id
        }, 
    })

    if(!updateTag || updateTag === 0){
      res
      .status(404)
      .json({ message: 'Error updating tag' });
    }else{
       res
      .status(200)
      .json({ message: 'Tag updated successfully' });
    }
  } catch (err) { 
    res
    .status(500)
    .json({ message: 'Server Error: ' + err });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTagByID = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if(deleteTagByID === 0){
      res
      .status(404)
      .json({ message: 'Error deleting tag' });
    } else {
      res
      .status(200)
      .json({ message: 'Tag deleted successfully' });
    }
  } catch (err) { 
    res
    .status(500)
    .json(err, { message: 'Server Error: ' + err });
  }    
});

module.exports = router;
