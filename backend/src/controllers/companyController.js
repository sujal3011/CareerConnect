// src/controllers/companyController.js
const db = require('../config/db');

// Create a new company
const createCompany = async (req, res) => {
  const { name, description, website, size, founded_year } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO companies (name, description, location, industry, website, size, founded_year) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, website, size, founded_year]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM companies');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a company by ID
const getCompanyById = async (req, res) => {
  const companyId = parseInt(req.params.id, 10);

  if (isNaN(companyId)) {
    return res.status(400).json({ message: 'Invalid company ID' });
  }

  try {
    const result = await db.query('SELECT * FROM companies WHERE id = $1', [companyId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a company by ID
const updateCompany = async (req, res) => {
  const companyId = parseInt(req.params.id, 10);
  const { name, description, location, industry, website, size, founded_year } = req.body;

  if (isNaN(companyId)) {
    return res.status(400).json({ message: 'Invalid company ID' });
  }

  try {
    const result = await db.query(
      'UPDATE companies SET name = $1, description = $2, location = $3, industry = $4, website = $5, size = $6, founded_year = $7 WHERE id = $8 RETURNING *',
      [name, description, location, industry, website, size, founded_year, companyId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a company by ID
const deleteCompany = async (req, res) => {
  const companyId = parseInt(req.params.id, 10);

  if (isNaN(companyId)) {
    return res.status(400).json({ message: 'Invalid company ID' });
  }

  try {
    const result = await db.query('DELETE FROM companies WHERE id = $1 RETURNING *', [companyId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};