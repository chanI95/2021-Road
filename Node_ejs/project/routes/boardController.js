const db = require('../config/connection');
const board_model = require("./board_model");
const filesystem = require("fs")
const path = require("path");


module.exports = {
    // 게시판 목록
    index: function (req, res) {

        board_model.select(db, function(err, data){
            console.log(path.dirname(__filename));
            console.log(err);
            res.render('board', {boards: data });
            //res.render('board', {boards: data });

        });
    },

    // 게시판 글쓰기
    write: function(req, res){
        res.render("boardwrite");
    },

    // 게시판 글쓰고  제출
    submit: function(req, res){


        console.log(req.body);

        console.log(req.file);

        // board.insert(db, req.body, req.file, function(err){
        board_model.insert(db, req.body, req.file, function(err, data){
            // res.redirect('/board');
            res.redirect('/board')
        });
    },

    // 게시판 삭제
    eliminate: function(req, res){
        console.log("complete delete!");
        console.log(req.params.board_seq);
        board_model.returnid(db, req.params.board_seq, function(err, registration){

            // public/ images에 저장되어있는 이미지
            const images_image = "public/images/" +  (registration[0].board_img);
            // res.send(images_image);

            // images 경로에 파일이 삭제되면 삭제된 값의 이미지 링크를 비워둠
            if(filesystem.existsSync(images_image)){
                filesystem.unlinkSync(images_image)
            }

            // model query문 작성
            // 삭제 후 글 목록으로 돌아감
            board_model.delete(db, req.params.board_seq, function(err){
                res.redirect('/board')
            });
        });
    },

    edit: function(req, res) {
        board_model.returnid(db, req.params.board_seq, function(err, registration){
            console.log(registration[0]);
            res.render('boardedit', { board: registration[0] });
        });

    },

    update: function name(req, res){
        console.log(req.body.board_content);
        console.log(req.file);

        if(req.body.board_content){

            board_model.update(db,req.body, req.file, function(err){ });
            console.log("test1");
            res.redirect('/board/');
        }else{
            console.log("test2");
            res.redirect('board');
        }
    },

    detail: function(req, res) {
        board_model.returnid(db, req.params.board_seq, function(err, registration){
            console.log(registration[0]);
            res.render('boardcontent', { board: registration[0] });
        });

    },

    // // 게시판 페이징 기능
    // paging: function (req, res){
    //     board.select(db, function(err, data){
    //         console.log(data);
    //         if(err) console.error(err, data);
    //         res.render('board/board', {title : 'Board~~~', board: data });
    //     });
    // }


}





















// const db = require('../config/connection');
// const board = require("../model/board_model");
// const filesystem = require("fs")
// const path = require("path");
//
//
// module.exports = {
//     // 게시판 목록
//     index: function (req, res) {
//
//         board.select(db, function(err, data){
//             console.log(data);
//             res.render('board.ejs', {boards: data });
//         });
//     },
//
//     // 게시판 글쓰기
//     write: function(req, res){
//         res.render('boardwrite.ejs')
//     },
//
//     // 게시판 글쓰고  제출
//     submit: function(req, res){
//         console.log(req.body);
//         console.log(req.file.filename);
//
//         board.insert(db, req.body, req.file, function(err, data){
//             // res.redirect('/board');
//             res.redirect('board')
//         });
//     },
//
//     // 게시판 삭제
//     eliminate: function(req, res){
//         console.log("complete delete!");
//         console.log(req.params.board_seq);
//         board.returnid(db, req.params.board_seq, function(err, registration){
//
//             // public/ images에 저장되어있는 이미지
//             const images_image = "public/images/" +  (registration[0].board_img);
//             // res.send(images_image);
//
//             // images 경로에 파일이 삭제되면 삭제된 값의 이미지 링크를 비워둠
//             if(filesystem.existsSync(images_image)){
//                 filesystem.unlinkSync(images_image)
//             }
//
//             // model query문 작성
//             // 삭제 후 글 목록으로 돌아감
//             board.delete(db, req.params.board_seq, function(err){
//                 res.redirect('/board')
//             });
//         });
//     },
//
//     edit: function(req, res) {
//         board.returnid(db, req.params.board_seq, function(err, registration){
//             console.log(registration[0]);
//             res.render('/board/boardedit', { board: registration[0] });
//         });
//
//     },
//
//     update: function name(req, res){
//         console.log(req.body.board_content);
//         console.log(req.file);
//
//         if(req.body.board_content){
//             board.update(db,req.body, req.file, function(err){ });
//             res.redirect('/board');
//         }
//     },
//
//     // // 게시판 페이징 기능
//     // paging: function (req, res){
//     //     board.select(db, function(err, data){
//     //         console.log(data);
//     //         if(err) console.error(err, data);
//     //         res.render('board/board', {title : 'Board~~~', board: data });
//     //     });
//     // }
//
//
// }

