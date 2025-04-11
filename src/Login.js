import React, { useEffect, useState } from 'react';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (captcha !== 'ABCD') {
        setErrorMsg('Invalid CAPTCHA');
        return;
      }

      if (email === 'user@example.com' && password === 'password@123') {
        alert('Login successful!');

        if (remember) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPassword', password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }

      } else {
        setErrorMsg('Invalid credentials');
      }
    }, 1500);
  };

  return (
    <div className="login-container" role="main">
      <div className="login-box">
        <img src="/cyber-security-logo.avif" alt="Company Logo" className="logo" />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={loading ? "form-content" : "form-content"}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
              required
            />

            <div className="captcha-section">
              <label htmlFor="captcha">CAPTCHA</label>
              <div className="captcha-box">
                <span className="captcha-text">ABCD</span>
                <input
                  id="captcha"
                  type="text"
                  placeholder="Enter CAPTCHA"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  aria-required="true"
                  required
                />
              </div>
            </div>

            <div className="checkbox-row">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" style={{ marginTop: '0px' }}>Remember Me</label>
            </div>

            {errorMsg && <p className="error">{errorMsg}</p>}
          </div>

          {loading && <div className="spinner" aria-live="polite" aria-busy="true"></div>}

          <button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="form-footer">
            <a className="forgot-password-link" href="/forgot-password">Forgot Password?</a>
            <span className="signup-text">
              Don't have an account? <a href="/signup">Create one</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
