import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginDashboard() {
  const [name, setName] = useState('');
  const [universityRollno, setUniversityRollno] = useState('');
  const [dealHandReview, setDealHandReview] = useState('');
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStudents();
  }, []);

  const logout = ()=>{
    // navigate to  login page
    navigate('/');

  }
  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/dealer/allstudent');
      setStudents(response.data.students);
      console.log(response.data.students);
    } catch (error) {
      console.error(error);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/dealer/dealhandletask', {
        name,
        universityRollno,
        dealhandreview: dealHandReview,
      });
      setMessage('Student added successfully!');
      console.log(response.data);
      setName('');
      setUniversityRollno('');
      setDealHandReview('');
      getStudents(); // Refresh the student list
    } catch (error) {
      setMessage('Error adding student');
      console.error('There was an error!', error);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Add Student
      </button>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={logout}>
        logout
      </button>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">Add Student</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setMessage('')}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={addStudent}>
                <div className="form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>University Roll No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter University Roll No"
                    value={universityRollno}
                    onChange={(e) => setUniversityRollno(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dealer Review</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Review"
                    value={dealHandReview}
                    onChange={(e) => setDealHandReview(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              {message && <p className="mt-2">{message}</p>}
            </div>
          </div>
        </div>
      </div>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">University Roll No</th>
            <th scope="col">Dealer Review</th>
            <th scope="col">Section Incharge</th>
            <th scope="col">Dr. Academic</th>
            <th scope="col">Dean Academic</th>
           
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.universityRollno}</td>
                <td>{item.dealhandreview}</td>
                <td>{item.sectionInchargereview}</td>
                <td>{item.draAcademic}</td>
                <td>{item.deanAcademic}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                <div className="alert alert-danger" role="alert">
                  <b>Sorry!</b> No results found.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default LoginDashboard;
