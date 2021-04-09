// add new chat document

// setting up a real-time listenner

// Updating the username

// updating the room

class ChatRoom {
    constructor(room, username) {
        this.room = room
        this.username = username
        this.chats = db.collection('chats')
        this.unsub
    }
    async addChat(message) {
        //format a chat object
        const now = new Date()
        const chat = {
                message,
                username: this.username,
                room: this.room,
                created_at: firebase.firestore.Timestamp.fromDate(now)
            }
            // save the chat document

        const response = await this.chats.add(chat)
        return response
    }
    getChat(callback) {
        // stting up real time listener. It listens to real time changes on data base.
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        // update the ui
                        callback(change.doc.data())
                    }
                })
            })
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username)
    }
    updateRoom(room) {
        this.room = room
        console.log('room updated')
        if (this.unsub) {
            this.unsub()
        }

    }

}