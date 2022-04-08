const { Category } = require("../models");

const getAllCategories = async( req , res ) => {
  const { id } = req.user

  try {
    const categories = await Category.findAll({
      where: {
        userId: id
      }
    });

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Contact the administrator'
    })    
  }
}

const postCategory = async( req , res ) => {
  const { id } = req.user
  const { name} = req.body;

  try {
    const category = Category.build({name, userId: id});
    await category.save();
    
    res.status(201).json( category );
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Contact the administrator'
    })    
  }
}

const putCategory = async( req , res ) => {
  const { id }   = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findByPk( id );

    await category.update({name});
    res.status(200).json( category );
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Contact the administrator'
    })    
  }   
}

const deleteCategory = async( req , res ) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk( id );

    await category.destroy();
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    }) 
  }
}

module.exports = {
  getAllCategories,
  putCategory,
  postCategory,
  deleteCategory
}