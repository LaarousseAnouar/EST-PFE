import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [patientInfo, setPatientInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientProfile();
    fetchDoctors();
    fetchAppointments();
    fetchPrescriptions();
  }, []);

  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/patient/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPatientInfo(data);
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor/all');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/patient/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/patient/prescriptions');
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100">
      <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <h4>Hospital Management System</h4>
        <Button variant="outline-light" onClick={() => navigate('/')}>Sign Out</Button>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white p-3">
        <div className="nav nav-tabs">
          <button className={`nav-link ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}>
            Dashboard
          </button>
          <button className={`nav-link ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => setActiveTab('Profile')}>
            Profile
          </button>
          <button className={`nav-link ${activeTab === 'Appointment' ? 'active' : ''}`} onClick={() => setActiveTab('Appointment')}>
            Appointment Booking
          </button>
        </div>
      </nav>

      <Container className="mt-4">
        <h2>Welcome, {patientInfo?.firstName} {patientInfo?.lastName}</h2>

        {/* Dashboard */}
        {activeTab === 'Dashboard' && (
          <Row className="mt-3">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">Today's Appointments</Card.Header>
                <Card.Body>
                  <h5>{appointments.length} Appointments</h5>
                  {appointments.length > 0 ? (
                    <p>Next: Dr. {appointments[0].doctorId.firstName} {appointments[0].doctorId.lastName} at {appointments[0].time}</p>
                  ) : (
                    <p>No appointments today</p>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">Prescriptions</Card.Header>
                <Card.Body>
                  <h5>{prescriptions.length} Active Prescriptions</h5>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Profile */}
        {activeTab === 'Profile' && (
          <Row className="mt-3">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-secondary text-white">Profile</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" value={patientInfo?.firstName} readOnly />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" value={patientInfo?.lastName} readOnly />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={patientInfo?.email} readOnly />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Appointment Booking */}
        {activeTab === 'Appointment' && (
          <Row className="mt-3">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-info text-white">Book an Appointment</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Select Doctor</Form.Label>
                      <Form.Control as="select">
                        <option>Choose a doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>
                            Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Appointment Date</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Reason for Visit</Form.Label>
                      <Form.Control type="text" placeholder="Brief description" />
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">Book Appointment</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}
