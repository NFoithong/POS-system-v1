const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const use = new User({ name, email, password });
        await User.save();
        res.status(201).jason({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).jason({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ messgae: 'Invalid credentials '});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ meassge: 'Invalid credentials'});
        }

        const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, user: {id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};