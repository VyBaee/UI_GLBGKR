import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestManagement from '../Request/RequestManagement';
import UserManagement from '../User/UserManagement';
import './dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 giây không hoạt động
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  let inactivityTimeout: NodeJS.Timeout;

  // Hàm reset thời gian đếm
  const resetTimer = useCallback(() => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      onLogout();
      navigate('/');
    }, TIMEOUT_DURATION);
  }, [navigate, onLogout]);

  useEffect(() => {
    resetTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [resetTimer]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button className='logOut' onClick={handleLogout}>Logout</button>

      <div className="management-buttons">
        <button
          className={activeComponent === 'request' ? 'active' : 'deactive'}
          onClick={() => setActiveComponent('request')}
        >
          Quản lý yêu cầu
        </button>
        <button
          className={activeComponent === 'user' ? 'active' : 'deactive'}
          onClick={() => setActiveComponent('user')}
        >
          Quản lý người dùng
        </button>
      </div>

      <div className="management-content">
        {activeComponent === 'request' && <RequestManagement />}
        {activeComponent === 'user' && <UserManagement />}
      </div>
    </div>
  );
};

export default Dashboard;
