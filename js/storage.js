export const storage = {
    createStorageMessage() {
        localStorage.setItem('messages', JSON.stringify({history: []}));
    },

    getMessageHistory() {
        return JSON.parse(localStorage.getItem('messages'));
    },

    addNewMessage(data) {
        const messages = JSON.parse(localStorage.getItem('messages'));
        const messageItem = JSON.stringify(data);

        messages.history.push(messageItem);
        localStorage.removeItem('messages');
        localStorage.setItem("messages", JSON.stringify({ history: messages.history }));    
    },

    clear() {
        localStorage.clear();
    },

    isEmpty() {
        return localStorage.length === 0;
    }
}