import React from 'react';
import './userTable.css';

const UserTable: React.FC = () => {
  // Dữ liệu mẫu cho bảng, có thể thay đổi theo nhu cầu
  const requests = [
    { id: 1, reason: 'Reason 1', status: 'Status 1', date: '2024-11-01' },
    { id: 2, reason: 'Reason 2', status: 'Status 2', date: '2024-11-02' },
    { id: 3, reason: 'Reason 3', status: 'Status 3', date: '2024-11-03' },
  ];

  return (
    <div className="request-table">
      <h2 className="table-title">Danh sách người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Lý do</th>
            <th>Trạng thái</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.reason}</td>
              <td>{request.status}</td>
              <td>{request.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
