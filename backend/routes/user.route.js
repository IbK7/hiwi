const express = require('express');
const router = express.Router();

const User = require('../models/user.model')

// route: /users/get-all
router.get('/get-all', (req, res) => {
    User.find({}, (err, people) => {
        if (err) res.json(err)
        else res.status(200).json({docs: people})
    })
})

// route: /users/add-to-community
router.post('/add-to-community', (req, res) => {
    const user_to_add = req.body.new_user;
    const current_user = req.body.current_user; //defualt: Harry Potter (_id=6464bd9113ad291662bb8976)

    User.findById(current_user, (err, doc) => {
        if (err) console.log(err)
        else {
            if (doc.community.includes(user_to_add._id)) {
                res.status(403).json({
                    status:403,
                    message: "User exists in community"
                })
            }
            else {
                User.findOneAndUpdate(
                    {_id: current_user}, //find current user 
                    {$push: {community: user_to_add}},
                    {new: true}, // update the community with new add
                    (err, success) => {
                        if (err) res.send(err)
                        else res.status(201).json({success: success}) // TODO: Update var name
                    }
                ) 
            }
        }
    })
    
})

// route: /users/get-current
router.post('/get-current', (req, res) => {
    const user_id = req.body.id;

    User.findById(user_id, (err, doc) => {
        if (err) console.log(err)
        else res.status(200).json({
            user: doc
        })
    })
})


router.get('/get-community/:id', async (req, res) => {
    const user_id = req.params;

    const user = await User.findById(user_id.id)

    const community_arr = user.community;
    var community = [];
    for (let i = 0; i < community_arr.length; i++){
        const community_member = await (User.findById(community_arr[i]))

        community.push(community_member)
    }

    if(community.length !== 0) {
        res.status(200).send(community)
    } else {
        res.status(404).send("Community is empty")
    }

})

//
router.post('/remove-from-community', async (req, res) => {
    const user_to_remove = req.body.remove_user;
    const current_user = req.body.current_user; //defualt: Harry Potter (_id=6464bd9113ad291662bb8976)

    User.findById(current_user, (err, doc) => {
        if (err) console.log(err)
        else {
            if (!doc.community.includes(user_to_remove)) {
                res.status(403).json({
                    status:403,
                    message: "User does not exist community"
                })
            }
            else {
                User.findOneAndUpdate(
                    {_id: current_user}, //find current user 
                    {$pull: {community: user_to_remove}},
                    {new: true}, // update the community with new add
                    (err, success) => {
                        if (err) res.send(err)
                        else res.status(201).json({success: success}) // TODO: Update var name
                    }
                ) 
            }
        }
    })

})

/* 

*/

module.exports = router;
