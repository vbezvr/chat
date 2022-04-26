import {ui} from './view.js'
import {storage} from './storage.js'
import {sendMessage} from './main.js'
export {loadHistory}

const DISPLAY_HEIGHT = 444;
const messageStorage = storage.getMessageHistory();
const indices = {
    start: -20,
    end: -1,
    length: messageStorage.history.length,
}

ui.display_chat.addEventListener("scroll", listeningScrollCoordinates);

function listeningScrollCoordinates() {
    const fullDisplayChatHeight = ui.display_chat.scrollHeight;
    const scrollTop = ui.display_chat.scrollTop;

  if (fullDisplayChatHeight + scrollTop < DISPLAY_HEIGHT) {
    
      indices.start -= 20;
      indices.end -= 20;

       if (indices.start * -1 < indices.length) {
         loadHistory('load');
         ui.display_chat.scrollTop = scrollTop-20;
       }
  }
}

function loadHistory(selection) {
  const messages = messageStorage.history.slice(indices.start || 0, indices.end);
  messages.push(messageStorage.history.at(indices.end));
  if (selection === 'load') {
    messages.reverse();
  }
  console.log(messages)
  messages.forEach((data) => {
    sendMessage(JSON.parse(data), selection);
  });

}


