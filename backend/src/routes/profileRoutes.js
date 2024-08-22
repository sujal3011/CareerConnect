const express = require('express');
const { getUserProfile, updateUserProfile, createUserProfile } = require('../controllers/profileController');
const router = express.Router();

// Route for getting a user's profile
router.get('/:id', getUserProfile);

// Route for updating a user's profile
router.put('/:id', updateUserProfile);

// Route for creating a user's profile
router.post('/', createUserProfile);

module.exports = router;