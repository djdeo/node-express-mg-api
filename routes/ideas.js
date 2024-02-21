const express = require('express');

const router = express.Router();
const ideas = [
  {
    id: 1,
    text: "Create a to-do list app with a drag-and-drop interface.",
    tag: "productivity",
    username: "John Doe",
    date: "2023-03-08"
  },
  {
    id: 2,
    text: "Develop a social media platform for dog lovers.",
    tag: "social media",
    username: "Jane Smith",
    date: "2023-03-09"
  },
  {
    id: 3,
    text: "Build a website that helps users find the best hiking trails in their area.",
    tag: "travel",
    username: "Bob Jones",
    date: "2023-03-10"
  },
  {
    id: 4,
    text: "Create a mobile app that allows users to track their spending and set financial goals.",
    tag: "finance",
    username: "Alice Johnson",
    date: "2023-03-11"
  },
  {
    id: 5,
    text: "Develop a game that teaches children about the solar system.",
    tag: "education",
    username: "Tom Brown",
    date: "2023-03-12"
  }
];

router.get('/', (req, res) => {
  res.json({
    code: 200,
    data: ideas,
    message: 'message'
  });
});

router.get('/:id', (req, res) => {
  const idea = ideas.find(i => i.id === parseInt(req.params.id));
  if (!idea) return res.status(404).send('Idea not found');
  res.json(idea);
});

router.post('/', (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString()
  };
  ideas.push(idea);
  res.status(201).json(idea);
});

router.put('/:id', (req, res) => {
  const idea = ideas.find(i => i.id === parseInt(req.params.id));
  if (!idea) return res.status(404).send('Idea not found');
  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;
  res.json(idea);
});

router.delete('/:id', (req, res) => {
  const idea = ideas.find(i => i.id === parseInt(req.params.id));
  if (!idea) return res.status(404).send('Idea not found');
  const index = ideas.indexOf(idea);
  if (idea.username === req.body.username) {
    ideas.splice(index, 1);
    res.send('Idea deleted');
  } else {
    res.status(403).send(`hi ${req.body.username}, You are not authorized to delete this idea`);
  }
});

module.exports = router;