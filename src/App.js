import logo from "./logo.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Row,
  Col,
  FormControl,
  FormCheck,
  Button,
  Table
} from "react-bootstrap";
import { useState } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

function App() { 
  const students = [{id: 1, name: 'Nguyen Van A', code: 'CODE12345', status:'Active', selected: true},
    {id: 2, name: 'Tran Van B', code: 'CODE67890', status:'In-active', selected: true}
  ];
  useState(students)
  const [allStudents, setAllStudents] = useState(students);
  
  const clearHandler = () => {
    setAllStudents([]);
  }

  const selectHandler = (id) => { 
    const newStudents= students.map(item => { 
    //  if(item.id === id){
    //    item.selected === id ? item.selected
   // }
      return item.id === id ? {
        ...item,
        selected: !item.selected
      } : item; 
    });
    setAllStudents(newStudents)
  }

  const statusVariant = (status) => {
    return status === 'Active' ? 'success' : 'danger';
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2> Total Selected Student: {allStudents.filter(item => item.selected).length} </h2>
        </Col>
        <Col>
          <Button onClick={clearHandler}>Clear</Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <FormControl placeholder="Student Name"></FormControl>
          <FormControl placeholder="Student Code"></FormControl>
        <FormCheck></FormCheck>
        </Col>
        <Col>
        <Button>Add</Button>
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
      {students.map(item => ( 
      <tr> 
          <td><FormCheck type='checkbox' onChange={() => selectHandler(item.id)} /></td>
          <td>{item.name}</td>
          <td>{item.code}</td>
          <td>
            <Button variant={statusVariant(item.status)}>{item.status}</Button>
          </td>
          <td>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>))}
      </tbody>
      </Table>
      </Row>
    </Container>
  );
}

export default App;
