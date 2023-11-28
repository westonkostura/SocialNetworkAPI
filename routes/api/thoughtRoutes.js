const router = require('express').Router();
const Thought = require('../../Models/Thought');
const User = require('../../Models/User');

// GET all thoughts
router.get('/', async (req, res) => {
    const thoughts = await Thought.find({});
    res.json(thoughts);
});

// GET single thought by id
router.get('/:id', async (req, res) => {
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
});

// POST new thought
router.post('/', async (req, res) => {
    const newThought = new Thought(req.body);
    const thought = await newThought.save();
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.json(thought);
});

// PUT update thought by id
router.put('/:id', async (req, res) => {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thought);
});

// DELETE remove thought by id
router.delete('/:id', async (req, res) => {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    res.json(thought);
});

// POST add reaction to thought
router.post('/:thoughtId/reactions', async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
});

// DELETE remove reaction from thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
    }
    const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId.toString() === req.params.reactionId);
    if (reactionIndex === -1) {
        return res.status(404).json({ message: 'No reaction found with this id!' });
    }
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    res.json(thought);
});

module.exports = router;