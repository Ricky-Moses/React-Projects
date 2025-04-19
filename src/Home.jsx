import React from 'react'
// React Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
// React Router
import { Outlet, Link } from 'react-router-dom'
// Image
import Weather from './assets/Images/Home/Weather.png'
import TodoList from './assets/Images/Home/Todo-list.png'
import Calorie from './assets/Images/Home/Calorie_Meter.png'
import Quote from './assets/Images/Home/Quote.png'
import Calculator from './assets/Images/Home/Calculator.png'

const linkToPage = {
  smallProject: [
    { id: "Weather", name: "Weather App", link: "/weather", description: "Get real-time weather updates for any city.", img: Weather },
    { id: "Todo", name: "Todo List", link: "/todolist", description: "A simple task management app to keep track of daily tasks.", img: TodoList },
    { id: "Calorie", name: "Calorie App", link: "/calorie", description: "A basic calorie app that track your health.", img: Calorie },
    { id: "Quote", name: "Random Quote Generator", link: "/quote", description: "Generate inspirational quotes with a click.", img: Quote },
    { id: "Calculator", name: "Calculator", link: "/calculator", description: "A functional calculator for basic arithmetic operations.", img: Calculator },
    { id: "Color-picker", name: "Color Picker", link: "/", description: "Pick and copy color codes easily for your designs.", img: '' },
    { id: "Clock", name: "Digital Clock", link: "/", description: "A live digital clock displaying the current time.", img: '' },
    { id: "Form-validator", name: "Simple Form Validator", link: "/", description: "A form validation tool for input fields.", img: '' },
    { id: "Gallery", name: "Image Gallery", link: "/", description: "A responsive image gallery with smooth transitions.", img: '' },
    { id: "Expense-tracker", name: "Expense Tracker", link: "/", description: "Track your daily expenses and manage your budget.", img: '' },
  ],
};

const Home = () => {

  return (
    <>
      <Container fluid>

        <Row className='p-5'>
          <h1>Small Projects</h1>
          {
            linkToPage.smallProject.map(({ id, name, link, description, img }, i) => (
              <Col sm={6} lg={4} className='g-3' key={id}>
                <Card className='h-100'>
                  <Card.Img variant='top' src={img}/>
                  <Card.Body className='d-flex flex-column justify-content-center gap-2'>
                    <Card.Title>{i + 1}. {name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Link to={link}><Button variant='info text-white'>{id}</Button></Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>

      </Container>

      <Outlet />
    </>

  );
}

export default Home