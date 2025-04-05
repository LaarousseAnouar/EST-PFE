import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, User, Users, ChevronDown, Home, UserCircle, Calendar as CalendarIcon, Hospital } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSpecialtyFromReason } from '../utils/specialtyMapping';


const Button = ({ children, variant = 'primary', className = '', ...props }) => (
  <button
    className={`btn btn-primary btn-lg btn-lg  ${
      variant === 'primary'
        ? 'text-dark bg-light hover:bg-light focus-ring-light'
        : variant === 'outline'
        ? 'text-dark border-blue-600 hover:bg-light focus-ring-light'
        : 'text-dark border-blue-600 hover:bg-light focus-ring-light'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);


const Card = ({ children, className = '' }) => (
  <div className={`bg-light rounded shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, icon: Icon }) => (
  <div className="px-4 py-5 border-b border-light sm:px-6 d-flex justify-content-between align-items-center mb-4">
    {children}
    {Icon && <Icon className="h-5 w-5 text-dark ml-2" />}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="h4 fw-bold text-dark">{children}</h3>
);

const CardContent = ({ children }) => (
  <div className="px-4 py-5 p-4">{children}</div>
);

const CardFooter = ({ children }) => (
  <div className="px-4 p-4">{children}</div>
);

const Input = ({ ...props }) => (
  <input
    className="mt-3 focus-ring-light focus:border-blue-500 w-100 shadow-sm sm:text-sm border-gray-300 rounded-md px-1 h-6"
    {...props}
  />
);

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block small text-secondary">
    {children}
  </label>
);

const Select = ({ children, ...props }) => (
  <select
    className="mt-3 w-100 pr-10 py-2 text-base border-gray-300 focus:outline-none focus-ring-light focus:border-blue-500 sm:text-sm rounded-md"
    {...props}
  >
    {children}
  </select>
);

export default function PatientDashboard() {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [careTeam, setCareTeam] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatientProfile();
    fetchDoctors();
    fetchAppointments();
    fetchCareTeam();
    fetchPrescriptions();
  }, []);

  useEffect(() => {
    const specialty = getSpecialtyFromReason(appointmentData.reason);
    if (specialty) {
      const recommended = doctors.filter(doc => doc.specialty === specialty);
      setFilteredDoctors(recommended);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [appointmentData.reason, doctors]);


  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/patient/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPatientInfo(data);
        setEditedInfo(data);
      } else {
        console.error('Failed to fetch patient profile');
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/doctor/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    if (!doctorId || !date) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/patient/available-slots?doctorId=${doctorId}&date=${date}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const slots = await response.json();
        setAvailableSlots(slots);
      } else {
        console.error('Failed to fetch available slots');
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/patient/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched appointments:', data); // Add this line for debugging
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchCareTeam = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/patient/care-team', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCareTeam(data);
      } else {
        console.error('Failed to fetch care team');
      }
    } catch (error) {
      console.error('Error fetching care team:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/api/patient/prescriptions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      } else {
        console.error('Failed to fetch prescriptions');
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const renderDashboard = () => (
    <>
      <div className="row gx-5 gy-4">
        <Card>
          <CardHeader icon={Calendar}>
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h3 fw-bold text-primary">
              {appointments.length}
            </div>
            {appointments.length > 0 ? (
              <p className="text-dark small">
                Next: Dr. {appointments[0].doctorId.firstName} {appointments[0].doctorId.lastName} at {appointments[0].time}
              </p>
            ) : (
              <p className="text-dark small">
                No appointments today
              </p>
            )}
          </CardContent>
          <CardFooter className="p-2">
            <Button 
              variant="ghost" 
              className="w-full text-sm text-dark hover:text-light transition-colors"
              onClick={() => setShowAppointments(!showAppointments)}
            >
              {showAppointments ? "Hide" : "View"} Today's Appointments
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAppointments ? "rotate-180" : ""}`} />
            </Button>
          </CardFooter>
          {showAppointments && (
            <div className="px-4 pb-3">
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-top pt-3 mt-3">
                    <div>
                      <p className="text-sm font-medium">
                        Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                      </p>
                      <p className="text-dark small">
                        {appointment.reason}
                      </p>
                    </div>
                    <p className="text-sm">{appointment.time}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-dark text-center p-4">
                  No appointments scheduled for today
                </p>
              )}
            </div>
          )}
        </Card>
        <Card>
          <CardHeader icon={FileText}>
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h3 fw-bold text-primary">{prescriptions.length}</div>
            <p className="text-dark small">Active prescriptions</p>
          </CardContent>
          <CardFooter className="p-2">
            <Button 
              variant="ghost" 
              className="w-full text-sm text-dark hover:text-light transition-colors"
              onClick={() => setShowPrescriptions(!showPrescriptions)}
            >
              {showPrescriptions ? "Hide" : "View All"} Prescriptions
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showPrescriptions ? "rotate-180" : ""}`} />
            </Button>
          </CardFooter>
          {showPrescriptions && (
            <div className="px-4 pb-3">
              {prescriptions.map((prescription, index) => (
                <div key={index} className="py-2 border-top pt-3 mt-3">
                  <p className="text-sm font-medium">{prescription.medication}</p>
                  <p className="text-dark small">
                    {prescription.dosage} - {prescription.frequency}
                  </p>
                  <p className="text-dark small">
                    Prescribed by: Dr. {prescription.doctorId.firstName} {prescription.doctorId.lastName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
      <div className="mt-8 row gx-5 gy-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="d-flex align-items-center gap-2">
                <Clock className="h-4 w-4 text-dark" />
                <span>Blood test results collected</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <User className="h-4 w-4 text-dark" />
                <span>Appointment with Dr. Johnson completed</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <FileText className="h-4 w-4 text-dark" />
                <span>New prescription added</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Care Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {careTeam.map((member, index) => (
                <li key={index} className="d-flex align-items-center gap-2">
                  <Users className="h-4 w-4 text-dark" />
                  <span>Dr. {member.firstName} {member.lastName} - {member.specialty}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderProfile = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/patient/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(editedInfo)
        });
        if (response.ok) {
          const updatedProfile = await response.json();
          setPatientInfo(updatedProfile);
          setIsEditing(false);
        } else {
          const errorData = await response.json();
          alert(`Failed to update patient profile: ${errorData.error}`);
        }
      } catch (error) {
        alert('Error updating patient profile. Please try again.');
      }
    };

    return (
      <Card className="mx-auto w-100">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={isEditing ? editedInfo.firstName : patientInfo?.firstName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={isEditing ? editedInfo.lastName : patientInfo?.lastName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={isEditing ? editedInfo.email : patientInfo?.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="mr-2">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="ml-auto">Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  const renderAppointmentBooking = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAppointmentData(prev => ({ ...prev, [name]: value }));

      if (name === 'date' || name === 'doctorId') {
        fetchAvailableSlots(appointmentData.doctorId, value);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/patient/book-appointment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(appointmentData)
        });
        if (response.ok) {
          const result = await response.json();
          alert('Appointment booked successfully');
          setAppointmentData({
            doctorId: '',
            date: '',
            time: '',
            reason: ''
          });
          setAvailableSlots([]);
        } else {
          const errorData = await response.json();
          alert(`Failed to book appointment: ${errorData.error}`);
        }
      } catch (error) {
        alert('Error booking appointment. Please try again.');
      }
    };

    return (
      <Card className="mx-auto w-100">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctorId">Select Doctor</Label>
              <Select id="doctorId" name="doctorId" value={appointmentData.doctorId} onChange={handleInputChange}>
                <option value="">Choose a doctor</option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Appointment Date</Label>
              <Input id="date" name="date" type="date" value={appointmentData.date} onChange={handleInputChange}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Select id="time" name="time" value={appointmentData.time} onChange={handleInputChange} disabled={availableSlots.length === 0}>
                <option value="">Choose a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input id="reason" name="reason" value={appointmentData.reason} onChange={handleInputChange} placeholder="Brief description of your concern"/>
            </div>
            <Button type="submit" className="ml-auto">Book Appointment</Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light bg-light">
      <header className="bg-light p-4 flex justify-between items-center">
        <div className="d-flex align-items-center gap-2">
          <Hospital className="h-6 w-6 text-dark" />
          <span className="font-bold text-xl">Hospital Management System</span>
        </div>
        <br></br>
        <Button variant="outline" onClick={() => navigate('/Login.js')}>Sign Out</Button>
      </header>
      <nav className="bg-blue-700 text-dark p-4">
        <ul className="flex space-x-4 justify-center">
          <li>
            <Button
              variant={activeTab === 'Dashboard' ? "outline" : "ghost"}
              className={`hover:bg-light hover:text-dark${activeTab === 'Dashboard' ? 'bg-light text-dark' : 'text-dark'}`}
              onClick={() => setActiveTab('Dashboard')}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            
          </li>
          <br></br>
          <li>
            <Button
              variant={activeTab === 'Profile' ? "outline" : "ghost"}
              className={`hover:bg-light hover:text-dark ${activeTab === 'Profile' ? 'bg-light text-dark' : 'text-dark'}`}
              onClick={() => setActiveTab('Profile')}
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </li>
          <br></br>
          <li>
            <Button
              variant={activeTab === 'Appointment Booking' ? "outline" : "ghost"}
              className={`hover:bg-light hover:text-dark ${activeTab === 'Appointment Booking' ? 'bg-light text-dark' : 'text-dark'}`}
              onClick={() => setActiveTab('Appointment Booking')}

            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Appointment Booking
            </Button>
          </li>
        </ul>
      </nav>
      <main className="container py-5">
        <h1 className="text-4xl font-bold text-dark mb-8">Welcome, {patientInfo?.firstName} {patientInfo?.lastName}</h1>
        {activeTab === 'Dashboard' && renderDashboard()}
        {activeTab === 'Profile' && renderProfile()}
        {activeTab === 'Appointment Booking' && renderAppointmentBooking()}
      </main>
    </div>
  );
}

