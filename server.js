const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
app.set('port',port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

/*----------passport------------------
const passport = require('passport');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
-----------------------------------*/
/*
app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  });
*/
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
    multipleStatements: true
});

connection.connect();

/*------------------관리자화면---------------------------*/

//admin) 메인화면
app.get('/admin/adminMain', (req, res) => {
    var query = 'SELECT h.idhistory as id, s.shop_name as shopName, s.shop_tel_number as shopNumber, s.shop_roadname_address as address,';
        query +=       'u.users_name as workerName,h.shop_history_status as progress, h.shop_history_memo as memo';
        query +=' FROM shops as s, shop_history as h left outer join users as u ON  h.shop_history_user_id = u.iduser';
        query +=' WHERE h.shop_history_is_weekly_goal = True AND h.shop_history_shop_id = s.idshop';
        query +=' ORDER BY u.users_name ASC, s.shop_name ASC';
    connection.query(
        query,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//admin) 매장관리 > 전체매장
app.get('/admin/totalShop/shop1Table', (req, res) => {
    //메인 테이블
    var query1 = 'SELECT idshop as id,shop_name as shopName,shop_tel_number as shopNumber, shop_roadname_address as address'
        query1 += ' FROM shops WHERE shop_enabled != 0'
    //히스토리 테이블
    var query2 = 'SELECT h.idhistory as id, h.shop_history_shop_id as shop_id,DATE_FORMAT(h.shop_history_create_time,"%Y-%m-%d") as date,'
        query2 += 'u.users_name as workerName, u.users_phone as phone,h.shop_history_status as progress, h.shop_history_memo as memo'
        query2 +=  ' FROM shop_history as h, users as u WHERE h.shop_history_user_id = u.iduser';
        query2 +=  ' ORDER BY h.shop_history_create_time DESC';
   connection.query(query1, function (err, row1,fields) { 
        connection.query(query2, function (err, row2, fields) {
          res.send({
            row1: row1,
            row2: row2,
          });
        });
    });
});

//admin) 매장관리 > 매장분배 - 직원테이블
app.get('/admin/shopDistribution/shop2Table', (req, res) => {
    connection.query(
        'SELECT iduser as id,users_name,users_auth,users_phone,users_email FROM users WHERE users_enabled != 0 and users_is_leader != 1',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//admin) 매장관리 > 매장분배 - 매장테이블
app.get('/admin/shopDistribution/shop2TableUnder', (req, res) => {
    //메인 테이블
    var query1 = 'select h.idhistory as id,s.idshop as shopId, s.shop_name as shopName, s.shop_tel_number as shopNumber, s.shop_roadname_address as address'
        query1 += ' from shop_history as h, shops as s'
        query1 += ' where h.shop_history_shop_id = s.idshop and h.shop_history_is_weekly_goal = True';
    //히스토리 테이블
    var query2 = 'SELECT h.idhistory as id, h.shop_history_shop_id as shopId,DATE_FORMAT(h.shop_history_create_time,"%Y-%m-%d") as date,'
        query2 += 'u.users_name as workerName, u.users_phone as phone,h.shop_history_status as progress, h.shop_history_memo as memo'
        query2 +=  ' FROM shop_history as h, users as u'
        query2 +=  ' WHERE h.shop_history_user_id = u.iduser and h.shop_history_is_weekly_goal != True and h.shop_history_shop_id in'
        query2 +=  ' (select distinct shop_history_shop_id from shop_history where shop_history_is_weekly_goal = True)';    
   connection.query(query1, function (err, row1,fields) { 
        connection.query(query2, function (err, row2, fields) {
          res.send({
            row1: row1,
            row2: row2,
          });
        });
    });
});

//admin) 매장관리 > 매장영업내역
app.get('/admin/shopAccumulate', (req, res) => {
    var query = 'SELECT h.idhistory as id, s.shop_name as shopName, s.shop_tel_number as shopNumber, s.shop_roadname_address as address,'
        query += 'DATE_FORMAT(h.shop_history_create_time,"%Y-%m-%d") as period,u.users_name as workerName, h.shop_history_status as progress, h.shop_history_memo as memo'
        query += ' FROM shops as s, shop_history as h left outer join users as u on  h.shop_history_user_id = u.iduser'
        query += ' WHERE h.shop_history_is_weekly_goal != True AND h.shop_history_shop_id = s.idshop'
    connection.query(
        query,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//admin) 직원관리 > 직원영업현황 - Table
app.get('/admin/workers1/workers1Table', (req, res) => {
    //직원 정보 가져오는 쿼리
    var query1 = 'select iduser as id, users_name as workerName, users_auth as auth, users_email as email, users_phone as phone'
        query1 += ' from users where users_enabled = 1 and users_is_leader != 1'
    //이번주 목표 내역 전부 가져오는 쿼리
    var query2 = 'select h.idhistory as id, h.shop_history_user_id as workerId, h.shop_history_status as status'
        query2 += ' from shop_history as h'
        query2 += ' where h.shop_history_is_weekly_goal = True'
    connection.query(query1, function (err, row1,fields) { 
        connection.query(query2, function (err, row2, fields) {
            res.send({
                row1: row1,
                row2: row2,
            });
        });
    });
}); 

//admin) 직원관리 > 직원영업현황 - modalTable
app.get('/admin/workers1/modalTable', (req, res) => {
    //해당 직원의 이번주 영업 내역 가져오기
    let param = [req.query.thisId];//받은 파라미터
    var query = 'select h.idhistory as id, s.shop_name as shopName, s.shop_tel_number as shopNumber, s.shop_roadname_address as address,'
        query += 'h.shop_history_status as progress, h.shop_history_memo as memo'
        query += ' from shop_history as h, shops as s'
        query += ' where h.shop_history_shop_id = s.idshop and h.shop_history_is_weekly_goal = True and h.shop_history_user_id = ?'
    var querys = mysql.format(query,param);//sql문에 인자 넣어주기
    connection.query(
        querys,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//admin) 직원관리 > 직원관리 - Table
app.get('/admin/workers2/worker2Table', (req, res) => {
    var query = 'select iduser as id, users_name as workerName, users_auth as auth, users_email as email, users_phone as phone'
        query += ' from users where users_enabled = 1 and users_is_leader != 1'
    connection.query(
        query,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//user) 직원관리 > 직원관리 - modalAdd
app.post('/admin/workers2/modalAdd', function(req, res) {
    let name = req.body.workerName;
    let email= req.body.email;
    let auth = req.body.auth;
    let phone = req.body.phone;
    var query = 'insert into users(users_name,users_email,users_auth,users_phone) values (?,?,?,?)';
    if(name){
        connection.query(query, [name,email,auth,phone], function(err, result, fields) {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('worker create success');
                }
            });
     };
});

//user) 직원관리 > 직원관리 - modalModify
app.post('/admin/workers2/modalModify', function(req, res) {
    let id = req.body.id;
    let name = req.body.workerName; 
    let email= req.body.email;
    let auth = req.body.auth;
    let phone = req.body.phone;
    var query = 'UPDATE users SET users_name=?,users_email=?,users_auth=?,users_phone=? WHERE iduser = ?';
    if(name){
        connection.query(query, [name,email,auth,phone,id], function(err, result, fields) {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('memo update success');
            }
        });
     };
});

/*------------------직원화면---------------------------*/

//user) 메인화면 - 테이블 가져오기
app.get('/users/userMain1', (req, res) => {
    let param = [req.query.workerId];
    var query = 'select s.shop_name as shopName, h.idhistory as id, s.shop_tel_number as shopNumber, s.shop_roadname_address as address,'
        query +='h.shop_history_status as progress, h.shop_history_memo as memo';
        query +=' from shop_history as h, shops as s';
        query +=' where h.shop_history_user_id = ? and h.shop_history_shop_id = s.idshop and h.shop_history_is_weekly_goal = True';
    var querys = mysql.format(query,param);//sql문에 인자 넣어주기
    connection.query(
        querys,
        (err, rows, fields) => {
            res.send(rows);
            
        }
    )
}); 

//user) 메인화면 - 내정보 가져오기
app.get('/users/userMain2', (req, res) => {
    let param = [req.query.workerId];
    var query = 'select u.users_name as workerName from users as u where iduser = ?'
    var querys = mysql.format(query,param);//sql문에 인자 넣어주기  
    connection.query(
        querys,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//user) 메모 모달 수정
app.post('/users/editableMemoModal', function(req, res) {
    let memo = req.body.memo;
    let id = req.body.id;
    var query = 'UPDATE shop_history SET shop_history_memo = ? WHERE idhistory = ?';
    if(memo){
        connection.query(query, [memo, id], function(err, result, fields) {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('memo update success');
                }
            });
     };
});

//user) 진척률 모달 수정
app.post('/users/progressModal', function(req, res) {
    let status = req.body.status;
    let id = req.body.id;
    var query = 'UPDATE shop_history SET shop_history_status = ? WHERE idhistory = ?';
    if(status){
        connection.query(query, [status, id], function(err, result, fields) {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('status update success');
                }
            });
     };
});

//user) 내정보관리
app.get('/users/myPage', (req, res) => {
    let param = [req.query.workerId];
    var query = 'SELECT users_name as name,users_email as email,users_auth as auth,users_phone as phone,users_location as location'
        query += ' FROM users WHERE iduser = ?';
    var querys = mysql.format(query,param);//sql문에 인자 넣어주기
    connection.query(
        querys,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//user) 내정보 수정
app.post('/users/myPage/editInfo', function(req, res) {
    let phone = req.body.phone;
    let id = req.body.id;
    var query = 'UPDATE users SET users_phone = ? WHERE iduser = ?';
    if(phone){
        connection.query(query, [phone, id], function(err, result, fields) {
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    console.log('edit myInfo success');
                }
            });
     };
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/*----------------로그인 화면-----------------------------

// app.post('/login', function(req,res){
//     console.log(req.body)
//     res.send("post response")
// })



// passport.serializeUser(function(user, done) {
//     console.log('serializeUser', user);
//     done(null, user.authId);
// });
// passport.deserializeUser(function(id, done) {
//     console.log('deserializeUser', id);
//     var sql = 'SELECT * FROM users WHERE authId=?';
//     db.query(sql, [id], function(err, results){
//         if(err){
//         console.log(err);
//         done('There is no user.');
//         } else {
//         done(null, results[0]);
//         }
//     });
// });


//=========================
// passport.use(new LocalStrategy(
// {
//     usernameField: 'username',
//     passwordField: 'password'
// },
// function (username, password, done) {
//     console.log('LocalStrategy', username, password);
    
// }
// ));


// app.post(
//     '/login',
//     (req, res, next) => {
//         passport.authenticate(
//             'local',
//             {
//             successRedirect: '/',
//             failureRedirect: '/login',
//             failureFlash: false
//             }
//         )
//         console.log(req.body.email);
//         console.log(req.body.password);
//     }
// );

app.use(session({
    secret: '1234DSFs@adf1234!@#$asd',
    resave: false,
    saveUninitialized: true,
      store: new MySQLStore({
          host: 'quatrohdb.cbg1jtowqcji.ap-northeast-2.rds.amazonaws.com',
          port: 3306,
          user: 'master',
          password :'a123456789!',
          database : 'mainDB'
      })
  })); // 세션 설정

app.use(passport.initialize());//PASSPORT 사용하도록 세팅
app.use(passport.session());//PASSPORT사용시 SESSION활용
app.subscribe(flash());

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pwd'
    },
    function (username, password, done) {
      console.log('LocalStrategy', username, password);
    }
  ));

app.post(
    '/login',
    (req, res, next) => {
        passport.authenticate(
            'local',
            {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: false
            }
        )
        console.log(req.body.email);
        console.log(req.body.password);
    }
);




// passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
//     console.log('[SerializeUser]', user);
//     done(null, user.username); // 접속한 사용자의 식별 값이, session store에 user.authId로 저장
//   });
  
// passport.deserializeUser(function (username, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
// console.log('[DeserializeUser]', username); // authId 인자에는 serializeUser 메소드에서 보낸 user.authId 값이 담김
// db.query(
//     'SELECT * FROM users WHERE users_email=?',
//     [authId],
//     function (err, results) {
//     if (err) done(err);
//     if (!results[0]) done(err);
//     var user = results[0];
//     done(null, user);
//     });
// });

// passport.use('local-join', new LocalStrategy({
//     usernameField: 'username',
//     passwordField: 'password',
//     passReqToCallback: true
// }, function(req, username, password, done){
//     var uname = username;
//     var pwd = password;

    
// }
// ));

// app.post('/login',
// passport.authenticate('local-join', {
//     successRedirect: '/AdminMain',
//     failureRedirect: '/login',
//     failureFlash: false
// })
// );

// passport.use(new LocalStrategy( // Local 저장 방식을 통한 인증 구현
//     function (username, password, done) {
//       connection.query(
//         'SELECT * FROM users WHERE users_email=?',
//         ['local:' + username],
//         function (err, results) {
//           if (err) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 1
//           if (!results[0]) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 2
//           var user = results[0]; // 적절한 유저정보가 존재하는 경우
//           return hasher(
//             { password: password, salt: user.salt },
//             function (err, pass, salt, hash) {
//               if (hash === user.password) { // 사용자의 비밀번호가 올바른지 확인
//                 console.log('LocalStrategy', user);
//                 done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
//               }
//               else done(null, false);
//           });
//       });
//   }));
*/
