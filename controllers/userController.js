// userController
const User = require('../models/User');
const { renderErrMsg, catchAsync } = require('../utils');
const jwt = require('jsonwebtoken');

// create user
exports.createUser = (req, res) => {
  const user = new User(req.body);

  user.save((err, savedUser) => {
    if (err) {
      renderErrMsg(res, err)
    }
    return res.json(savedUser);
  });
};

// get all users
exports.getAllUsers = (req, res) => {
  User.find({}).select('-__v -updatedAt').then(users => {
    res.status(200).json(users);
  }).catch(err => {
    renderErrMsg(res, err)
  });
};

// get a single user by id
exports.getUserById = (req, res) => {
  const id = req.params.id;

  User.findById(id).then(user => {
    if (!user) {
      return res.status(404).json({
        error: 'Sorry, no user found for the provided id',
      });
    }
    res.status(200).json(user);
  }).catch(err => {
    renderErrMsg(res, err)
  });
};

// update a user by id
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(updatedUser => {
    res.status(200).json(updatedUser);
  }).catch(err => {
    renderErrMsg(res, err)
  });
};

// delete a user by id
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id).then(deletedUser => {
    res.status(200).json(deletedUser);
  }).catch(err => {
    renderErrMsg(res, err)
  });
};

// update all users with new property 'email'
exports.updateAllUsers = (req, res) => {
  const email = req.body.email;

  User.updateMany({}, { $set: { email } }, { new: true }).then(updatedUsers => {
    res.status(200).json(updatedUsers);
  }).catch(err => {
    renderErrMsg(res, err)
  });
};


// forget password
exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new AppError('There is no user with email address.', 404))
  }

  // generate random reset token
  const resetToken = user.createPasswordResetToken()
  console.log('resetToken', resetToken)
  await user.save({ validateBeforeSave: false })
  res.send({done: true})
})
