const express = require('express');
const router = express.Router();
const extractFile = require('../middleware/extractFile');
const PostController = require('../controllers/post');
const checkAuth = require('../middleware/check-auth');


router.post('', checkAuth, extractFile , PostController.createPost);

router.put('/:id', checkAuth, extractFile , PostController.updatePost);

router.get('/:id', PostController.fetchParticularPost);

router.get('', PostController.fetchAllPosts);

router.delete('/:id', checkAuth, PostController.deletePost);



module.exports = router;