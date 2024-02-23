const express = require('express');
const router = express.Router();

const multer = require('multer');
// set the storage destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    console.log('storage file', file)
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
});

// initialize the upload variable
const upload = multer({ storage });

const authen = require('../middleware/authen');
// this 'avatar' field must be the name from the request body
router.post('/img', authen, upload.single('avatar'), (req, res) => {
    res.send({message: 'success', path: req.file.filename });
});

module.exports = router;