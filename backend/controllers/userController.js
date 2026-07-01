import User from "../models/User.js";

export async function getUsers(req, res) {
  try {
    const users = await User.find().select("_id name");

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}