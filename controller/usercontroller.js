const User = require("../model/User");

// POST USER
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
};

// GET SINGLE USER
exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return res.status(404).json({ error: "User not found" });

    res.json(user);
};