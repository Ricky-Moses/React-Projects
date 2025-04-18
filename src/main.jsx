import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// React Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.min.css';
// App component
import App from './App'
// Sass Files
import './sass/style.scss'
// Tailwind css
import './styles.css'
// React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
