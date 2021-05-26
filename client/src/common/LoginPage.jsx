import React, { useState, handleSubmit } from 'react';

import { Paper,Grid,makeStyles,TextField,Button } 
  from '@material-ui/core';
import axios from 'axios';
import UserMain from '../users/pages/UserMain';
import AdminMain from '../admin/pages/AdminMain';
import AdminPage from "../admin/side/AdminPage";//관리자 페이지
import UsersPage from "../users/side/UsersPage";//영업자 페이지
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "auto",
    paddingTop: theme.spacing.unit * 10,
  },
  paper: {
    margin: "auto",
    padding: theme.spacing(7),
    textAlign: 'center',
  },
  formUnit: {
    marginTop : '15px',
  },
  button: {
    backgroundColor: '#28a745',
  }
}));




export default function LoginPage(history) {
  const classes = useStyles();
  const axios = require('axios');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //const dispatch = useDispatch();

  const onNameHandler = (event) => {
    setUsername(event.currentTarget.value)

  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
    
  };

  // const handleAccount = (mem_info) => {
  //   fetch('/login', {   // fetch를 통해 Ajax통신을 한다.
  //     method: 'post',   // 방식은 post
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8"   // 헤더에서 본문 타입 설정
  //     },
  //     body: JSON.stringify(mem_info)   // body에 json 데이터를 전송할 때에는 문자열로 변경해서 보내야한다.
  //   })
  //     .then(res => res.json())
  //     .then(obj => {   // obj에는 서버사이드에서 전송해준 DB등록 성공여부가 담겨있다.
  //       if(obj.result === 'succ') {
  //         alert("회원가입이 완료되었습니다.");
  //         this.props.handleController('/adminMain');   // 내가 정의한 메소드다. 원하는 페이지로 이동시킨다.
  //       }
  //     });
  // };
  
  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   console.log({username})
  //   console.log({password})
  //   handleAccount = (mem_info) => {
  //     fetch('/login', {   // fetch를 통해 Ajax통신을 한다.
  //       method: 'post',   // 방식은 post
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8"   // 헤더에서 본문 타입 설정
  //       },
  //       body: JSON.stringify(mem_info)   // body에 json 데이터를 전송할 때에는 문자열로 변경해서 보내야한다.
  //     })
  //       .then(res => res.json())
  //       .then(obj => {   // obj에는 서버사이드에서 전송해준 DB등록 성공여부가 담겨있다.
  //         if(obj.result === 'succ') {
  //           alert("회원가입이 완료되었습니다.");
  //           this.props.handleController('main');   // 내가 정의한 메소드다. 원하는 페이지로 이동시킨다.
  //         }
  //       });
  //   };
  // };
  
  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   console.log({username})
  //   console.log({password})
  //   handleAccount = (mem_info) => {
  //     fetch('/login', {   // fetch를 통해 Ajax통신을 한다.
  //       method: 'post',   // 방식은 post
  //       headers: {
  //         "Content-Type": "application/json; charset=utf-8"   // 헤더에서 본문 타입 설정
  //       },
  //       body: JSON.stringify(mem_info)   // body에 json 데이터를 전송할 때에는 문자열로 변경해서 보내야한다.
  //     })
  //       .then(res => res.json())
  //       .then(obj => {   // obj에는 서버사이드에서 전송해준 DB등록 성공여부가 담겨있다.
  //         if(obj.result === 'succ') {
            
  //           this.props.handleController('ladminMain');   // 내가 정의한 메소드다. 원하는 페이지로 이동시킨다.
  //         }
  //       });
  //   };
  // }

  const SubmitHandler = (e) => {
    e.preventDefault();
    // state에 저장한 값을 가져옵니다.
    console.log(username);
    console.log(password);

    let body = {
      email: username,
      password: password,
    };

    axios
      .post('http://localhost:5000/login', body)
      .then((res) => console.log(res))
      .catch(error => {
        console.log(error.response)
      });
  };



  return (
    
      <main>
      <div className={classes.root}>
      <Router>
      <Grid container>
        <Grid item>
          <Paper className={classes.paper}>
            <h1>영업관리</h1>
            <form noValidate autoComplete="off"
            //onSubmit={SubmitHandler}
            >
              {/* //중첩라우터를 쓰기 위함 */}
                <div className={classes.formUnit}>
                  <TextField 
                    required 
                    id="username" 
                    label="E-mail" 
                    variant="outlined" 
                    vlaue={username}
                    onChange = {onNameHandler}
                  />
                </div>
                <div className={classes.formUnit}>
                  <TextField 
                    required 
                    id="password" 
                    label="Password" 
                    type="password" 
                    variant="outlined" 
                    value={password}
                    onChange={onPasswordHandler}
                  />
                </div>
                <div className={classes.formUnit}>
                  <Link to="/AdminPage">
                  <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    type="submit" 
                    fullWidth
                    class = "ajaxsend">
                    admin
                  </Button>
                  </Link>
                  <Link to='UsersPage'>
                  <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    type="submit" 
                    fullWidth
                    class = "ajaxsend"
                    onclick = {()=>{history.push('/UsersPage')}}
                    >
                    user
                  </Button>
                  
                  </Link>
                  {/* <Button 
                    className={classes.button}
                    variant="contained" 
                    color="primary"
                    type="submit" 
                    fullWidth
                    class = "ajaxsend">
                    로그인
                  </Button> */}
                  {/* <hr /> */}
                  
                </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Switch>
    <Route path="/LoginPage" component={LoginPage} />
    <Route path="/UsersPage" component={UsersPage} />
    <Route path="/AdminPage" component={AdminPage} />
    </Switch>
      </Router>
    </div>
    
      </main>
    
    
  );
}




