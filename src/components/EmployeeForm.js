import React, { useEffect, useState } from 'react';
import api from '../api';

function EmployeeForm({ selected, refresh }) {
  const [formData, setFormData] = useState({ name: '', role: '', departmentId: '' });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get('/departments').then(res => setDepartments(res.data));
    if (selected) {
      setFormData({
        name: selected.name,
        role: selected.role,
        departmentId: selected.department?.id || ''
      });
    }
  }, [selected]);
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      role: formData.role,
      department: { id: formData.departmentId }
    };

    if (selected && selected.id) {
      api.put(`/employees/${selected.id}`, payload).then(() => refresh());
    } else {
      api.post('/employees', payload).then(() => refresh());
    }

    setFormData({ name: '', role: '', departmentId: '' });
  };

  return (
    <div className="mt-4">
      <h4>{selected ? 'Update' : 'Add'} Employee</h4>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} className="form-control mb-2" placeholder="Name" required />
        <input name="role" value={formData.role} onChange={handleChange} className="form-control mb-2" placeholder="Role" required />
        <select name="departmentId" value={formData.departmentId} onChange={handleChange} className="form-control mb-2" required>
          <option value="">Select Department</option>
          {departments.map(dep => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>
        <button className="btn btn-primary">{selected ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default EmployeeForm;

