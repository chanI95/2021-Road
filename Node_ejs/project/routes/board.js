const express = require('express');
const router = express.Router();
const boardController = require('./boardController');
router.use(express.static('public'));
//const board_model = require('../model/board_model');
const db = require('../config/connection');

const multer = require('multer');
const day = Date.now();

const ms = multer.diskStorage(
    {
        destination: function name(request, file, callback) {
            callback(null, './public/images/');
        },
        filename: function(request, file, callback) {
            console.log(file);
            callback(null, day + "_" + file.originalname);
        }
    }
);

const imagestorage = multer({storage:ms});

router.get('/', boardController.index);
// router.get('/test',(req,res,next)=>{
//     res.render('board');
// });
router.get('/boardwrite', boardController.write);


router.post('/', imagestorage.single("board_img"),boardController.submit);

router.post('/eliminate/:board_seq',boardController.eliminate);

router.post('/boardedit/:board_seq',boardController.edit);

router.post('/update', imagestorage.single("board_img"),boardController.update);

router.post('/boardcontent/:board_seq',boardController.detail);



module.exports = router;
