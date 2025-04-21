import React, { useEffect, useMemo, useState } from 'react'
// Image
import Sun from '../assets/Images/Small_projects/Sun.png'
import Cloud from '../assets/Images/Small_projects/Cloud.png'
import Rainy from '../assets/Images/Small_projects/Rainy_Cloud.png'
// React Bootstrap
import { Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
// Axios
import axios from 'axios'
// React Icons
import { FiWind } from 'react-icons/fi'
import { WiHumidity } from 'react-icons/wi'
import { FaTemperatureHalf } from 'react-icons/fa6'
import { GiWhirlwind } from 'react-icons/gi'
// Styled component
import styled from 'styled-components'

// =============================================================================
const airCondition = [
  { name: 'Real Feel', icon: <FaTemperatureHalf /> },
  { name: 'Wind Deg', icon: <FiWind /> },
  { name: 'Humidity', icon: <WiHumidity /> },
  { name: 'Speed', icon: <GiWhirlwind /> },
];

// Styled Component
const PA = styled.p`
  font-size: clamp(.6em, 1.5vw, 1.3em) !important;
`;

const H3 = styled.h3`
  font-size: clamp(.6em, 2.5vw, 1.45rem) !important;
`;


// ==============================================================================
const Weather = () => {
  
  const [cities, setCities] = useState('dindigul')
  const [weather, setWeather] = useState(null)
  const [time, setTime] = useState(new Date())
  
  useEffect(()=>{
   const interval = setInterval(() => {
    setTime(new Date())
   }, 1000) // Update every second 
  
   return ()=> clearInterval(interval)
  }, []);

  // Api Fetching
  const fetchWeather = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            q: cities,
            units: 'metric',
            appid: '445d3c579b008587019a62a33e0f0854'
          }
        }
      );
      setWeather(res.data)
      console.log(res);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Get daily forecast
  const getDailyForecast = useMemo(() => {
    if (!weather) return [];
    const dailyMap = {};
    weather.list.forEach((entry) => {
      const [date, hour] = entry.dt_txt.split(' ');
      if (hour === '12:00:00' && !dailyMap[date]) {
        dailyMap[date] = entry;
      }
    });
    console.log(dailyMap);
    return Object.values(dailyMap).slice(0, 7);
  }, [weather]);


  return (
    <>
      <Container className='weather h-dvh d-flex align-items-center justify-content-center pt-5 pb-3'>
        <section className="weather-app">
          <Row className='p-2 gap-4 gx-0 text-white'>
            <Col lg={7} className='first-column d-flex flex-column justify-content-center gap-2'>
              <Row className='form-input'>
                <Form onSubmit={fetchWeather}>
                  <Form.Control
                    type='search'
                    placeholder='Search Cities'
                    value={cities}
                    onChange={(e) => setCities(e.target.value)}
                  />
                </Form>
              </Row>
              <Row className='head-card gx-0'>
                <Card className=''>
                  <Card.Body>
                    <Row className='d-flex align-items-center'>
                      <Col className='text-white'>
                        <h2 className='fw-bold'>{weather?.city?.name || 'City Name'}</h2>
                        <p className='my-2'>Rain Volume: {weather?.list?.[0]?.rain?.["3h"] ? `${weather.list[0].rain["3h"]} mm` : "0 mm"}</p>
                        <h3 className=''>{weather?.list?.[0]?.main?.temp ?? "--"}°C</h3>
                      </Col>
                      <Col className='img-container'>
                        <Card.Img src={
                          weather?.list?.[0]?.weather?.[0].main === 'Rain' ? Rainy
                            : weather?.list?.[0]?.weather?.[0].main === 'Clouds' ? Cloud
                              : Sun
                        } className='' />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
              <Row className='today-weather gx-0 p-3 '>
                <p className='fw-bold mb-2'>TODAY'S FORECAST</p>
                <ul className='d-flex align-items-center justify-content-around'>
                  {weather?.list?.slice(0, 5).map((time) => (
                    <li className='border-end d-flex flex-column align-items-center justify-content-center gap-2' key={time.dt}>
                      <PA>{new Date(time.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</PA>
                      <Image src={
                        time?.weather?.[0].main === 'Rain' ? Rainy
                          : time?.weather?.[0].main === 'Clouds' ? Cloud
                            : Sun
                      } className='img-fluid' />
                      <H3>{time?.main?.temp ?? '--'}°C</H3>
                    </li>
                  ))}
                </ul>
              </Row>
              <Row className='air-condition gx-0 p-3'>
                <p className='fw-bold mb-2'>AIR CONDITION</p>
                <Row>
                  {airCondition.map(({ name, icon }) => {
                    let value = '--';
                    if (weather?.list?.[0]) {
                      const data = weather.list[0];
                      switch (name) {
                        case 'Real Feel':
                          value = `${data.main.feels_like} °C`;
                          break;
                        case 'Wind Deg':
                          value = `${data.wind.deg} °`;
                          break;
                        case 'Humidity':
                          value = `${data.main.humidity} %`;
                          break;
                        case 'Speed':
                          value = `${data.wind.speed} m/s`;
                          break;
                        default:
                          value = '--';
                      }
                    }
                    return (
                      <Col xs={6} className='' key={name}>
                        <div className='d-flex align-items-center gap-1 mb-2'>
                          <label htmlFor="" className=''>{icon}</label>
                          <p className='m-0 fw-bold'>{name}</p>
                        </div>
                        <H3 className='ms-5'>{value}</H3>
                      </Col>
                    )
                  })}
                </Row>
              </Row>
            </Col>
            <Col className='second-column p-3 gx-0'>
              <div className='d-flex align-items-center justify-content-between mb-3'>
                <p className='fw-bold'>5DAYS - FORECAST</p>
                <p>{time.toLocaleTimeString()} | {time.toLocaleDateString()}</p>
              </div>
              <ul className='d-flex align-items-center flex-column'>
              {getDailyForecast.map((day)=>(
                <li key={day.dt} className='d-flex align-items-center justify-content-between border-bottom w-100 py-2 px-1'>
                  <p>{new Date(day.dt_txt).toLocaleDateString('en-US', {weekday: 'short'})} {new Date(day.dt_txt).toLocaleDateString([], {day: 'numeric', month: 'numeric'})}</p>
                  <div className='img-container-two d-flex align-items-center'>
                    <Image src={
                          day?.weather?.[0].main === 'Rain' ? Rainy
                            : day?.weather?.[0].main === 'Clouds' ? Cloud
                              : Sun
                    } className='img-fluid' />
                    <label htmlFor="" className='fw-bold'>
                      {day?.weather?.[0].main ?? 'N/A'}
                    </label>
                  </div>
                  <H3>{day?.main?.temp}°C</H3>
                </li>
              ))}
              </ul>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  )
}

export default Weather