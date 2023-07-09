const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const getAllTags = await ProductTag.findAll({
      where: {
        id,
        tag_id,
      },
      include: 
      [{ model: Product, attributes: ['category_name', 'id']},
       { model: Tag, attributes: ['tag_name', 'id'] }]
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
    const getOneTagByID = await ProductTag.findOne({
      where: {
        id: req.params.id,
      },
      include: 
      [{ model: Product, attributes: ['category_name', 'id']},
       { model: Tag, attributes: ['tag_name', 'id'] }]
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
  
  if(createNewTag[0] === 0){
    res
    .status(404)
    .json({ message: 'Error creating tag' });
  } else{
    res
    .status(200)
    .json(createNewTag, { message: 'Tag created successfully' });
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
      where: req.body.id,
    })
  } catch (err) { 
    res
    .status(500)
    .json(err, { message: 'Server Error: ' + err });
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
    if(deleteTagByID[0] === 0){
      res
      .status(404)
      .json({ message: 'Error deleting tag' });
    }
  } catch (err) { 
    res
    .status(500)
    .json(err, { message: 'Server Error: ' + err });
  }    
});

module.exports = router;
