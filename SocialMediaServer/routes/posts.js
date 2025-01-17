const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../models/posts');

router.post('/post',
    [auth, [
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('latitude', 'Latitude is required').isFloat({ min: -90, max: 90 }),
        check('longitude', 'Longitude is required').isFloat({ min: -180, max: 180 })
    ]], async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ message: 'Invalid inputs' });
        }
        try {
            // Create a new post
            const post = new Post({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            });

            // Save the post to the database
            await post.save();

            // Return the new post object
            res.json({
                id: post.id,
                title: post.title,
                description: post.description,
                latitude: post.latitude,
                longitude: post.longitude,
                createdAt: post.createdAt,
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Get all posts
router.get('/getPosts', auth, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a specific post by ID
router.get('/getPostById/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        
        // Handle invalid ObjectId
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.status(500).send('Server Error');
    }
});


router.delete('/deletePost/:id', auth, async (req, res) => {
    try {
      // Find the post by ID and verify it was created by the authenticated user
      const post = await Post.findOne({ _id: req.params.id });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
 
      // Delete the post and its associated comments
      await Post.deleteOne({ _id: req.params.id });
 
      res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;