const { Entry } = require("../models");

const getAllEntries = async( req , res ) => {
  const { id } = req.user

  try {
    const entries = await Entry.findAll({
      where: {
        userId: id
      }
    });

    res.status(200).json(entries);
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Contact the administrator'
    })    
  }
}

const getEntry = async( req , res ) => {
  const { id } = req.params;

  try {
    const entry = await Entry.findByPk( id );

    res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Contact the administrator'
    })    
  }
}

const postEntry = async( req , res ) => {
  const { id } = req.user
  const { concept, amount, type, category } = req.body;

  try {
    const entry = Entry.build({concept, amount, type, category, userId: id});
    await entry.save();
    
    res.status(201).json( entry );
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Contact the administrator'
    })    
  }
}

const putEntry = async( req , res ) => {
  const { id }   = req.params;
  const { concept, amount, category } = req.body;

  try {
    const entry = await Entry.findByPk( id );

    const data = {
      concept: concept || entry.concept,
      amount: amount || entry.amount,
      category: category || entry.category
    }

    await entry.update(data);
    res.status(200).json( entry );
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Contact the administrator'
    })    
  }   
}

const deleteEntry = async( req , res ) => {
  const { id } = req.params;

  try {
    const entry = await Entry.findByPk( id );

    await entry.destroy();
    res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Contact the administrator'
    }) 
  }
}

module.exports = {
  getAllEntries,
  getEntry,
  putEntry,
  postEntry,
  deleteEntry
}