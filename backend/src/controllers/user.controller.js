import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // basic validation

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists!" });
        }

        // create new user
        const newUser = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false,
        });

        res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // compare password
        const isMtach = await user.comparePassword(password);
        if (!isMtach) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        res.status(200).json({ message: "User logged in successfully", user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Here you can implement logic to invalidate the user's session or token
        res.status(200).json({ message: "User logged out successfully" });

        


    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Server error" });
    }
}
export { registerUser, loginUser, logoutUser };