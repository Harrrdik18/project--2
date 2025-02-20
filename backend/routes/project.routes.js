const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, projectController.createProject);
router.get('/', authenticateToken, projectController.getProjects);
router.post('/:projectId/files', authenticateToken, projectController.uploadFile);
router.get('/:projectId/files', authenticateToken, projectController.getFiles);
router.delete('/:projectId/files/:fileId', authenticateToken, projectController.deleteFile);
router.put('/:projectId/files/:fileId', authenticateToken, projectController.updateFile);
router.get('/:projectId/files/:fileId', authenticateToken, projectController.getFile);

module.exports = router; 