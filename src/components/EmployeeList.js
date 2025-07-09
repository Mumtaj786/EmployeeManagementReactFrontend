import React, { useEffect, useState } from 'react';
import api from '../api';

function EmployeeList({ onEdit }) {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    api.get('/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
const handleDelete = (id) => {
    api.delete(`/employees/${id}`)
      .then(() => fetchEmployees())
      .catch(err => console.error(err));
  };
  return (
    <div className="mt-4">
      <h4>Employee List</h4>
      <table className="table table-striped">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Role</th><th>Department</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.role}</td>
              <td>{emp.department?.name}</td>
              <td>
                <button onClick={() => onEdit(emp)} className="btn btn-sm btn-warning me-2">Edit</button>
                <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
