// src/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

// Create a new job
router.post('/', createJob);

// Get all jobs
router.get('/', getAllJobs);

// Get a job by ID
router.get('/:id', getJobById);

// Update a job by ID
router.put('/:id', updateJob);

// Delete a job by ID
router.delete('/:id', deleteJob);

module.exports = router;