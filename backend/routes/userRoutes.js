const {User} = require("../database/models")
const express = require('express')
const router = express.Router()

// this is only for testing with postman

// get users
router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.warn(err);
    res.status(500).json({message: 'An error occured'});
  }
});

//delete user
router.delete('/admin/delete/:idUser', async (req, res) => {
  try {
    const idUser = req.params.idUser;
    console.warn("id::"+idUser)
    const user = await User.findByPk(idUser);        
    if (user) {
        await user.destroy();
        res.status(201).json({ message: "The user account was successfully deleted!" });        
    } else {
      res.status(404).json({ message: "User not found!" });
    }    
  } catch (err) {
    console.warn(err);
    res.status(500).json({message: 'An error occured'});
  }
});

module.exports = router;