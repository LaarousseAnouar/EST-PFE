// DossierMedical.js

import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";  // استيراد مكتبة jsPDF لإنشاء ملفات PDF

const DossierMedical = () => {
  const [appointments, setAppointments] = useState([]);  // لتخزين المواعيد
  const [patientId, setPatientId] = useState('');  // لتخزين patientId
  const [patientInfo, setPatientInfo] = useState({});  // لتخزين معلومات المريض

  // استخدام useEffect لتحميل المواعيد عند تحميل المكون
  useEffect(() => {
    const token = localStorage.getItem('token');  // استرجاع التوكن من localStorage

    if (token) {
      fetchPatientId(token);  // إذا كان التوكن موجودًا، نقوم باسترجاع patientId
    }
  }, []);

  // دالة لاسترجاع patientId بناءً على التوكن
  const fetchPatientId = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/patient/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // إضافة التوكن في الهيدر
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPatientId(data._id);  // تخزين patientId في الحالة
        localStorage.setItem('patientId', data._id);  // تخزين patientId في localStorage
        setPatientInfo({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,  // استرجاع رقم الهاتف إذا كان موجودًا
        });  // تخزين معلومات المريض
        fetchAppointments(data._id);  // استرجاع المواعيد باستخدام patientId
      } else {
        console.error('Patient non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du patient:', error);
    }
  };

  // دالة لاسترجاع المواعيد
  const fetchAppointments = async (patientId) => {
    const token = localStorage.getItem('token');  // استرجاع التوكن من localStorage

    try {
      const response = await fetch(`http://localhost:5000/api/patient/appointments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // إضافة التوكن في الهيدر
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);  // تخزين المواعيد في الحالة
      } else {
        console.error('Erreur lors de la récupération des rendez-vous');
        setAppointments([]);  // إذا لم توجد مواعيد، عرض جدول فارغ
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
    }
  };

  // دالة لتحميل الموعد بصيغة PDF
  const generatePDF = (appointment) => {
    const doc = new jsPDF();

    // إضافة محتوى إلى PDF
    doc.setFontSize(16);
    doc.text(`Nom du patient: ${patientInfo.name}`, 10, 10);  // إضافة اسم المريض
    doc.text(`Email: ${patientInfo.email}`, 10, 20);  // إضافة البريد الإلكتروني
    doc.text(`Téléphone: ${patientInfo.phone}`, 10, 30);  // إضافة رقم الهاتف

    // معلومات المستشفى
    doc.text("Hôpital: Hospital ", 10, 40);  // اسم المستشفى
    doc.text("Adresse: 123 Rue Ain Chkef, Fes", 10, 50);  // عنوان المستشفى
    doc.text("Téléphone: 06 10 13 65 76", 10, 60);  // رقم هاتف المستشفى

    // إضافة تفاصيل الموعد
    doc.setFontSize(12);
    doc.text(`Docteur: ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`, 10, 70);
    doc.text(`Heure: ${appointment.time}`, 10, 80);
    doc.text(`Raison: ${appointment.reason}`, 10, 90);
    doc.text(`Statut: ${appointment.status}`, 10, 100);

    // تحميل PDF
    doc.save(`Rendez-vous_${appointment._id}.pdf`);
  };

  return (
    <div>
      <h3>Rendez-vous médicaux</h3>
      {appointments.length === 0 ? (
        <p>Aucun rendez-vous disponible.</p>
      ) : (
        <div>
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-card" style={styles.card}>
              <h4>Rendez-vous {index + 1}</h4>
              <p><strong>Docteur:</strong> {appointment.doctorId.firstName} {appointment.doctorId.lastName}</p>
              <p><strong>Heure:</strong> {appointment.time}</p>
              <p><strong>Raison:</strong> {appointment.reason}</p>
              <p><strong>Statut:</strong> {appointment.status}</p>
              <button onClick={() => generatePDF(appointment)} style={styles.button}>Télécharger en PDF</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// تنسيقات CSS بسيطة للكارد والزر
const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default DossierMedical;
