const db = require('../config/db');

// Create a new job
const createJob = async (req, res) => {
  const { title, description, location, salary_range, job_type, experience_years, company_id, role_category, department_id } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO jobs (title, description, location, salary_range, job_type, experience_years, company_id, role_category, department_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, description, location, salary_range, job_type, experience_years, company_id, role_category, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all jobs with filters
const getJobs = async (req, res) => {
  const { title, location, salary_range, job_type, experience_years, company_id, role_category, department_id } = req.query;

  let query = 'SELECT * FROM jobs WHERE 1=1';
  const values = [];

  if (title) {
    query += ` AND title ILIKE $${values.length + 1}`;
    values.push(`%${title}%`);
  }
  if (location) {
    query += ` AND location ILIKE $${values.length + 1}`;
    values.push(`%${location}%`);
  }
  if (salary_range) {
    query += ` AND salary_range = $${values.length + 1}`;
    values.push(salary_range);
  }
  if (job_type) {
    query += ` AND job_type = $${values.length + 1}`;
    values.push(job_type);
  }
  if (experience_years) {
    query += ` AND experience_years = $${values.length + 1}`;
    values.push(experience_years);
  }
  if (company_id) {
    query += ` AND company_id = $${values.length + 1}`;
    values.push(company_id);
  }
  if (role_category) {
    query += ` AND role_category = $${values.length + 1}`;
    values.push(role_category);
  }
  if (department_id) {
    query += ` AND department_id = $${values.length + 1}`;
    values.push(department_id);
  }

  try {
    const result = await db.query(query, values);
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
  const { title, description, location, salary_range, job_type, experience_years, company_id, role_category, department_id } = req.body;

  if (isNaN(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }

  try {
    const result = await db.query(
      'UPDATE jobs SET title = $1, description = $2, location = $3, salary_range = $4, job_type = $5, experience_years = $6, company_id = $7, role_category = $8, department_id = $9 WHERE id = $10 RETURNING *',
      [title, description, location, salary_range, job_type, experience_years, company_id, role_category, department_id, jobId]
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
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};