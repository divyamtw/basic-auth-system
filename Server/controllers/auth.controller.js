const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password)
            return res.status(400).json({
                message: "All fields are required",
            });

        let user = await userModel.findOne({ email });
        if (user)
            return res.status(400).json({
                message: "User already exist",
            });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(200).json({ message: "User created Successfully!" });
    } catch (error) {
        res.status(500).json(
            {
                message: "Something went wrong!",
            },
            error
        );
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid user",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "email or password is wrong" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
        });

        res.status(200).json({
            message: "Login Successfully!",
            user: safeUser,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out Successfully!" });
};

module.exports.profile = (req, res) => {
    res.status(200).json({
        user: req.user,
    });
};
