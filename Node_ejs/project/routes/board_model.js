module.exports = {

    // 게시판 리스트 불러올때 쓰임
    select: function (db, data) {

        db.query("SELECT * FROM boards order by board_seq desc", data);
    },

    // boardimage는 boardwrite.ejs의 image input 태그의 name 명
    // 게시판 글쓰기
    insert: function(db, data, board_img, funcion) {
        db.query("INSERT INTO boards(board_title, board_content, board_img, board_like_num, boarder_name, user_id) VALUES(?, ?, ?, ?, ?, ?) ",
            [data.board_title, data.board_content, board_img.filename, data.board_like_num, data.boarder_name, data.user_id], funcion);
        // "INSERT INTO board(board_content, board_image) VALUES (?, ?)", [data.board_content, image.filename], funcion]
    },

    // 글삭제시 id 반환데이터 호출
    returnid: function(db, board_seq, funcion){

        db.query("SELECT * FROM boards WHERE board_seq=?", [board_seq], funcion);

    },

    // 게시판 글 삭제
    delete: function(db, id, funcion) {

        db.query("DELETE FROM boards WHERE board_seq = ?", [id], funcion);

    },

    // 게시판 글 업데이트
    update: function(db, data, board_img, funcion){
        db.query("UPDATE boards SET board_title=?, board_content=?, board_img=?, board_like_num=?, boarder_name=?,user_id=? WHERE board_seq = ?",
            [data.board_title, data.board_content, board_img.filename, data.board_like_num, data.boarder_name, data.user_id, data.board_seq], funcion);
    },

    // detail : function(db, board_seq, funcion){
    //     db.query("SELECT * FROM boards where board_seq = ?", [board_seq], funcion);
    // }

}
