import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc Register User
 * @route POST /api/auth/register
 */

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, category } = req.body;

    const userExists = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists with email or phone",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      category,
    });

    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        category: user.category,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Login User
 * @route POST /api/auth/login
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Logout User
 */
export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
