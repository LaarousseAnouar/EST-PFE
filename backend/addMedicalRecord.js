// AddMedicalRecord.js

import React, { useState } from 'react';

const AddMedicalRecord = () => {
  const [email, setEmail] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/patient/add-medical-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        diagnosis,
        notes,
        attachment,
      }),
    });

    if (response.ok) {
      alert('Dossier médical ajouté avec succès');
    } else {
      alert('Échec de l\'ajout du dossier médical');
    }
  };

  return (
    <div>
      <h3>Ajouter un nouveau dossier médical</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email du patient"
          required
        />
        <input
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Diagnostic"
          required
        />
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          required
        />
        <input
          type="text"
          value={attachment}
          onChange={(e) => setAttachment(e.target.value)}
          placeholder="Lien vers un fichier joint (facultatif)"
        />
        <button type="submit">Ajouter le dossier médical</button>
      </form>
    </div>
  );
};

export default AddMedicalRecord;
