import React from 'react'
// React Bootstrap
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
// React Router
import { Outlet, Link } from 'react-router-dom'
// Image
import Weather from './assets/Images/Home/Weather.png'

const linkToPage = {
  smallProject: [
    { id: "Weather", name: "Weather App", link: "/weather", description: "Get real-time weather updates for any city.", img: Weather },
    { id: "Todo", name: "Todo List", link: "/todolist", description: "A simple task management app to keep track of daily tasks.", img: '' },
    { id: "Counter", name: "Counter App", link: "/", description: "A basic counter that increases, decreases, and resets.", img: '' },
    { id: "Quote", name: "Random Quote Generator", link: "/", description: "Generate inspirational quotes with a click.", img: '' },
    { id: "Calculator", name: "Calculator", link: "/", description: "A functional calculator for basic arithmetic operations.", img: '' },
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
            linkToPage.smallProject.map(({ id, name, link, description, img }) => (
              <Col sm={6} lg={4} className='g-3' key={id}>
                <Card style={{minHeight: '25vh'}}>
                  <Card.Img variant='top' src={img}/>
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Link to={link}><Button>{id}</Button></Link>
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