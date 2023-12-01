// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// const socket = io('http://localhost:4000'); // Replace with your server URL
// const Chat = () => {
//     const [name, setName] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
  
//     useEffect(() => {
//       // Fetch initial messages from the server
//       fetch('http://localhost:4000/chat')
//         .then((response) => response.json())
//         .then((data) => setMessages(data));
  
//       // Listen for new messages from the server
//       socket.on('message', (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });
//     }, []);
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (name && message) {
//         // Send message to the server
//         fetch('http://localhost:4000/chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ name, message }),
//         });
  
//         setName('');
//         setMessage('');
//       }
//     };
  
//     return (
//       <div>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
//           <input type="text" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
//           <button type="submit">Send</button>
//         </form>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>
//               {msg.name}: {msg.message}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
// }
 
// export default Chat;

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Card, Form, InputGroup, Button, ListGroup } from 'react-bootstrap'; // Import Bootstrap components
const socket = io('http://localhost:4000'); // Replace with your server URL

const Chat = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages from the server
    fetch('http://localhost:4000/chat')
      .then((response) => response.json())
      .then((data) => setMessages(data));

    // Listen for new messages from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && message) {
      // Send message to the server
      fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });

      setName('');
      setMessage('');
    }
  };

  return (
    <div>
    <Navbar />
    <div className="container mt-5 mb-5">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" variant="primary">
                Send
              </Button>
            </InputGroup>
          </Form>
        </Card.Body>
        <ListGroup variant="flush">
          {messages.map((msg, index) => (
            <ListGroup.Item key={index}>
              <strong>{msg.name}:</strong> {msg.message}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
    <Footer />
    </div>
  );
};

export default Chat;
