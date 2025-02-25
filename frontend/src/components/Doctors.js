import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Table, Navbar, Nav } from 'react-bootstrap';

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorProfile();
    fetchPatientsWithAppointments();
    fetchAppointments();
  }, []);

  const fetchDoctorProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/doctor/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctorInfo(data);
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
    }
  };

  const fetchPatientsWithAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor/patients-with-appointments');
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100">
      {/* Header */}
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Hospital Management System</Navbar.Brand>
          <Button variant="outline-light" onClick={() => navigate('/')}>Sign Out</Button>
        </Container>
      </Navbar>

      {/* Navigation Tabs */}
      <Nav variant="tabs" defaultActiveKey="Dashboard" className="justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey="Dashboard" onClick={() => setActiveTab('Dashboard')}>Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Profile" onClick={() => setActiveTab('Profile')}>Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Patients" onClick={() => setActiveTab('Patients')}>Patients</Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className="mt-4">
        <h2>Welcome, Dr. {doctorInfo?.firstName} {doctorInfo?.lastName}</h2>

        {/* Dashboard */}
        {activeTab === 'Dashboard' && (
          <Row className="mt-3">
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">Today's Appointments</Card.Header>
                <Card.Body>
                  <h5>{appointments.length} Appointments</h5>
                  {appointments.length > 0 ? (
                    <p>Next: {appointments[0].patientId.firstName} {appointments[0].patientId.lastName} at {appointments[0].time}</p>
                  ) : (
                    <p>No appointments today</p>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">Total Patients</Card.Header>
                <Card.Body>
                  <h5>{patients.length} Active Patients</h5>
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
                <Card.Header className="bg-secondary text-white">Doctor Profile</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" value={doctorInfo?.firstName} readOnly />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" value={doctorInfo?.lastName} readOnly />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={doctorInfo?.email} readOnly />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Specialty</Form.Label>
                      <Form.Control type="text" value={doctorInfo?.specialty} readOnly />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Patients List */}
        {activeTab === 'Patients' && (
          <Row className="mt-3">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-info text-white">Patients</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Last Visit</th>
                        <th>Next Appointment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient._id}>
                          <td>{patient.firstName} {patient.lastName}</td>
                          <td>{patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A'}</td>
                          <td>{patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleDateString() : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
}
