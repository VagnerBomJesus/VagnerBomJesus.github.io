const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
 
const upload = require('../middlewares/multerConfig'); // Ajuste o caminho conforme necessário

// Rota para upload de imagem em um formulário de blog
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File uploaded successfully. File path: /uploads/${req.file.filename}`);
});
 


router.post('/:blogId/comments', blogController.addComment);

module.exports = router;
