import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Draacedemic() {
  const [students, setStudents] = useState([]);
  const [ draAcademic, setdraAcademic] = useState( '')
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    getStudents();
  }, []);

  
  const getStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/dealer/allstudent');
      setStudents(response.data.students);
    } catch (error) {
      console.error(error);
    }
  };

  const openReviewModal = (id) => {
    setSelectedStudentId(id);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setdraAcademic('');
    setMessage('');
  };
  
  
  const addReview = async () => {
    try {
      await axios.post(`http://localhost:8080/api/dealer/draacdemic/${selectedStudentId}`, {
        draAcademic: draAcademic,
      });
      setMessage('Review added successfully!');
      getStudents(); 
      closeModal();
    } catch (error) {
      setMessage('Error adding review');
      console.error(error);
    }
  };

  return (
   <>
   <h1>Dr. Academic Dashboard</h1>

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
          <td>
            {item.draAcademic ? (
              item.draAcademic
            ) : (
              <button onClick={() => openReviewModal(item._id)} className="btn btn-primary">
                Dr. Academic Review
              </button>
            )}
          </td>
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


      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Dra Academic Review</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Dr. Academic Review</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Review"
                    value={draAcademic}
                    onChange={(e) => setdraAcademic(e.target.value)}
                    required
                  />
                </div>
                {message && <p className="mt-2">{message}</p>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={addReview}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

   </>
  )
}

export default Draacedemic