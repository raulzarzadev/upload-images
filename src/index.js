const express = require('express');
const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');



//initializations
const app = express();

// Settings

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares


const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
    //extname: file.mimetype
});

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 100000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname){
            return cb(null, true)
        }
        cb("Error: El archivo debe ser un archivo valido")
    }
}).single('image'));


// Routes

app.use(require('./routes/index'))

//static files
app.use(express.static(path.join(__dirname, 'public')))
// Start the server



app.listen(app.get('port'),() => {
 console.log(`Server on port ${app.get('port')}`);
});




