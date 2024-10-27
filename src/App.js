// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  FormControl,
  FormCheck,
  Button,
  Table,
} from "react-bootstrap";

// Simulated API calls (ensure these are defined properly)
const fetchStudents = async () => {
  // Mock API response for fetching students
  return [
    { id: 1, name: "Nguyen Van A", code: "CODE12345", status: "Active", selected: true },
    { id: 2, name: "Tran Van B", code: "CODE67890", status: "In-active", selected: true },
  ];
};

const createStudent = async (student) => {
  // Simulated API call to create student
  console.log("Student created:", student);
};

const updateStudent = async (student) => {
  // Simulated API call to update student data
  console.log("Student updated:", student);
};

const deleteStudent = async (id) => {
  // Simulated API call to delete student
  console.log("Student deleted with id:", id);
};

function StudentList() {
  const [allStudents, setAllStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentCode, setNewStudentCode] = useState("");

  useEffect(() => {
    // Fetch students from the API when the component mounts
    const getStudents = async () => {
      const students = await fetchStudents();
      setAllStudents(students);
    };
    getStudents();
  }, []);

  const clearHandler = () => {
    setAllStudents([]);
  };

  const addStudentHandler = () => {
    if (newStudentName && newStudentCode) {
      const newStudent = {
        id: allStudents.length + 1,
        name: newStudentName,
        code: newStudentCode,
        status: "Active",
        selected: false,
      };
      setAllStudents([...allStudents, newStudent]);
      setNewStudentName("");
      setNewStudentCode("");
    }
  };

  const selectHandler = (id) => {
    const newStudents = allStudents.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setAllStudents(newStudents);
  };

  const deleteStudentHandler = (id) => {
    const updatedStudents = allStudents.filter((student) => student.id !== id);
    setAllStudents(updatedStudents);
    deleteStudent(id); // Simulated API call
  };

  const statusVariant = (status) => {
    return status === "Active" ? "success" : "danger";
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>
            Total Selected Student: {allStudents.filter((item) => item.selected).length}
          </h2>
        </Col>
        <Col>
          <Button onClick={clearHandler}>Clear</Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <FormControl
            placeholder="Student Name"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <FormControl
            placeholder="Student Code"
            value={newStudentCode}
            onChange={(e) => setNewStudentCode(e.target.value)}
          />
        </Col>
        <Col>
          <Button onClick={addStudentHandler}>Add</Button> {/* Add Student Button */}
        </Col>
      </Row>

      <Row className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Selected</th>
              <th>Student Name</th>
              <th>Student Code</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allStudents.map((item) => (
              <tr key={item.id}>
                <td>
                  <FormCheck type="checkbox" onChange={() => selectHandler(item.id)} />
                </td>
                <td>
                  <Link to={`/student/${item.id}`}>{item.name}</Link>
                </td>
                <td>{item.code}</td>
                <td>
                  <Button variant={statusVariant(item.status)}>{item.status}</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteStudent(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Fetch the student details based on ID
    const fetchStudent = async () => {
      const students = await fetchStudents();
      const foundStudent = students.find((s) => s.id === parseInt(id));
      setStudent(foundStudent);
    };
    fetchStudent();
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h2>Student Details</h2>
      <p>Name: {student.name}</p>
      <p>Code: {student.code}</p>
      <p>Status: {student.status}</p>
      <Button variant="primary" onClick={() => updateStudent(student)}>
        Update Student
      </Button>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
