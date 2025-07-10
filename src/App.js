import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';


function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeRefreshKey, setEmployeeRefreshKey] = useState(0);


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Management System</h2>

 {/* Employee Section */}
 <EmployeeForm selected={selectedEmployee} refresh={() => {
        setEmployeeRefreshKey(prev => prev + 1);
        setSelectedEmployee(null);
      }} />
      <EmployeeList key={employeeRefreshKey} onEdit={emp => setSelectedEmployee(emp)} />

      <hr />

    </div>
  );
}

export default App;
