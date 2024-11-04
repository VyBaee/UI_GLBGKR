import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './addRequest.css';

interface AddRequestPopupProps {
  onClose: () => void;
  onAdd?: (data: any) => void;
  editData?: any;
}

interface Option {
  value: string;
  label: string;
}


const getOptions = (type: string): Option[] => {
  switch (type) {
    case 'requestType':
      return [
        { value: '', label: 'Chọn loại yêu cầu' },
        { value: 'request1', label: 'Request 1' },
        { value: 'request2', label: 'Request 2' },
      ];
    case 'request':
      return [
        { value: '', label: 'Chọn yêu cầu' },
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];
    case 'type':
      return [
        { value: '', label: 'Chọn loại' },
        { value: 'type1', label: 'Type 1' },
        { value: 'type2', label: 'Type 2' },
      ];
    default:
      return [];
  }
};

const AddRequestPopup: React.FC<AddRequestPopupProps> = ({ onClose, onAdd, editData }) => {
  const [tableData, setTableData] = useState([{ creationDate: '', duration: '' }]);
  const [description, setDescription] = useState('');
  const [formValues, setFormValues] = useState({
    requestType: '',
    request: '',
    type: '',
    salary: '',
    cc: '',
    approver: '',
  });

  useEffect(() => {
    if (editData) {
      // Đặt dữ liệu vào form nếu editData tồn tại
      setFormValues({
        requestType: editData.requestType || '',
        request: editData.request || '',
        type: editData.type || '',
        salary: editData.salary || '',
        cc: editData.cc || '',
        approver: editData.approver || '',
      });
      setDescription(editData.description || '');
      setTableData(editData.tableData || [{ creationDate: '', duration: '' }]);
    }
  }, [editData]);

  const [selectedRequestType, setSelectedRequestType] = useState('');
  const [selectedRequest, setSelectedRequest] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableChange = (index: number, field: keyof { creationDate: string; duration: string }, value: string) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };
  

  const handleAddRow = () => {
    setTableData([...tableData, { creationDate: '', duration: '' }]);
  };

  const handleDeleteRow = (index: number) => {
    if (tableData.length > 1) {
      const updatedTableData = tableData.filter((_, i) => i !== index);
      setTableData(updatedTableData);
    }
  };

  const handleSubmit = () => {
    const requestData = { ...formValues, description, tableData };
    if (onAdd) onAdd(requestData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="headerContent" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>{editData ? 'Sửa Yêu Cầu' : 'Tạo Yêu Cầu'}</h2>
          <button type="button" onClick={onClose} className="close-button">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={(e) => e.preventDefault()}>
        <div className="formGroup">
            <label>Request Type:</label>
            <select
              value={selectedRequestType}
              onChange={(e) => setSelectedRequestType(e.target.value)}
            >
              {getOptions('requestType').map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="formGroup">
            <label>Request:</label>
            <select
              value={selectedRequest}
              onChange={(e) => setSelectedRequest(e.target.value)}
            >
              {getOptions('request').map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="formGroup">
            <label>Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {getOptions('type').map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="formGroup">
            <label>Salary:</label>
            <input type="text" name="salary" value={formValues.salary} onChange={handleInputChange} />
          </div>

          {/* Bảng Creation Date và Duration */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Creation Date</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="date"
                        value={row.creationDate}
                        className="timeInput"
                        onChange={(e) => handleTableChange(index, 'creationDate', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.duration}
                        className="timeInput"
                        onChange={(e) => handleTableChange(index, 'duration', e.target.value)}
                      />
                    </td>
                    <td>
                      <button className="deleteTime" type="button" onClick={() => handleDeleteRow(index)} disabled={tableData.length <= 1}>
                        <FaTimes/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="addTime" type="button" onClick={handleAddRow}>
              Thêm mới
            </button>
          </div>

          {/* Textarea để nhập Description */}
          <div className="formGroup">
            <label>Description:</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Input cho CC và Approver */}
          <div className="formGroup">
            <label>CC:</label>
            <input type="text" name="cc" value={formValues.cc} onChange={handleInputChange} />
          </div>

          <div className="formGroup">
            <label>Approver:</label>
            <input type="text" name="approver" value={formValues.approver} onChange={handleInputChange} />
          </div>

          {/* Nút Tạo/Sửa và Xoá */}
          <div className="button-group">
            <button type="button" onClick={handleSubmit} className="submit-button">
            {editData ? 'Lưu' : 'Tạo'}
            </button>
            <button type="button" onClick={onClose} className="close-button">
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRequestPopup;
