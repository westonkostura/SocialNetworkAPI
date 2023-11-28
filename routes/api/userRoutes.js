const router = require('express').Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// GET single user by id
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// POST new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.json(user);
});

// PUT update user by id
router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

// DELETE user by id
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
});

// POST add friend to user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
});

// DELETE remove friend from user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    const friendIndex = user.friends.indexOf(req.params.friendId);
    if (friendIndex !== -1) {
        user.friends.splice(friendIndex, 1);
        await user.save();
    }
    res.json(user);
});

module.exports = router;