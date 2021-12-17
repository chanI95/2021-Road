const express = require('express');
const router = express.Router();
router.use(express.static('public'));
const db = require('../config/connection');

const session = require("express-session");
router.use(express.json());

// mbti 첫번째
router.get('/mbti1', function(req, res, next) {
    res.render("mbti")
});

// mbti 첫번째 데이터 전송
// mbti ejs form action으로 전송된 req.body 값을 전달 받는다
// mbti 에서 선택한 값을 1, 2, 3 value를 각각 지정해서 mbti 테이블에 mbti score01에 값 저장
router.post('/mbti01', function(req, res, next) {
    let check = req.body.first;
    check = parseInt(check);
    console.log(check)

    const ssn = req.session;
    ssn.drink_sum = check;

    console.log(ssn)
    console.log(ssn.drink_sum)
    // const check2 = req.body.choice-second;
    // const check3 = req.body;
    // res.json(check3);
    // console.log(check3)
    // db.query = "insert into mbti(score01) values (?)", function(err, data) {
    //     if (err) console.error("err: " + err)
    //     res.redirect('/mbti2')
    //     console.log(data)
    //
    // }
    // const query = "INSERT INTO menu_item("+queryFields+") VALUES ?";
    res.redirect('mbti2')
});


// mbti 두번째
router.get('/mbti2', function(req, res, next) {
    res.render("mbti2")
});

router.post('/mbti02', function(req, res, next) {
    let check= req.body.second;
    check = parseInt(check) // 숫자변환
    console.log(check)
    const ssn = req.session;
    ssn.drink_sum = parseInt(ssn.drink_sum) + check;

    // const check2 = req.body.choice-second;
    // const check3 = req.body;
    // res.json(check3);
    // console.log(check3)
    // db.query = "insert into mbti(score01) values (?)", function(err, data) {
    //     if (err) console.error("err: " + err)
    //     res.redirect('/mbti2')
    //     console.log(data)
    //
    // }
    // const query = "INSERT INTO menu_item("+queryFields+") VALUES ?";
    res.redirect('mbti3')
});




// mbti 세번째
router.get('/mbti3', function(req, res, next) {
    res.render("mbti3")
});

// mbti 세번째 데이터 전송
router.post('/mbti_result', function(req, res, next) {
    let check= req.body.third;
    var page = req.params.page; // :page 로 맵핑할 req 값을 가져온다
    check = parseInt(check)
    console.log(check)
    const ssn = req.session;
    ssn.drink_sum = parseInt(ssn.drink_sum) + check;
    const result_num = ssn.drink_sum;

    console.log(result_num)

    db.query( "select * from liquors inner join snacks on liquors.snack_seq = snacks.snack_seq where liquors.liquor_r_num = (?) ", [result_num] , function(err, snacks){
        if(err) console.error("err" + err);
        console.log(snacks.length);
        // res.redirect('mbti_result' , {snacks : snacks});
        res.render("mbti_result",{"snacks" : snacks})
    });
});

// mbti 결과 페이지
// router.get('/mbti_result', function(req, res, next) {
//     res.render("mbti_result")
// });

module.exports = router;
