// src/controllers/jobController.js
const db = require('../config/db');

// Create a new job
const createJob = async (req, res) => {
  const { title, description, location, salary_range, job_type, experience_years, company_id } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO jobs (title, description, location, salary_range, job_type, experience_years, company_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, location, salary_range, job_type, experience_years, company_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a job by ID
const getJobById = async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  if (isNaN(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const result = await db.query('SELECT * FROM jobs WHERE id = $1', [jobId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a job by ID
const updateJob = async (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const { title, description, location, salary_range, job_type, experience_years, company_id } = req.body;

  if (isNaN(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const result = await db.query(
      'UPDATE jobs SET title = $1, description = $2, location = $3, salary_range = $4, job_type = $5, experience_years = $6, company_id = $7 WHERE id = $8 RETURNING *',
      [title, description, location, salary_range, job_type, experience_years, company_id, jobId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a job by ID
const deleteJob = async (req, res) => {
  const jobId = parseInt(req.params.id, 10);

  if (isNaN(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const result = await db.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [jobId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};