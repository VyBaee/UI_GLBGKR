import React, { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { FaSearch, FaSyncAlt, FaPlus } from 'react-icons/fa';
import AddRequest from './AddRequest';
import './requestManagement.css';
import Table from './RequestTable';

const RequestManagement: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedReasons, setSelectedReasons] = useState<{ value: string; label: string; }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ value: string; label: string; }[]>([]);
  const [textInput, setTextInput] = useState<string>('');

  const reasonsOptions = [
    { value: 'reason1', label: 'Reason 1' },
    { value: 'reason2', label: 'Reason 2' },
    { value: 'reason3', label: 'Reason 3' },
  ];

  const statusOptions = [
    { value: 'status1', label: 'Status 1' },
    { value: 'status2', label: 'Status 2' },
    { value: 'status3', label: 'Status 3' },
  ];

  const handleSearch = () => {
    console.log({
      startDate,
      endDate,
      reasons: selectedReasons,
      status: selectedStatus,
      textInput,
    });
  };

  const handleRefresh = () => {
    setStartDate('');
    setEndDate('');
    setSelectedReasons([]);
    setSelectedStatus([]);
    setTextInput('');
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <div className="search-form">
      <h1 className="form-title">Quản lý yêu cầu</h1>
      <div className="form-row">
        <div className="form-group date-input">
          <label className="form-label">Ngày bắt đầu:</label>
          <input
            type="date"
            className="date-input-field"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group date-input">
          <label className="form-label">Ngày kết thúc:</label>
          <input
            type="date"
            className="date-input-field"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="form-group reason-select">
          <label className="form-label">Chọn lý do:</label>
          <Select
            isMulti
            options={reasonsOptions}
            className="multi-select"
            onChange={(value: MultiValue<{ value: string; label: string; }>) => setSelectedReasons(value as { value: string; label: string; }[])}
          />
        </div>
        <div className="form-group status-select">
          <label className="form-label">Chọn trạng thái:</label>
          <Select
            isMulti
            options={statusOptions}
            className="multi-select"
            onChange={(value: MultiValue<{ value: string; label: string; }>) => setSelectedStatus(value as { value: string; label: string; }[])}
          />
        </div>
        <div className="form-group text-input">
          <label className="form-label">Tìm kiếm lý do:</label>
          <input
            type="text"
            className="text-input-field"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
          <button className="refresh-button" onClick={handleRefresh}>
            <FaSyncAlt />
          </button>
          <button className="add-button" onClick={openPopup}>
            <FaPlus /> Thêm mới
          </button>
        </div>
      </div>
      <Table />
      {showPopup && <AddRequest onClose={closePopup} />}
    </div>
  );
};

export default RequestManagement;
