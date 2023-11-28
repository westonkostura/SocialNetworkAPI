const router = require('express').Router();
const User = require('../../Models/User');
const Thought = require('../../Models/Thought');

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

// PUT update user's username by id
router.put('/:id', async (req, res) => {
    const { username } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { username }, { new: true });
    res.json(user);
});

// DELETE user by id
router.delete('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
    }
    // Remove user's thoughts
    await Thought.deleteMany({ username: user.username });
    // Remove user
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User and associated thoughts deleted!' });
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