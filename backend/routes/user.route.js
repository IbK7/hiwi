const express = require('express');
const router = express.Router();

const User = require('../models/user.model')

// route: /user/get-all
router.get('/get-all', (req, res) => {
    User.find({}, (err, people) => {
        if (err) res.json(err)
        else res.status(200).json({docs: people})
    })
})

// route: /user/add-to-community
router.post('/add-to-community', (req, res) => {
    const user_to_add = req.body.new_user;
    const current_user = req.body.current_user; //defualt: Harry Potter (_id=6464bd9113ad291662bb8976)

    User.FindOneAndUpdate(
        {_id: current_user._id}, //find current user 
        {$push: {community: user_to_add}}, // update the community with new add
        (err, success) => {
            if (err) res.send(err)
            else res.status(201).json({success: success}) // TODO: Update var name
        }
    ) 
})

// route: /user/add-user
router.post('/add-user', (req, res) => {
    const user = req.body.user;

    const user_to_add = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      age:user.age,
      gender: user.gender,
      skills: user.skills,
      interests: user.interests
    });

    User.create(user_to_add, (err, doc) => {
        if (err) console.log(err)
        else res.status(200).json({docs: doc})
    })
})

module.exports = router;
