import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{backgroundColor:'#67ade9'}}>
    <div className="container" >

    <div className="pt-2 pb-2" >
        <div className="row">
            <div className="text-center">
            <div>
                <span style={{color:'white',fontSize:'14px'}}>Copyright &copy; Module tiếp nhận bệnh nhân 2022 - NGO THANH PHU - Trường Đại học Tôn Đức Thắng</span>
            </div>
            </div>  
        </div>
    </div>

    </div>
    
    </footer>
  )
}

export default Footer