// src/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const { createApplication, getAllApplications, getApplicationById, updateApplication, deleteApplication } = require('../controllers/applicationController');

// Create a new application
router.post('/', createApplication);

// Get all applications
router.get('/', getAllApplications);

// Get an application by ID
router.get('/:id', getApplicationById);

// Update an application by ID
router.put('/:id', updateApplication);

// Delete an application by ID
router.delete('/:id', deleteApplication);

module.exports = router;