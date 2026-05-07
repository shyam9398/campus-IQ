import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User, Lock } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(name, password);
      } else {
        await signup(name, password);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content card" style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem' }}><X size={20} /></button>
        
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{isLogin ? 'Login' : 'Create Account'}</h2>
        
        {error && <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group">
            <label>Name</label>
            <input 
               type="text" 
               className="w-full"
               style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
               value={name}
               onChange={(e) => setName(e.target.value)}
               required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
               type="password" 
               className="w-full"
               style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button 
             onClick={() => setIsLogin(!isLogin)}
             style={{ color: 'var(--primary-blue)', fontWeight: 600, marginLeft: '0.5rem' }}
          >
             {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
