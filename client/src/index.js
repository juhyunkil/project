import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './common/login/LoginPage';//로그인페이지(구현전)

ReactDOM.render(<App/>,document.getElementById('root'));
/*
const express = require('express');
const app = express()
const port = 4000

app.get('/',(req,res) => res.send('Hello World'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
*/