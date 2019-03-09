import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'

axios.get('/items').then((response)=>{
	//console.log(response)
});

const newItem={
	"title": "超市买水果",
	"price": 100,
	"date": "2018-12-04",
	"timestamp": 1543881600000,
	"id": "_j0z9no9oj",
	"cid": "4"
};

axios.post('/items',newItem).then((response)=>{
	//console.log(response);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
