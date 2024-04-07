const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);
const {Server}=require('socket.io');
const io=new Server(server,{
    cors:{
        origin: "*",
        methods: ['GET','POST']
    }
});

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>');
});

io.on('connection',(socket)=>{
    console.log('user connected');

    socket.on('message',(msg)=>{
        console.log('message: '+msg);
        io.emit('message',msg);
    })

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
});

server.listen(3000,()=>{
    console.log('listening on port: 3000');
});