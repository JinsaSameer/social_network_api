const {User} = require('../models');
const userController = {
    // Get all users
    getUser(req, res) {
      User.find()
      /*.select('-__v')*/
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
        /*.then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);*/
          
    },
    // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //create User
  createUser(req, res) {
    User.create(req.body)
    .then((User) => res.json(User))
    .catch((err) => {
      console.log(err);
       res.status(400).json(err)
    });
},
  
  //Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.deleteMany({ _id: { $in: user } })
      )
      .then(() => res.json({ message: 'User Deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //Add a friend
  addFriend(req, res) {
    console.log('You are adding new friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friend: req.body } },
      { runValidators: true, new: true }
    )
    .then((user) => {
      console.log(user)
      if(!user) {
        return res.status(404).json({ message: "No user with this ID!"})
      }
      res.json(user)
    })
    .catch((err) => res.status(500).json(err));
  },
  // Delete Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No friend found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
module.exports = userController;
  