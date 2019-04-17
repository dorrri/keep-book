const jsonServer = require('json-server');
const express=require('express');
const path=require('path');
const server=jsonServer.create();
const router=jsonServer.router('db.json');
const middlewares=jsonServer.defaults();
const port=process.env.LEANCLOUD_APP_PORT || 3000;
const root=__dirname+'/build';
server.use(express.static(root,{maxAge:86400000}));
server.use(router);
server.use(middlewares);
const reactRouterWhiteList=['/create','/edit/:itemid'];
server.get(reactRouterWhiteList,(requst,response)=>{
	response.sendFile(path.resolve(root,'index.html'));
});
server.listen(port,()=>{
	console.log('server is running');
});