const { Category } = require("../models");

const validateCategory = async(req, res, next) => {
  const categoryId = req.params.id;
  const {id: userId} = req.user;

  const category = await Category.findByPk(categoryId)

  if (!category) {
    return res.status(404).json({
        msg: 'Category does not exist'
    })
  }

  if (category.userId !== userId) {
    return res.status(401).json({
        msg: 'You are not allowed'
    })
  }
  
  next();
}

module.exports = validateCategory