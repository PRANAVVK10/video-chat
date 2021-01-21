
const express=require("express");
const app= express();
const http = require('http').createServer(app);
const io=require('socket.io')(http)
const {v4 : uuidv4} = require('uuid')

app.set("view engine","ejs")


app.get('/',(req,res)=>{
 res.redirect(`/${uuidv4()}`)
})

app.get('/:roomid',(req,res)=>{
    res.render('room',{roomId:req.params.roomid})
})

io.on("connection",(Socket)=>{
    Socket.on("join-room", (roomid,userid)=>{
        console.log("user connected :"+userid)
        Socket.join(roomid)
        Socket.to(roomid).broadcast.emit('user-connected',userid)
    })
})

http.listen(4000, ()=>{
    console.log("server connected")
})