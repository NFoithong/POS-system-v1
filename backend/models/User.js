const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'staff', // or 'admin'
    },
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

const User = mongoose.model('User', userSchema);
module.exports = User;