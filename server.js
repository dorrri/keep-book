const jsonServer = require('json-server');
const express=require('express');
const path=require('path');
const  server=jsonServer.create();
const router=jsonServer.router('db.json');
const middlewares=jsonServer.defaults();
const root=__dirname+'/build';
server.use(express.static(root,{maxAge:86400000}));
server.use(router);
server.use(middlewares);
const reactRouterWhiteList=['/create','/edit/:itemid'];
server.get(reactRouterWhiteList,(requst,response)=>{
	response.sendFile(path.resolve(root,'index.html'));
})
server.listen(3000,()=>{
	console.log('server is running');
});