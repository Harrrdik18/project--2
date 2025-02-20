const Project = require('../models/project.model');
const File = require('../models/file.model');

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const project = new Project({
      name,
      userId
    });

    await project.save();

    res.status(201).json({
      success: true,
      project
    });

  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    
    // Get file count for each project
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const fileCount = await File.countDocuments({ projectId: project._id });
        return {
          ...project.toObject(),
          fileCount
        };
      })
    );
    
    res.json({
      success: true,
      projects: projectsWithCounts
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, transcript } = req.body;
    
    if (!name || !transcript) {
      return res.status(400).json({ error: 'Name and transcript are required' });
    }

    const newFile = new File({
      name,
      transcript,
      projectId,
      userId: req.user.id
    });

    await newFile.save();
    
    await Project.findByIdAndUpdate(projectId, { updatedAt: Date.now() });

    res.status(201).json({
      success: true,
      file: newFile
    });
  } catch (error) {
    console.error('File creation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    await File.findByIdAndDelete(fileId);
    res.json({ success: true });
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { name, transcript } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (transcript) updates.transcript = transcript;

    const file = await File.findByIdAndUpdate(
      fileId,
      updates,
      { new: true }
    );

    res.json({
      success: true,
      file
    });
  } catch (error) {
    console.error('File update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const { projectId } = req.params;
    const files = await File.find({ 
      projectId,
      userId: req.user.id 
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      files
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({
      success: true,
      file
    });
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}; 