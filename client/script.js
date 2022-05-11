'use strict';


class Message {
  constructor (content, authorId, timestamp) {
    this.content = content;
    this.authorId = authorId;
    this.timestamp = timestamp;
  }
}

const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');




socket.on('status', function (msg) {
  const { authorId, content, timestamp } = msg;
  const $HtmlMsg = $(`
    <div class="message">
    <div class="message-author">${authorId}</div>
      <div class="message-text">${content}</div>
      <div class="message-time">${timestamp}</div>
    </div>
  `);
  $('#messages').append($HtmlMsg);

  window.scrollTo(0, document.body.scrollHeight);
});

const startChat = function (user) {
  socket.on('chat message', function (msg) {
    const { authorId, content, timestamp } = msg;
    const $HtmlMsg = $(`
    <div class="message ${authorId === user ? 'right' : 'left'}">
    <div class="message-author">${authorId}</div>
      <div class="message-text">${content}</div>
      <div class="message-time">${timestamp}</div>
    </div>
  `);
    $('#messages').append($HtmlMsg);

    window.scrollTo(0, document.body.scrollHeight);
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
      const message = new Message(input.value, user, prettifyDate(Date.now()));
      socket.emit('chat message', message);
      input.value = '';
    }
  });

};

//---------event listeners




$('#startForm').on('submit', function (event) {
  event.preventDefault();
  const user = $('#startForm').find('#name').val();
  $('#authorForm').hide(200);
  startChat(user);
  const message = new Message(`${user} got connected`, user, prettifyDate(Date.now()));
  socket.emit('status', message);
});



//------------- aux

function prettifyDate (timestamp) {
  // Returns the date in hh:mm am/pm format
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(timestamp).toLocaleTimeString('en-US', options);
}