import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Calendar, Clock, FileText, User, Users, ChevronDown, Home, UserCircle, Hospital, Stethoscope } from 'lucide-react';

export default function DoctorDashboard() {
  const [showAppointments, setShowAppointments] = useState(false);
  const [showPatients, setShowPatients] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    patientId: '',
    date: '',
    time: '',
    reason: '',
    prescriptionId: '',
    medication: '',
    dosage: '',
    frequency: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedAction, setSelectedAction] = useState('');
  const [existingPrescriptions, setExistingPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorProfile();
    fetchPatientsWithAppointments();
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointmentData.patientId) {
      fetchExistingPrescriptions(appointmentData.patientId);
    }
  }, [appointmentData.patientId]);

  const fetchExistingPrescriptions = async (patientId) => {
    if (!patientId) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/doctor/prescriptions/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const prescriptions = await response.json();
        setExistingPrescriptions(prescriptions);
      } else {
        console.error('Failed to fetch existing prescriptions');
        setExistingPrescriptions([]);
      }
    } catch (error) {
      console.error('Error fetching existing prescriptions:', error);
      setExistingPrescriptions([]);
    }
  };
  //++}+}}+}++++++++++++++++++++++++++++++++++}
  //+}}}}}+++}}}}}}}}}+++++++++++++++++++++++++++++}}}}}+}
  const fetchDoctorProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/doctor/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctorInfo(data);
        setEditedInfo(data);
      } else {
        console.error('Failed to fetch doctor profile');
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
    }
  };

  const fetchPatientsWithAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/doctor/patients-with-appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        console.error('Failed to fetch patients with appointments');
      }
    } catch (error) {
      console.error('Error fetching patients with appointments:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/doctor/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const now = new Date();
        const sortedAppointments = data
          .filter(appointment => new Date(appointment.date) > now || (new Date(appointment.date).toLocaleDateString() === now.toLocaleDateString() && appointment.time > now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })))
          .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
        setAppointments(sortedAppointments);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };
  //+}}}}}+++}}}}+}}++}}}}++++++++}}++++++}}++++++}}}+++}}+++++++++}+++++++++++++++++++++++++++++++++++++++
  const fetchMedicalRecord = async (patientId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/doctor/medical-record/${patientId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched medical record:", data);  // تتبع البيانات التي يتم جلبها
        setMedicalRecord(data);  // تأكد من أن `data` هو مصفوفة
      } else {
        console.error('Error fetching medical record');
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };
  
  
  const renderDashboard = () => (
    <>
      <div className="row">
        {/* Rendez-vous du jour */}
        <div className="col-md-6 mb-3">
          <Card>
            <Card.Header>
              <Calendar className="mr-2" /> Rendez-vous d'aujourd'hui
            </Card.Header>
            <Card.Body>
              <h2>{appointments.length}</h2>
              {appointments.length > 0 ? (
                <p className="text-muted">
                  Suivant : {appointments[0].patientId.firstName} {appointments[0].patientId.lastName} à {appointments[0].time}
                </p>
              ) : (
                <p className="text-muted">Aucun rendez-vous aujourd'hui</p>
              )}
            </Card.Body>
            <Card.Footer>
              <Button variant="link" onClick={() => setShowAppointments(!showAppointments)}>
                {showAppointments ? "Masquer" : "Voir"} les rendez-vous du jour
                <ChevronDown className={`ml-2 ${showAppointments ? "rotate-180" : ""}`} />
              </Button>
              {showAppointments && (
                <div className="mt-3">
                  {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <div key={index} className="d-flex justify-content-between py-2 border-top">
                        <div>
                          <p className="font-weight-medium">
                            {appointment.patientId.firstName} {appointment.patientId.lastName}
                          </p>
                          <p className="text-muted">{appointment.reason}</p>
                        </div>
                        <p>{appointment.time}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted text-center py-4">Aucun rendez-vous prévu pour aujourd'hui</p>
                  )}
                </div>
              )}
            </Card.Footer>
          </Card>
        </div>
  
        {/* Liste des patients */}
        <div className="col-md-6 mb-3">
          <Card>
            <Card.Header>
              <Users className="mr-2" /> Patients
            </Card.Header>
            <Card.Body>
              <h2>{patients.length}</h2>
              <p className="text-muted">Total des patients suivis</p>
            </Card.Body>
            <Card.Footer>
              <Button variant="link" onClick={() => setShowPatients(!showPatients)}>
                {showPatients ? "Masquer" : "Voir tous"} les patients
                <ChevronDown className={`ml-2 ${showPatients ? "rotate-180" : ""}`} />
              </Button>
              {showPatients && (
                <div className="mt-3">
                  {patients.map((patient, index) => (
                    <div
                      key={index}
                      className="py-2 border-top"
                      onClick={() => fetchMedicalRecord(patient._id)}  // Quand un patient est cliqué
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      <p className="font-weight-medium">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-muted">
                        Dernière visite : {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A'} |
                        Prochain rendez-vous : {patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card.Footer>
          </Card>
        </div>
      </div>
  
      {/* Affichage du dossier médical du patient sélectionné */}
      {Array.isArray(medicalRecord) && medicalRecord.length > 0 && (
  <div className="mt-5">
    {medicalRecord.map((record, index) => (
      <Card key={index} className="mb-3">
        <Card.Header>
          <h4>Dossier Médical de {record.patientId.firstName} {record.patientId.lastName}</h4>
        </Card.Header>
        <Card.Body>
          <p><strong>Date :</strong> {new Date(record.date).toLocaleDateString()}</p>
          <p><strong>Diagnostique :</strong> {record.diagnosis}</p>
          <p><strong>Notes :</strong> {record.notes}</p>
          {record.attachment && (
            <a href={record.attachment} target="_blank" rel="noopener noreferrer">
              Télécharger le fichier
            </a>
          )}
        </Card.Body>
      </Card>
    ))}
  </div>
)}


  
      <div className="mt-5 row">
        {/* Activité récente */}
        <div className="col-md-6 mb-3">
          <Card>
            <Card.Header>Activités récentes</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  <Clock className="mr-2" />
                  Rendez-vous complété avec John Doe
                </li>
                <li className="d-flex align-items-center mb-2">
                  <FileText className="mr-2" />
                  Dossier médical mis à jour pour Alice Johnson
                </li>
                <li className="d-flex align-items-center mb-2">
                  <User className="mr-2" />
                  Nouveau patient inscrit : David Lee
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>
  
        {/* Planning à venir */}
        <div className="col-md-6 mb-3">
          <Card>
            <Card.Header>Planning à venir</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-2">
                  <Calendar className="mr-2" />
                  Réunion du personnel - Demain, 9h00
                </li>
                <li className="d-flex align-items-center mb-2">
                  <Stethoscope className="mr-2" />
                  Conférence de cardiologie - 20 mai
                </li>
                <li className="d-flex align-items-center mb-2">
                  <Clock className="mr-2" />
                  Garde de nuit - 22 mai
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
/////////////////////////  
  

  const renderProfile = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/doctor/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editedInfo)
        });
        if (response.ok) {
          const updatedProfile = await response.json();
          setDoctorInfo(updatedProfile);
          setIsEditing(false);
        } else {
          const errorData = await response.json();
          alert(`Failed to update doctor profile: ${errorData.error}`);
        }
      } catch (error) {
        alert('Error updating doctor profile. Please try again.');
      }
    };

    return (
      <Card>
        <Card.Header>Doctor Profile</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={isEditing ? editedInfo.firstName : doctorInfo?.firstName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={isEditing ? editedInfo.lastName : doctorInfo?.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={isEditing ? editedInfo.email : doctorInfo?.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="specialty">
              <Form.Label>Specialty</Form.Label>
              <Form.Control
                type="text"
                name="specialty"
                value={isEditing ? editedInfo.specialty : doctorInfo?.specialty}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="licenseNumber">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="licenseNumber"
                value={isEditing ? editedInfo.licenseNumber : doctorInfo?.licenseNumber}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={isEditing ? editedInfo.phoneNumber : doctorInfo?.phoneNumber}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="mr-2">Save</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="ml-auto">Edit Profile</Button>
          )}
        </Card.Footer>
      </Card>
    );
  };

  const renderPatientManagement = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAppointmentData(prev => ({ ...prev, [name]: value }));

      if (name === 'action') {
        setSelectedAction(value);
      }

      if (name === 'patientId') {
        fetchExistingPrescriptions(value);
      }

      if (name === 'date' || name === 'patientId') {
        fetchAvailableSlots(appointmentData.patientId, value);
      }
    };

    const fetchAvailableSlots = async (patientId, date) => {
      if (!patientId || !date) return;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/doctor/available-slots?patientId=${patientId}&date=${date}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const slots = await response.json();
          setAvailableSlots(slots);
        } else {
          console.error('Failed to fetch available slots');
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
        setAvailableSlots([]);
      }
    };

    const handleEditPrescription = (prescription) => {
      setAppointmentData({
        ...appointmentData,
        prescriptionId: prescription._id,
        medication: prescription.medication || '',
        dosage: prescription.dosage || '',
        frequency: prescription.frequency || ''
      });
      setSelectedAction('prescribe-medication');
    };

    const handleDeletePrescription = async (prescriptionId) => {
      if (window.confirm('Are you sure you want to delete this prescription?')) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:5000/api/doctor/prescriptions/${prescriptionId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            alert('Prescription deleted successfully');
            fetchExistingPrescriptions(appointmentData.patientId);
          } else {
            const errorData = await response.json();
            alert(`Failed to delete prescription: ${errorData.error}`);
            console.error('Error details:', errorData.details);
          }
        } catch (error) {
          alert('Error deleting prescription. Please try again.');
          console.error('Error deleting prescription:', error);
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (selectedAction === 'prescribe-medication') {
        try {
          const token = localStorage.getItem('token');
          const url = appointmentData.prescriptionId
            ? `http://localhost:5000/api/doctor/prescriptions/${appointmentData.prescriptionId}`
            : 'http://localhost:5000/api/doctor/prescribe-medication';
          const method = appointmentData.prescriptionId ? 'PUT' : 'POST';
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              patientId: appointmentData.patientId,
              medication: appointmentData.medication,
              dosage: appointmentData.dosage,
              frequency: appointmentData.frequency
            })
          });
          if (response.ok) {
            const result = await response.json();
            alert(appointmentData.prescriptionId ? 'Medication updated successfully' : 'Medication prescribed successfully');
            setAppointmentData({
              ...appointmentData,
              prescriptionId: '',
              medication: '',
              dosage: '',
              frequency: ''
            });
            fetchExistingPrescriptions(appointmentData.patientId);
            setSelectedAction('');
          } else {
            const errorData = await response.json();
            alert(`Failed to ${appointmentData.prescriptionId ? 'update' : 'prescribe'} medication: ${errorData.error}`);
          }
        } catch (error) {
          alert(`Error ${appointmentData.prescriptionId ? 'updating' : 'prescribing'} medication. Please try again.`);
        }
      } else if (selectedAction === 'schedule-appointment') {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5000/api/doctor/schedule-appointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              patientId: appointmentData.patientId,
              date: appointmentData.date,
              time: appointmentData.time,
              reason: appointmentData.reason
            })
          });
          if (response.ok) {
            alert('Appointment scheduled successfully');
            setAppointmentData({
              patientId: '',
              date: '',
              time: '',
              reason: '',
              prescriptionId: '',
              medication: '',
              dosage: '',
              frequency: ''
            });
            setSelectedAction('');
          } else {
            const errorData = await response.json();
            alert(`Failed to schedule appointment: ${errorData.error}`);
          }
        } catch (error) {
          alert('Error scheduling appointment. Please try again.');
        }
      }
    };

    return (
      <Card>
        <Card.Header>Patient Management</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="patient">
              <Form.Label>Select Patient</Form.Label>
              <Form.Control as="select" name="patientId" value={appointmentData.patientId} onChange={handleInputChange}>
                <option value="">Choose a patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="action">
              <Form.Label>Action</Form.Label>
              <Form.Control as="select" name="action" value={selectedAction} onChange={handleInputChange}>
                <option value="">Choose an action</option>
                <option value="schedule-appointment">Schedule Appointment</option>
                <option value="prescribe-medication">Prescribe Medication</option>
              </Form.Control>
            </Form.Group>
            {selectedAction === 'schedule-appointment' && (
              <>
                <Form.Group controlId="date">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control type="date" name="date" value={appointmentData.date} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="time">
                  <Form.Label>Preferred Time</Form.Label>
                  <Form.Control as="select" name="time" value={appointmentData.time} onChange={handleInputChange} disabled={availableSlots.length === 0}>
                    <option value="">Choose a time slot</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="reason">
                  <Form.Label>Reason for Visit</Form.Label>
                  <Form.Control type="text" name="reason" value={appointmentData.reason} onChange={handleInputChange} placeholder="Brief description of your concern" />
                </Form.Group>
              </>
            )}
            {selectedAction === 'prescribe-medication' && (
              <>
                {existingPrescriptions.length > 0 && (
                  <div className="mb-3">
                    <Form.Label>Existing Prescriptions</Form.Label>
                    {existingPrescriptions.map((prescription) => (
                      <div key={prescription._id} className="d-flex justify-content-between bg-light p-2 mb-2 rounded">
                        <span>{prescription.medication} - {prescription.dosage} - {prescription.frequency}</span>
                        <div>
                          <Button variant="outline-secondary" size="sm" onClick={() => handleEditPrescription(prescription)}>Edit</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDeletePrescription(prescription._id)} className="ml-2">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Form.Group controlId="medication">
                  <Form.Label>Medication</Form.Label>
                  <Form.Control type="text" name="medication" value={appointmentData.medication || ''} onChange={handleInputChange} placeholder="Medication name" />
                </Form.Group>
                <Form.Group controlId="dosage">
                  <Form.Label>Dosage</Form.Label>
                  <Form.Control type="text" name="dosage" value={appointmentData.dosage || ''} onChange={handleInputChange} placeholder="Dosage" />
                </Form.Group>
                <Form.Group controlId="frequency">
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control type="text" name="frequency" value={appointmentData.frequency || ''} onChange={handleInputChange} placeholder="Frequency" />
                </Form.Group>
              </>
            )}
            <Button type="submit" className="ml-auto">Submit</Button>
          </Form>
        </Card.Body>
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
              variant={activeTab === 'Patient Management' ? "outline-primary" : "link"}
              onClick={() => setActiveTab('Patient Management')}
            >
              <Users className="mr-2" />
              Patient Management
            </Button>
          </li>
        </ul>
      </nav>
      {activeTab === 'Dashboard' && renderDashboard()}
      {activeTab === 'Profile' && renderProfile()}
      {activeTab === 'Patient Management' && renderPatientManagement()}
    </div>
  );
}
