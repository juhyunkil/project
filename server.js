const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

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
    var query = 'select iduser as id, users_name as workerName, users_auth as auth, users_email as email, users_phone as phone'
        query += ' from users where users_enabled = 1 and users_is_leader != 1'
    connection.query(
        query,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

//admin) 직원관리 > 직원영업현황 - modalTable
app.get('/admin/workers1/modalTable', (req, res) => {
    //해당 직원의 이번주 영업 내역 가져오기
    let param = [req.query.thisId];//받은 파라미터
    var query = 'select h.idhistory as id, s.shop_name as shopName, s.shop_tel_number as shopNumber, s.shop_roadname_address as address,'
        query += 'h.shop_history_status as progress, h.shop_history_memo as memo'
        query += ' from shop_history as h, shops as s'
        query += ' where h.idhistory = s.idshop and h.shop_history_is_weekly_goal = True and h.shop_history_user_id = ?'
    var querys = mysql.format(query,param);//sql문에 인자 넣어주기
    connection.query(
        querys,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

/*------------------직원화면---------------------------*/

//user) 메인화면
app.get('/users/userMain', (req, res) => {
    let param = [req.query.workerId];
    var query = 'select s.shop_name as shopName, s.shop_tel_number as shopNumber, s.shop_roadname_address as address,'
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

//user) 내정보관리
app.get('/users/myPage', (req, res) => {
    let param = [req.query.workerId];
    var query = 'SELECT users_name as name,users_email as email,users_auth as auth,users_phone as phone,users_location as location'
        query += ' FROM users WHERE iduser = ?';
    var querys = mysql.format(query,param);//sql문에 인자 넣어주기
    console.log(querys);
    connection.query(
        querys,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}); 

app.listen(port, () => console.log(`Listening on port ${port}`));