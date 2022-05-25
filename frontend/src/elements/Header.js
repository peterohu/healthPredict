import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Dropdown, Row, Col, NavDropdown, Image, } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logoutAction } from '../actions/userAction'
import PersonIcon from '@material-ui/icons/Person';

const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logoutAction())
  }

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect style={{backgroundColor:'#f6f6f6'}}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand><Image style={{borderRadius:'5px'}} width={'50'} src='https://mpng.subpng.com/20181118/ibv/kisspng-vector-graphics-medical-record-computer-icons-medi-pediatric-urgent-care-for-children-chicago-walk-5bf215bdacd7d9.083452621542591933708.jpg'></Image></Navbar.Brand>
        </LinkContainer>
        <div className="copyright-area">
          <div className="container">
              <div className="row">
                  <div >
                      <div className="copyright-text">
                          <p>Đây là sản phẩm phục vụ thực tập tại Bệnh viện đa khoa khu vực Cầu Ngang</p>
                      </div>
                  </div>                  
              </div>
          </div>
        </div> 

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto"
            navbarScroll
          >
          {userInfo 
          ? 
              (
                  <NavDropdown align='start' style={{fontSize: '14px', marginLeft:'4px'}} className='pe-1' active title={userInfo.name} id='username'>
                   <NavDropdown.Item style={{fontSize:'14px'}} onClick={logoutHandler}>Thoát tài khoản</NavDropdown.Item>
                  </NavDropdown>
              )
          :
              (
                  <LinkContainer to='/dang-nhap'>
                      <Nav.Link >
                          <span>
                            <PersonIcon style={{ fontSize: 35 }} /> Đăng nhập
                          </span>
                      </Nav.Link>
                  </LinkContainer>
              )
      
      }
          </Nav>         
        </Navbar.Collapse>
      </Container>
      </Navbar>    
    </header>
  )
}

export default Header