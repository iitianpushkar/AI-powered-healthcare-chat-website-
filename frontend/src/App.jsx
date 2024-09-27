import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import doctors from './DoctorsList'; // Import the list of doctors

function App() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const handleClose = () => {
    setShow(false);
    setConversation([]); // Reset the conversation when modal is closed
    setMessage(''); // Clear message input
  };

  const handleShow = (doctorName) => {
    setSelectedDoctor(doctorName);
    setShow(true);
  };

  const handleSend = async () => {
    if (message.trim() === '') return;

    setLoading(true);

    // Add user's question to conversation
    setConversation((prev) => [...prev, { type: 'user', text: message }]);

    try {
      // Example API call
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });

      const data = await response.json();
      console.log(data);

      // Add response from server to conversation
      setConversation((prev) => [...prev, { type: 'bot', text: data }]);
    } catch (error) {
      console.error('Error:', error);
      setConversation((prev) => [
        ...prev,
        { type: 'bot', text: 'Error in getting response' },
      ]);
    } finally {
      setMessage(''); // Clear the message input
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {doctors.map((doctor, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4" style={{ width: '18rem' }}>
                <img
                  src={doctor.imageUrl}
                  className="card-img-top"
                  alt={doctor.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text">{doctor.specialization}</p>
                  <Button
                    variant="primary"
                    onClick={() => handleShow(doctor.name)}
                  >
                    Consult
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chat with {selectedDoctor}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {/* Chat messages go here */}
            {conversation.map((entry, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <strong>{entry.type === 'user' ? 'You: ' : 'Doctor: '}</strong>
                <span>{entry.text}</span>
              </div>
            ))}
          </div>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSend} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
