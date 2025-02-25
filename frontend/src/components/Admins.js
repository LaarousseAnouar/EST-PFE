import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Table, Navbar, Nav } from 'react-bootstrap';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [adminInfo, setAdminInfo] = useState(null);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [doctorOverview, setDoctorOverview] = useState([]);
  const [patientOverview, setPatientOverview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminProfile();
    fetchTotalDoctors();
    fetchTotalPatients();
    fetchDoctorOverview();
    fetchPatientOverview();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAdminInfo(data);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  const fetchTotalDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/total-doctors');
      if (response.ok) {
        const data = await response.json();
        setTotalDoctors(data.totalDoctors);
      }
    } catch (error) {
      console.error('Error fetching total doctors:', error);
    }
  };

  const fetchTotalPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/total-patients');
      if (response.ok) {
        const data = await response.json();
        setTotalPatients(data.totalPatients);
      }
    } catch (error) {
      console.error('Error fetching total patients:', error);
    }
  };

  const fetchDoctorOverview = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/doctor-overview');
      if (response.ok) {
        const data = await response.json();
        setDoctorOverview(data);
      }
    } catch (error) {
      console.error('Error fetching doctor overview:', error);
    }
  };

  const fetchPatientOverview = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/patient-overview');
      if (response.ok) {
        const data = await response.json();
        setPatientOverview(data);
      }
    } catch (error) {
      console.error('Error fetching patient overview:', error);
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
          <Nav.Link eventKey="Doctors" onClick={() => setActiveTab('Doctors')}>Doctors</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Patients" onClick={() => setActiveTab('Patients')}>Patients</Nav.Link>
        </Nav.Item>
      </Nav>

      <Container className="mt-4">
        <h2>Welcome, {adminInfo ? `${adminInfo.firstName} ${adminInfo.lastName}` : 'Admin'}</h2>

        {/* Dashboard */}
        {activeTab === 'Dashboard' && (
          <Row className="mt-3">
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">Total Doctors</Card.Header>
                <Card.Body>
                  <h5>{totalDoctors} Active</h5>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">Total Patients</Card.Header>
                <Card.Body>
                  <h5>{totalPatients} Admitted</h5>
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
                <Card.Header className="bg-secondary text-white">Admin Profile</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" value={adminInfo?.firstName} readOnly />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" value={adminInfo?.lastName} readOnly />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={adminInfo?.email} readOnly />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Doctors List */}
        {activeTab === 'Doctors' && (
          <Row className="mt-3">
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-info text-white">Doctors</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Specialty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorOverview.map((doctor) => (
                        <tr key={doctor._id}>
                          <td>{doctor.name}</td>
                          <td>{doctor.specialty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
                <Card.Header className="bg-warning text-dark">Patients</Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Total Appointments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientOverview.map((patient) => (
                        <tr key={patient._id}>
                          <td>{patient.name}</td>
                          <td>{patient.appointments}</td>
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
