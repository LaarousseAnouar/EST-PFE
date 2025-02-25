import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom de famille est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";
    if (!formData.password.trim()) newErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: 'patient'  
          }),
        });
        if (response.ok) {
          navigate('/login');  
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.error });
        }
      } catch (error) {
        setErrors({ submit: 'Une erreur est survenue. Veuillez réessayer.' });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h2>Créer un compte</h2>
          <p>Inscrivez-vous pour accéder aux services de santé</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label>Prénom</label>
            <input 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              required 
            />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}
          </div>

          <div className="input-group">
            <label>Nom</label>
            <input 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              required 
            />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* Mot de passe */}
          <div className="input-group">
            <label>Mot de passe</label>
            <div className="password-container">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {/* Confirmer le mot de passe */}
          <div className="input-group">
            <label>Confirmer le mot de passe</label>
            <div className="password-container">
              <input 
                name="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"} 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="signup-btn">Créer un compte</button>
        </form>

        <div className="signup-footer">
          Vous avez déjà un compte ?  
          <button onClick={() => navigate('/login')} className="login-link"> Se connecter</button>
        </div>

        {errors.submit && <p className="error-message">{errors.submit}</p>}
      </div>
    </div>
  );
};

export default SignUp;
