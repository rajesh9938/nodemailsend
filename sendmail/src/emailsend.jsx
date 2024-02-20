import React, { useState } from 'react';

const EmailForm = () => {
    let [name, pickname] = useState("");
    let [subject, picksubject] = useState("");
    let [balance, pickbalance] = useState("");
    let [recipientEmail, pickrecipientEmail] = useState("");

    const handleSubmit = () => {
        let input = {
          "name": name,
          "subject": subject,
          "balance":balance,
          "recipientEmail":recipientEmail
        };
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input)
        };
        fetch("http://127.0.0.1:3000/send-email", requestOptions)
          .then(response => response.json())
          .then(responseArray => {
            console.log(responseArray);
          })
      }
  return (
    <div>
      <h2>Send Email</h2>
      <div >
        <div>
          <label>Subject:</label>
          <input type="text" name="subject" value={subject} onChange={abc=>picksubject(abc.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={abc=>pickname(abc.target.value)} />
        </div>
        <div>
          <label>Balance:</label>
          <input type="text" name="balance" value={balance} onChange={abc=>pickbalance(abc.target.value)} />
        </div>
        <div>
          <label>Recipient Email:</label>
          <input type="email" name="recipientEmail" value={recipientEmail} onChange={abc=>pickrecipientEmail(abc.target.value)} />
        </div>
        <button onClick={handleSubmit}>Send Email</button>
      </div>
    </div>
  );
};

export default EmailForm;
