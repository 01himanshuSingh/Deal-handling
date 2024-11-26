import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [admins, setAdmins] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Fetch admins data from the backend
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dealer/getadmin');
        setAdmins(response.data.admins); // Adjust based on the backend response structure
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the selected admin's ID, role, and password to the backend
      const response = await axios.post('http://localhost:8080/api/dealer/login', {
        username: selectedAdminId,
        password,
        role: selectedRole,
      });

      if (response.data.user.username === "Dealhandle") {
        // Pass the "dealhandle" value to the parent component's handleLogin function
        onLogin("Dealhandle"); //password Dealhandle123
        navigate('/dashboard'); // Redirect to the dashboard
      }
      if(response.data.user.username === "sectionIncharge"){
        // Pass the "dealhandle" value to the parent component's handleLogin function
        onLogin("sectionIncharge");    // password sectionIncharge123
        navigate('/sectionInchargedashboard');  
      }

      if(response.data.user.username === "DraAcademic"){
        // Pass the "dealhandle" value to the parent component's handleLogin function
        onLogin("DraAcademic");
        navigate('/draAcademicdashboard');  
      }
      if(response.data.user.username === "DeanAcademic"){
        // Pass the "dealhandle" value to the parent component's handleLogin function
      
        onLogin("DeanAcademic");
        navigate('/deanAcademicdashboard');  
      }
  
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <div className='loginbackground'>
        <div>
          <h1>Login</h1>
        </div>
        <div className='loginblock'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="admin-select">Select Admin:</label>
            <select
              id="admin-select"
              value={selectedAdminId}
              onChange={(e) => setSelectedAdminId(e.target.value)}
            >
              <option value="">-- Choose admin --</option>
              {admins && admins.map((admin) => (
                <option key={admin._id} value={admin.username}>
                  {admin.username}
                </option>
              ))}
            </select>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>

            <label htmlFor="role-select">Select Role:</label>
            <select
              id="role-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">-- Choose role --</option>
              {admins && admins.map((admin) => (
                <option key={admin._id} value={admin.role}>
                  {admin.role}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
