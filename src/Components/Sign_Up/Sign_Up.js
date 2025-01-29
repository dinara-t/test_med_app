import React, { useState } from 'react';
import './Sign_Up.css'; // Apply CSS according to your design theme
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showErr, setShowErr] = useState('');
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        // Regular expression for email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const register = async (e) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setShowErr('Invalid email address');
            return;
        }

        if (password.length < 8) {
            setPasswordLengthError(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    role: role // Include role in the request body
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('phone', phone);
                sessionStorage.setItem('email', email);
                // Redirect to home page
                navigate('/');
                window.location.reload();
            } else {
                if (json.errors) {
                    for (const error of json.errors) {
                        setShowErr(error.msg);
                    }
                } else {
                    setShowErr(json.error);
                }
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setShowErr('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                    {/* {signupRoleText && <div className="signup-role">{signupRoleText}</div>} */}
                </div>
                <div className="signup-text1" style={{ textAlign: 'left' }}>
                    Already a member? <span><Link to="/login" style={{ color: '#2190FF' }}> Login</Link></span>
                </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} name="role" id="role" className="form-control" required>
                                <option value="">Select Role</option>
                                <option value="doctor">Doctor</option>
                                <option value="patient">Patient</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" required autoComplete="name" style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" maxLength="10" required autoComplete="tel" style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="emailHelpId" required autoComplete="email" style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" required autoComplete="new-password" style={{ width: '100%' }} />
                            {passwordLengthError && password.length < 8 && (
                                <div className="err" style={{ color: 'red' }}>Password length must be 8 or more</div>
                            )}
                        </div>
                        {showErr && <div className="err" style={{ color: 'red' }}>{showErr.msg}</div>}
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;