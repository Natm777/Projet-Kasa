import './index.css';
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Logement from './pages/Logement'
import Apropos from './pages/Apropos'
import Header from './components/Header'
import Error from './components/Error'
import Footer from './components/Footer'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logement/:logementId" element={<Logement />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)