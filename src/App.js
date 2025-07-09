import React from 'react';
import EmployeeList from './components/EmployeeList';


function App() {

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Employee Management System</h2>

 {/* Employee Section */}
 <EmployeeList />

    </div>
  );
}

export default App;
