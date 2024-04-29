const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Definir o caminho da pasta de destino
        cb(null, path.join(__dirname, 'public/uploads'));
    },
    filename: function(req, file, cb) {
        // Definir o nome do arquivo para evitar conflitos de nomeação
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
