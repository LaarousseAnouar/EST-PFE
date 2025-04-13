import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddAdmin.css';
const AddAdmin = ({ onAddAdminSuccess }) => {
  const [newAdminData, setNewAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleAddAdmin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/add-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newAdminData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Admin added successfully');
        if (onAddAdminSuccess) onAddAdminSuccess();  // استدعاء الدالة عند النجاح
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error adding admin:', error);
      alert('Failed to add admin');
    }
  };

  return (
    <div>
      <h3>Add New Admin</h3>
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={newAdminData.firstName}
            onChange={(e) => setNewAdminData({ ...newAdminData, firstName: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={newAdminData.lastName}
            onChange={(e) => setNewAdminData({ ...newAdminData, lastName: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={newAdminData.email}
            onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={newAdminData.password}
            onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddAdmin}>
          Add Admin
        </Button>
      </Form>
    </div>
  );
};

export default AddAdmin;
