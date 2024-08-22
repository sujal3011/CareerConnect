const db = require('../config/db');

// Get user profile
const getUserProfile = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
        const result = await db.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
        const profile = result.rows[0];
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { bio, linkedin_url, github_url, portfolio_url, skills, experience, education } = req.body;
    try {
        const result = await db.query(
            'UPDATE profiles SET bio = $1, linkedin_url = $2, github_url = $3, portfolio_url = $4, skills = $5, experience = $6, education = $7 WHERE user_id = $8 RETURNING *',
            [bio, linkedin_url, github_url, portfolio_url, skills, experience, education, userId]
        );
        const updatedProfile = result.rows[0];
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(updatedProfile);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create user profile
const createUserProfile = async (req, res) => {
    const { user_id, bio, linkedin_url, github_url, portfolio_url, skills, experience, education } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO profiles (user_id, bio, linkedin_url, github_url, portfolio_url, skills, experience, education) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [user_id, bio, linkedin_url, github_url, portfolio_url, skills, experience, education]
        );
        const newProfile = result.rows[0];
        res.status(201).json(newProfile);
    } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    createUserProfile
};
