// src/controllers/applicationController.js
const db = require('../config/db');

// Create a new application
const createApplication = async (req, res) => {
  const { job_id, user_id, cover_letter, resume_url, status } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO applications (job_id, user_id, cover_letter, resume_url, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [job_id, user_id, cover_letter, resume_url, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM applications');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get an application by ID
const getApplicationById = async (req, res) => {
  const applicationId = parseInt(req.params.id, 10);

  if (isNaN(applicationId)) {
    return res.status(400).json({ message: 'Invalid application ID' });
  }

  try {
    const result = await db.query('SELECT * FROM applications WHERE id = $1', [applicationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an application by ID
const updateApplication = async (req, res) => {
  const applicationId = parseInt(req.params.id, 10);
  const { job_id, user_id, cover_letter, resume_url, status } = req.body;

  if (isNaN(applicationId)) {
    return res.status(400).json({ message: 'Invalid application ID' });
  }

  try {
    const result = await db.query(
      'UPDATE applications SET job_id = $1, user_id = $2, cover_letter = $3, resume_url = $4, status = $5 WHERE id = $6 RETURNING *',
      [job_id, user_id, cover_letter, resume_url, status, applicationId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an application by ID
const deleteApplication = async (req, res) => {
  const applicationId = parseInt(req.params.id, 10);

  if (isNaN(applicationId)) {
    return res.status(400).json({ message: 'Invalid application ID' });
  }

  try {
    const result = await db.query('DELETE FROM applications WHERE id = $1 RETURNING *', [applicationId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};