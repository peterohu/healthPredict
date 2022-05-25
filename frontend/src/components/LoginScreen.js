import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../elements/Message'
import Loading from '../elements/Loading'
import { Form, Button, Row, Col, FormControl, Container, Image } from 'react-bootstrap'
import { loginAction } from '../actions/userAction'


const LoginScreen = ({location, history}) => {
    const dispatch = useDispatch()

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {       
        e.preventDefault()
        dispatch(loginAction(phone, password))      
    }

    const  userLogin =  useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() =>{
        if(userInfo){ 
            history.push(redirect)
        } 
    },[history, userInfo, redirect]) 

  return (
    <Container className='pt-2' style = {{minHeight:'80vh'}}>
        <Row className='justify-content-md-center mt-3 shadowBestSeller' style={{backgroundColor:'white', borderRadius:'10px', paddingBottom: '25px', marginBottom: '35px'}}>
            <Container>
                <h5 className='pt-3' style={{fontWeight:'bold'}}>Module tiếp nhận bệnh nhân</h5>
                <hr style={{border:'1px solid #61b337'}}></hr>
            </Container>    
            <Col xs={12} md={6}>
                {error && <Message variant='danger' text = {error}></Message> }
                {loading &&  <Loading /> }

            <Form onSubmit={handleSubmit}>
                
                <Form.Group controlId='phone' className='p-1'>
                    <Form.Label style={{fontSize:'14px'}}>Số điện thoại</Form.Label>
                    <FormControl 
                    type='text' 
                    placeholder='Nhập số điện thoại' 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    ></FormControl>
                </Form.Group>

                <Form.Group controlId='password'  className='p-1' >
                    <Form.Label style={{fontSize:'14px'}}>Mật khẩu</Form.Label>
                    <FormControl 
                    type='password' 
                    placeholder='Nhập mật khẩu' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </Form.Group>
                
                
                <Form.Group  className='p-1'>
                
                {phone !== '' && password !== ''
                    ? <Button  type='submit' style={{backgroundColor:'#67ade9'}}>Đăng nhập</Button>
                    :  <Button disabled type='submit' style={{backgroundColor:'#67ade9'}}>Đăng nhập</Button>
                }
                </Form.Group>

            </Form>
            </Col>
            <Col xs={12} md={6}>
            <Image src='/images/login.png' alt='Login.jpg'  fluid />
            </Col>
        </Row>
    </Container>
  )
}

export default LoginScreen