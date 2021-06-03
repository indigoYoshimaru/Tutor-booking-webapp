// const io = require('socket.io')();
// io.listen(3000);
// io.on('connection', function (socket) {
//   console.log(socket.id)
// })
const jwt = require("jsonwebtoken");
const query_service = require("../app/Models/query_service");
const update_service = require("../app/Models/update_service");
const Server = use('Server')
const io = use('socket.io')(Server.getInstance());
const Config = use('Config');

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
    console.log('socket user', socket.user);

    socket.on("from_client", (msg) => {
        console.log(msg);
        socket.emit("from_server", msg);
    });

    socket.on('client_token', (token) => {
        if (socket.info) {
            socket.emit('error', "already logged in");
            return;
        }

        let decodedObject = jwt.verify(token, Config.get('app.appKey'));
        console.log(decodedObject)

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
        console.log(socket.id);
        socket.emit("auth", "sucessfully connect");

    });

    socket.on('whoami', () => {
        console.log('inside whoami');
        console.log(socket.object);
        console.log(socket.id);
        socket.emit('server_message', socket.object ? socket.object : 'not loggedin');;
    })

    socket.on('client_message', async (chatroomId, message) => {
        console.log('inside client mesage');
        console.log(socket.object);
        if (!message) {

            socket.emit('error', 'empty message');
            return;
        }

        if (!socket.object) {
            socket.emit('error', 'not logged in');
            return;
        }
        let chatroom = await query_service.getChatroomById(chatroomId);
        if (!chatroom) {
            socket.emit('error', 'invalid chatroom');
            return;
        }


        console.log('chatroom', chatroom);
        if ((chatroom.tutorId != socket.object.id && socket.object.role == 'tutor') || (chatroom.tuteeId != socket.object.id && socket.object.role == 'tutee')) {
            socket.emit('error', 'invalid user');
            return
        }
        let isTutor = false;
        if (socket.object.role == 'tutor')
            isTutor = true;

        console.log('isTutor', isTutor);
        let addedMessage = await update_service.addMessage(chatroomId, isTutor, message);

        console.log(socket.object);
        io.to(`tutor/${chatroom.tutorId}`).to(`tutee/${chatroom.tuteeId}`).emit('server_message', addedMessage);

    });



    socket.on('client_chat_history', async (chatroomId) => {
        let chatroom = await query_service.getChatroomById(chatroomId); // this will be replace later since we had message from the tutee's contact tutor
        if (!chatroom) {
            socket.emit('error', 'invalid chatroom');
            return;
        }

        if (!socket.object) {
            socket.emit('error', 'no authentication');
            return
        }

        let messageHis = await query_service.getMessageByChatroomId(chatroomId);
        console.log('message history', messageHis);

        for (var message of messageHis) {
            console.log(`${socket.object.role}/${socket.object.id}`)
            io.to(`${socket.object.role}/${socket.object.id}`).emit('server_message', message);
        }

    })

});



//io.listen(3000);


