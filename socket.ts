import { Server } from 'socket.io'
import {Room,RoomStatus} from './types/room'

import { ClientToServerEvents,InterServerEvents,ServerToClientEvents,SocketData } from './types/socket'
import generateRandomCode from './utils/generateRandomCode'

const Socket = (io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    const rooms: Map<string,Room> = new Map()

    io.on('connection', (socket) => {
        const id = socket.id;
        socket.join(id);
        console.log('SOMEONE JOINED' + id);

        // Room creation
        socket.on('createRoom', (user,settings,callback) => {
            let roomId = generateRandomCode();
            while(rooms.has(roomId)){
                roomId = generateRandomCode();
            }
            const room: Room = {
                owner: user,
                roomId: roomId,
                users: [user],
                classSettings: settings,
                status: RoomStatus.WAITING,
                createdAt: new Date(),
                // elements,
                timer: 0
            }
            socket.join(roomId);
            console.log(`Room ${roomId} created by ${socket.id}`);
            rooms.set(roomId,room);
            callback({
                success: true,
                data: room
            })
        })
        // JoinRoom 
        socket.on('joinRoom',(roomId,user,callback) => {
            if(rooms.has(roomId)){
                const room = rooms.get(roomId)!
                if(room.users.length >= 100){
                    //  Room full
                    callback({
                        success: false,
                        error: new Error('Room is already full (limit of 100 participants)')
                    })
                } else {
                    if(!room.users.some((user) => user.socketId === socket.id)){
                        room.users.push(user);
                        rooms.set(roomId,room); // updating the room with the new user
                        socket.join(roomId);
                    }
                }
            }else{
                callback({
                    success: false,
                    error: new Error('Room with this ID does not exist')
                });
            }
        });
        // ExitRoom
        socket.on('exitRoom',(roomId,callback)=>{
            if(rooms.has(roomId)){
                const room = rooms.get(roomId)!
                const updatedUsers = room.users.filter((user) => user.socketId!==user.socketId);
                room.users = updatedUsers
                socket.leave(roomId)
                if(room.owner.socketId == socket.id){
                    // if owner leaves delete the rooom
                    rooms.delete(roomId);
                    console.log(`Room ${roomId} deleted because the owner ${socket.id} disconnected`);
                }else{
                    if(room.users.length == 0){
                        rooms.delete(roomId);
                        console.log(`${socket.id} joined room ${roomId}`);
                    } else {
                        rooms.set(roomId,room); // updating the room after leaving
                        io.to(roomId).emit('updateRoom',room);
                        console.log()
                    }
                }
            }else{
                callback({
                    success: false,
                    error: new Error(`Room with this Id does not exist`);
                })
            }
        })
        // StartClass
        socket.on('startClass',(roomId,elements,callback) => {
            if(rooms.has(roomId)){
                const room = rooms.get(roomId)!;
                room.status = RoomStatus.RUNNING;
                room.timer = 0;
                console.log(`Room ${roomId} game started`)
                
                const timer = (seconds: number, cb: (timeLeft: number) => void) => {
                    setTimeout(function(){
                        cb(seconds)
                        timer(seconds+1,cb)
                    },1000);
                }

                var cb = function (timeLeft: number) {
                    room.timer = timeLeft
                    rooms.set(roomId,room);
                    io.to(roomId).emit('updateRoom',room);
                }

                timer(0,cb);
            } else {
                callback({
                    success: false,
                    error: new Error('Room with this ID does not exist')
                })
            }
        })
        // ClassStatus 
        socket.on('classStatusUpdate',(roomId,status,callback) => {
            if(rooms.has(roomId)) {
                const room = rooms.get(roomId)!
                room.status  = status
                rooms.set(roomId,room)
                io.to(roomId).emit('updateRoom',room);
                console.log(`Room ${roomId} class status changed to ${status}`);
            }
        })
        // UpdateElements
        const handleDisconnect = (socketId: string) => {
            for (const [roomId, room] of rooms.entries()) {
                const updatedUsers = room.users.filter((u) => u.socketId !== socketId)
                if (updatedUsers.length < room.users.length) {
                // The user was found in the room and removed
                room.users = updatedUsers
        
                // If the owner of the room disconnects, delete the room
                if (room.owner.socketId === socketId) {
                    rooms.delete(roomId)
                    console.log(`Room ${roomId} deleted because the owner (${socketId}) disconnected.`)
                } else {
                    // If the room is empty after the user left, delete it
                    if (room.users.length === 0) {
                    rooms.delete(roomId)
                    console.log(`Room ${roomId} deleted because it became empty.`)
                    } else {
                    rooms.set(roomId, room)
                    io.to(roomId).emit('updateRoom', room) // Emit the updated room data to clients
                    }
                }
        
                console.log(`${socketId} left room ${roomId}`)
                break // Stop the loop as we found the room and handled the disconnection
                }
            }
        }
        socket.on('disconnect',()=>{
            handleDisconnect(socket.id);
        })
    })
}

export default Socket;