const express = require('express');
const router = express.Router();

const Idea = require('../models/Idea');

router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({
      code: 200,
      data: ideas,
      message: 'message'
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }

});

// get idea by id
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({
      code: 200,
      data: idea,
      message: 'message'
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
});

// Add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    const newIdea = await idea.save();
    res.status(201).json({code:201,data:newIdea});
  } catch (error) {
    console.log('error',error);
    res.status(500).json({code:500,message:'Sorry, wrong'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        }
      },
      { new: true }
    );
    res.json({code:200,data:updatedIdea});
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    res.json({code:200, message: 'deleted'});
  } catch (error) {
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
});

module.exports = router;