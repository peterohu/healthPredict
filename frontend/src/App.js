import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap'

import Header from './elements/Header'
import Footer from './elements/Footer'
import Tiepnhan from './components/Tiepnhan'
import Lichhen from './components/Lichhen';
import Danhsach from './components/Danhsach';
import LoginScreen from './components/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='my-2'>
        <Container>
          <Route path='/' component={Danhsach} exact/> 
          <Route path='/admin/benh-nhan/:id/chinh-sua' component={Tiepnhan}/> 
          <Route path='/lich-hen' component={Lichhen}/> 
          <Route path='/dang-nhap' component={LoginScreen}/>

        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App