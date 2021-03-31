// const io = require('socket.io')();
// io.listen(3000);
// io.on('connection', function (socket) {
//   console.log(socket.id)
// })

const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

io.on('connection', function (socket) {
    console.log(socket.user);
    socket.on("from_client", (msg)=>{
        console.log(msg);
        socket.emit("from_server", msg);
    });
})

//io.listen(3000);
