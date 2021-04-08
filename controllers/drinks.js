const Drink = require('../models/drink');
const User = require('../models/user');

async function save (req, res) {
    const { drink } = req.body;
    drink.player = await User.findOne({ 'name.knownAs': drink.player });
    await new Drink(drink).save();
    res.redirect('/demerits');
};

async function update (req, res) {

};

module.exports = { save, update };