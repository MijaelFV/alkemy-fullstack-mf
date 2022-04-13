const { Entry } = require("../models");
const { Category } = require("../models");

const getEntries = async( req , res ) => {
  const { id } = req.user

  try {
    const entries = await Entry.findAll({
      limit: 10,
      where: {
        userId: id
      },
      attributes: ['id', 'concept', 'amount', 'type', 'date'],
      include: [
        {
          model: Category,
          attributes: ['name', 'id']
        }
      ],
      order: [
        ['date', 'DESC']
      ]
    });
    
    const allEntries = await Entry.findAll({
      attributes: ['amount', 'type'],
      where: {
        userId: id
      },
    })
    
    let totalExpenses = 0;
    let totalIncomes = 0;

    allEntries.filter(e => e.type === "income")
      .forEach((item) => {
        totalIncomes += item.amount
      })

    allEntries.filter(e => e.type === "expense")
      .forEach((item) => {
        totalExpenses += item.amount
      })

    const balance = totalIncomes - totalExpenses;

    res.status(200).json({
      entries, 
      balance
    });
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
  const { concept, amount, type, category, date } = req.body;

  try {
    const entry = Entry.build({concept, amount, type, date, categoryId: category, userId: id});
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
  const { concept, amount, category, date } = req.body;

  try {
    const entry = await Entry.findByPk( id );

    const data = {
      concept: concept || entry.concept,
      amount: amount || entry.amount,
      categoryId: category || entry.categoryId,
      date: date || entry.date
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
  getEntries,
  getEntry,
  putEntry,
  postEntry,
  deleteEntry
}