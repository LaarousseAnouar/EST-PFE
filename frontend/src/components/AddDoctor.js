import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

// التخصصات التي تم استخراجها من `seedDoctors.js`
const specialties = [
  "Généraliste",
  "Gynécologue",
  "Dermatologue",
  "Pédiatre",
  "Neurologue"
];

const AddDoctor = () => {
  const [doctorData, setDoctorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialty: '',  // التخصص الذي سيختاره الطبيب
    licenseNumber: '',
    phoneNumber: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // طباعة البيانات التي سيتم إرسالها
    console.log("Doctor Data:", doctorData);  // تأكد من أن جميع الحقول موجودة
  
    try {
      const response = await fetch('http://localhost:5000/api/doctor/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctorData)
      });
  
      const responseData = await response.json();
      console.log('Response Status:', response.status);
      console.log('Response Data:', responseData);  // طباعة الاستجابة
  
      if (response.ok) {
        alert('Doctor added successfully');
        setDoctorData({
          firstName: '',
          lastName: '',
          email: '',
          specialty: '',
          licenseNumber: '',
          phoneNumber: '',
          password: ''
        });
      } else {
        alert('Error adding doctor: ' + responseData.error || "Unknown error");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding doctor');
    }
  };
  
  
  
  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h4>Add New Doctor</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={doctorData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={doctorData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={doctorData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* حقل التخصص (ComboBox) مع التخصصات التي تم استخراجها */}
            <Form.Group>
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                as="select"
                name="specialty"
                value={doctorData.specialty}
                onChange={handleInputChange}
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="licenseNumber"
                placeholder="Enter license number"
                value={doctorData.licenseNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={doctorData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={doctorData.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Doctor
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddDoctor;
