const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//updating the user details
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(400).json(error);
      }
    }
    try {
      const updatedData = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("user updated successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("you can update only yours profile");
  }
});
//updating the user password

router.put("/:id/updatePassword", async (req, res) => {
  console.log(req.body.password);
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(updatedPassword);
      const updatedData = await User.updateOne(
        { _id: req.params.id },
        { $set: { password: updatedPassword } }
      );

      console.log(updatedData);
      res.status(200).json("password updated successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

//deleting the user Account

router.delete("/:id", async (req, res) => {
  // if (req.body.userId === req.params.id) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted");
  } catch (error) {
    res.status().json(error);
  }
  // } else {
  //   res.status(400).json("you can only delete your account");
  // }
});

//get a single user

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const userdata = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, ...other } = userdata._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(400).json(error);
  }
});

//find all friends

router.get("/friends/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const friends = await Promise.all(
      user.followings.map((friendsId) => {
        return User.findById(friendsId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user is followed now");
      } else {
        res.status(200).json("you already following him");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user is unfollowed now");
      } else {
        res.status(200).json("you already unfollowed now");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("you cant follow yourself");
  }
});

//find all user list

router.get("/allUsers", async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
