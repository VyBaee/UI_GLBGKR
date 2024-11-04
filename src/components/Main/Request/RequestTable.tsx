import React, { useState } from 'react';
import './requestTable.css';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import AddRequest from './AddRequest';

const RequestTable: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null); // Dữ liệu yêu cầu đang chỉnh sửa

  const requests = [
    { id: 1, requestType: 'Loại 1', employeeName: 'Nhân viên 1', requestDate: '2024-11-01', duration: '3', leaveType: 'Nghỉ phép', approver: 'Người A', status: 'Đang chờ' },
    { id: 2, requestType: 'Loại 2', employeeName: 'Nhân viên 2', requestDate: '2024-11-02', duration: '4', leaveType: 'Nghỉ ốm', approver: 'Người B', status: 'Đã phê duyệt' },
    { id: 3, requestType: 'Loại 3', employeeName: 'Nhân viên 3', requestDate: '2024-11-03', duration: '7', leaveType: 'Nghỉ không lương', approver: 'Người C', status: 'Bị từ chối' },
  ];

  const handleEdit = (data: any) => {
    setEditData(data); // Đặt dữ liệu cần chỉnh sửa
    setIsPopupOpen(true); // Mở popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditData(null); // Xoá dữ liệu chỉnh sửa khi đóng popup
  };

  const handleSaveEdit = (updatedData: any) => {
    // Xử lý lưu dữ liệu cập nhật
    console.log('Updated data:', updatedData);
    handleClosePopup();
  };

  return (
    <div className="request-table">
      <h2 className="table-title">Danh sách yêu cầu</h2>
      <table>
        <thead>
          <tr>
            <th>Loại yêu cầu</th>
            <th>Tên nhân viên</th>
            <th>Ngày yêu cầu</th>
            <th>Khoảng thời gian (giờ)</th>
            <th>Loại nghỉ phép</th>
            <th>Người uỷ quyền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.requestType}</td>
              <td>{request.employeeName}</td>
              <td>{request.requestDate}</td>
              <td>{request.duration}</td>
              <td>{request.leaveType}</td>
              <td>{request.approver}</td>
              <td>{request.status}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(request)}>
                  <FaRegEdit />
                </button>
                <button className="delete-button"><MdDeleteOutline /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <AddRequest 
          onClose={handleClosePopup}
          onAdd={handleSaveEdit}
          editData={editData} // Truyền dữ liệu vào popup
        />
      )}
    </div>
  );
};

export default RequestTable;
