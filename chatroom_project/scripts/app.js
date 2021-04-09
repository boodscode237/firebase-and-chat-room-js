// Dom queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateMessage = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms');


newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))
})

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault()

    // update name via the chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName)

    //reset the form 
    newNameForm.reset()

    // show then hide the update message
    updateMessage.innerText = `Your name was updated to ${newName}`

    setTimeout(() => updateMessage.innerText = '', 5000)
})

//update the chat room
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChat(chat => chatUI.render(chat))
    }
})

// Check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';
// class instances
const chatUI = new ChatUI(chatList)
const chatroom = new ChatRoom('general', username)


// get the chat and render
chatroom.getChat((data) => {
    chatUI.render(data)
})