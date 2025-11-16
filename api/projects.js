import connectDB from '../../backend/src/config/db.js';
import Project from '../../backend/src/models/Project.js';

// Connect to MongoDB
connectDB();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { featured } = req.query;
      const filter = featured !== undefined ? { featured: featured === 'true' } : {};
      
      const projects = await Project.find(filter).sort({ createdAt: -1 });
      
      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch projects'
      });
    }
  } else if (req.method === 'POST') {
    try {
      const project = await Project.create(req.body);
      
      res.status(201).json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }
}
