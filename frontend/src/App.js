import React, {useState, useEffect} from 'react';
import './App.css';

const UserForm = props => {
  
  let messages = [];
  let jsxContent = [];
  const [message, setMessage] = useState()
  const [userName, setName] = useState('Anonymous')
  const [jsxMessages, setJsxMessages] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/messages')
    .then(res => res.json())
    .then(json => {
      if (messages === json.messages) {
        console.log('')
      } else {
        messages.push(json);
        setMessages();
      }
    })
  });

  function setMessages() {
    if (messages[0]) {
      for (let i = 0; i<messages[0].length; i++) {
        jsxContent.push(
              <div className="userMessages">
                <p>{`(${messages[0][i].time})`}</p>
                <p>{`[${messages[0][i].userName}]:`}</p>
                <p>{messages[0][i].message}</p>
              </div>
        )
      }
      setJsxMessages(jsxContent);
    }
  }

  const submit = e => {
    e.preventDefault()
    fetch('http://localhost:8000/message/', {
      method: 'POST',
      body: JSON.stringify({ 
        message,
        userName
      }),
      headers: { 'Content-Type': 'application/json' },
    })

  }
  const nameChange = e => {
    e.preventDefault()
    localStorage.setItem('user', userName)
    document.getElementById('nameForm').style.display = 'none';
  }

  return (
    <div>

      <h1>LocalChat</h1>

      <form onSubmit={nameChange} id="nameForm">
        <input type="name" placeholder="Your Name" name="name" onChange={e => setName(e.target.value)}/>
        <button type="submit">{'Submit'}</button>
      </form>

      <div className="message-container">
        <form onSubmit={submit}>
          <input required type="message" placeholder="Message" name="message" onChange={e => setMessage(e.target.value)}/>
          <button type="submit">{'Send'}</button>
        </form>
      </div>

      <button onClick={() => setMessages()}>{'Refresh'}</button>


      <div id="messages">
        {jsxMessages}
      </div>

    </div>
  )
}

export default UserForm;
