// AddRequestPopup.tsx
import React from 'react';
import './addUser.css';

interface AddUserPopupProps {
  onClose: () => void;
}

const AddUserPopup: React.FC<AddUserPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Thêm Yêu Cầu Mới</h2>
        <form>
          <div className="form-group">
            <label>Lý do:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Trạng thái:</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Ngày bắt đầu:</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Ngày kết thúc:</label>
            <input type="date" />
          </div>
          <button type="button" onClick={onClose} className="close-button">
            Đóng
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserPopup;
