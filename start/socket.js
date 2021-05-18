// const io = require('socket.io')();
// io.listen(3000);
// io.on('connection', function (socket) {
//   console.log(socket.id)
// })
const jwt = require("jsonwebtoken");
const query_service = require("../app/Models/query_service");
const update_service = require("../app/Models/update_service");
const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

const tutors = new Map();
const tutees = new Map();

// function get(map, id) {
//     if (!map.has(id))
//         map.set(id, {
//             sockets: []
//         });

//     return map.get(id);
// }

io.on('connection', (socket) => {
    console.log(socket.user);

    socket.on("from_client", (msg) => {
        console.log(msg);
        socket.emit("from_server", msg);
    });

    socket.on('client_token', (token) => {
        if (socket.info) {
            socket.emit('error', "already logged in");
            return;
        }

        let decodedObject = jwt.verify(token, 'secretKey');


        if (!decodedObject) {
            socket.emit("error", "Invalid token");
            return;
        }
        socket.object = decodedObject;
        socket.join(`${decodedObject.role}/${decodedObject.id}`);

        // socket.info = id ? { id, map: tutees, isTutor: 0 } : { id, map: tutors, isTutor: 1 }
        /*
        socket.info will now have the format
        socket.info={
        <id_value>,
        map: <sockets>,
        isTutor: <1/0>
        }
        */

        // get(socket.info.map, socket.info.id).sockets.push(socket);

        socket.emit("auth", "sucessfully connect");

    });

    socket.on('client_message', async (chatroomId, message) => {
        if (!message) {
            socket.emit('error', 'empty message');
            return;
        }

        let chatroom = await query_service.getChatroomById(chatroomId);
        if (!chatroom) {
            socket.emit('error', 'invalid chatroom');
            return;
        }

        console.log(chatroom);
        if ((chatroom.TutorId != socket.object.id && socket.object.role == 'tutor') || (chatroom.TuteeId != socket.object.id && socket.object.role == 'tutee')) {
            socket.emit('error', 'invalid user');
            return
        }
        let isTutor = false;
        if (socket.object.role == 'tutor')
            isTutor = true;

        console.log(isTutor);
        let addedMessage = await update_service.addMessage(chatroomId, isTutor, message);

        console.log(socket.object);
        io.to(`tutor/${chatroom.TutorId}`).to(`tutee/${chatroom.TuteeId}`).emit('server_message', addedMessage);

    });

});



//io.listen(3000);


