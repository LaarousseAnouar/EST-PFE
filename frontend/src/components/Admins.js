
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Calendar, Clock, FileText, User, Users, ChevronDown, Home, UserCircle, Hospital, Stethoscope, Activity, DollarSign, UserPlus, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [showDoctors, setShowDoctors] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [doctorData, setDoctorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialty: '',
    licenseNumber: '',
    phoneNumber: '',
    password: ''
  });
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showDoctorPassword, setShowDoctorPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [doctorOverview, setDoctorOverview] = useState([]);
  const [patientOverview, setPatientOverview] = useState([]);
  const [hospitalCapacity] = useState(10000);
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
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAdminInfo(data);
        setEditedInfo(data);
      } else {
        console.error('Failed to fetch admin profile');
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  const fetchTotalDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch('http://localhost:5000/api/admin/total-doctors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTotalDoctors(data.totalDoctors);
      } else {
        console.error('Failed to fetch total doctors');
      }
    } catch (error) {
      console.error('Error fetching total doctors:', error);
    }
  };

  const fetchTotalPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch('http://localhost:5000/api/admin/total-patients', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTotalPatients(data.totalPatients);
      } else {
        console.error('Failed to fetch total patients');
      }
    } catch (error) {
      console.error('Error fetching total patients:', error);
    }
  };

  const fetchDoctorOverview = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch('http://localhost:5000/api/admin/doctor-overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctorOverview(data);
      } else {
        console.error('Failed to fetch doctor overview');
      }
    } catch (error) {
      console.error('Error fetching doctor overview:', error);
    }
  };

  const fetchPatientOverview = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await fetch('http://localhost:5000/api/admin/patient-overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatientOverview(data);
      } else {
        console.error('Failed to fetch patient overview');
      }
    } catch (error) {
      console.error('Error fetching patient overview:', error);
    }
  };

  const renderDashboard = () => {
    const occupancyRate = ((totalPatients / hospitalCapacity) * 100).toFixed(2);
    return (
      <>
        <div className="row mb-5">
          <div className="col-md-4">
            <Card>
              <Card.Header>
                <Stethoscope className="mr-2" /> Total Doctors
              </Card.Header>
              <Card.Body>
                <h2>{totalDoctors}</h2>
                <p className="text-muted">Active medical staff</p>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Header>
                <Users className="mr-2" /> Total Patients
              </Card.Header>
              <Card.Body>
                <h2>{totalPatients}</h2>
                <p className="text-muted">Currently admitted</p>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-4">
            <Card>
              <Card.Header>
                <Activity className="mr-2" /> Hospital Occupancy
              </Card.Header>
              <Card.Body>
                <h2>{occupancyRate}%</h2>
                <p className="text-muted">Bed occupancy rate</p>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <Card>
              <Card.Header>
                <Stethoscope className="mr-2" /> Doctor Overview
              </Card.Header>
              <Card.Body>
                <h2>{doctorOverview.length}</h2>
                <p className="text-muted">Total doctors on staff</p>
              </Card.Body>
              <Card.Footer>
                <Button 
                  variant="link" 
                  onClick={() => setShowDoctors(!showDoctors)}>
                  {showDoctors ? "Hide" : "View All"} Doctors
                </Button>
                {showDoctors && (
                  <div className="mt-3">
                    {doctorOverview.map((doctor, index) => (
                      <div key={index} className="d-flex justify-content-between py-2 border-top">
                        <div>
                          <p>{doctor.name}</p>
                          <p className="text-muted">{doctor.specialty}</p>
                        </div>
                        <p>{doctor.patients} patients</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Footer>
            </Card>
          </div>
          <div className="col-md-6">
            <Card>
              <Card.Header>
                <Users className="mr-2" /> Patient Overview
              </Card.Header>
              <Card.Body>
                <h2>{patientOverview.length}</h2>
                <p className="text-muted">Total admitted patients</p>
              </Card.Body>
              <Card.Footer>
                <Button 
                  variant="link" 
                  onClick={() => setShowPatients(!showPatients)}>
                  {showPatients ? "Hide" : "View All"} Patients
                </Button>
                {showPatients && (
                  <div className="mt-3">
                    {patientOverview.map((patient, index) => (
                      <div key={index} className="py-2 border-top">
                        <p>{patient.name}</p>
                        <p className="text-muted">Total Appointments: {patient.appointments}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Footer>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Card>
              <Card.Header>Recent Activity</Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  <li><UserPlus className="mr-2" /> New doctor onboarded: Dr. Emily Taylor</li>
                  <li><Activity className="mr-2" /> Emergency ward capacity increased by 10 beds</li>
                  <li><DollarSign className="mr-2" /> Monthly budget report generated</li>
                </ul>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card>
              <Card.Header>Upcoming Tasks</Card.Header>
              <Card.Body>
                <ul className="list-unstyled">
                  <li><Calendar className="mr-2" /> Staff performance review - Next week</li>
                  <li><FileText className="mr-2" /> Update hospital policies - Due in 3 days</li>
                  <li><Users className="mr-2" /> Department heads meeting - Tomorrow, 10:00 AM</li>
                </ul>
              </Card.Body>
            </Card>
          </div>
        </div>
      </>
    );
  };

  const renderProfile = () => {
    if (!adminInfo) {
      return <div>Loading profile...</div>;
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await fetch('http://localhost:5000/api/admin/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            firstName: editedInfo.firstName,
            lastName: editedInfo.lastName,
            email: editedInfo.email
          })
        });
        if (response.ok) {
          const updatedAdmin = await response.json();
          setAdminInfo(updatedAdmin.admin);
          setIsEditing(false);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      }
    };

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <Card.Header>
          <Card.Title>Admin Profile</Card.Title>
        </Card.Header>
        <Card.Body>
          <form className="space-y-4">
            <div className="form-row">
              <div className="col-md-6">
                <Form.Label htmlFor="firstName">First Name</Form.Label>
                <Form.Control
                  id="firstName"
                  name="firstName"
                  value={isEditing ? editedInfo.firstName : adminInfo.firstName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                <Form.Control
                  id="lastName"
                  name="lastName"
                  value={isEditing ? editedInfo.lastName : adminInfo.lastName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="form-group">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                value={isEditing ? editedInfo.email : adminInfo.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </form>
        </Card.Body>
        <Card.Footer>
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="mr-2">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline-secondary">Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="ml-auto">Edit Profile</Button>
          )}
        </Card.Footer>
      </Card>
    );
  };

  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center">
          <Hospital className="mr-2" />
          <h2 className="mb-0">Hospital Management System</h2>
        </div>
        <Button variant="outline-secondary" onClick={() => navigate('/')}>Sign Out</Button>
      </header>
      <nav className="mb-5">
        <ul className="nav nav-pills justify-content-center">
          <li className="nav-item">
            <Button
              variant={activeTab === 'Dashboard' ? "outline-primary" : "link"}
              onClick={() => setActiveTab('Dashboard')}
            >
              <Home className="mr-2" />
              Dashboard
            </Button>
          </li>
          <li className="nav-item">
            <Button
              variant={activeTab === 'Profile' ? "outline-primary" : "link"}
              onClick={() => setActiveTab('Profile')}
            >
              <UserCircle className="mr-2" />
              Profile
            </Button>
          </li>
          <li className="nav-item">
            <Button
              variant={activeTab === 'Add Doctor' ? "outline-primary" : "link"}
              onClick={() => setActiveTab('Add Doctor')}
            >
              <UserPlus className="mr-2" />
              Add Doctor
            </Button>
          </li>
          <li className="nav-item">
            <Button
              variant={activeTab === 'Add Admin' ? "outline-primary" : "link"}
              onClick={() => setActiveTab('Add Admin')}
            >
              <ShieldCheck className="mr-2" />
              Add Admin
            </Button>
          </li>
        </ul>
      </nav>
      <main>
        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Profile' && renderProfile()}
      </main>
    </div>
  );
}
