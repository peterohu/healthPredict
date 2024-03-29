import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col, FormControl, Container } from 'react-bootstrap'
import { updateHosoAction, listBenhnhanchitietAction } from '../actions/benhnhanaction'
import Message from '../elements/Message'
import Loading from '../elements/Loading'
import axios from 'axios';

const Tiepnhan = ({history, match}) => {
    const benhnhanId = match.params.id

    const [ten, setten] = useState('')
    const [diachi, setdiachi] = useState('')
    const [tinhtrangbenh, settinhtrangbenh] = useState('')
    const [sodienthoai, setsodienthoai] = useState('')
    const [cmnd, setcmnd] = useState('')
    const [tuoi, settuoi] = useState(0)
    const [gioitinh, setgioitinh] = useState('')
    const [tanghuyetap, settanghuyetap] = useState()
    const [benhtim, setbenhtim] = useState()
    const [kethon, setkethon] = useState()
    const [khuvuc, setkhuvuc] = useState(1)
    const [glucose, setglucose] = useState(0)
    const [bmi, setbmi] = useState(0)
    const [congviec, setcongviec] = useState('')
    const [hutthuoc, sethutthuoc] = useState('')
    const [nguoitao, setnguoitao] = useState('')

    const dispatch = useDispatch()

    const  danhsachchitiet =  useSelector(state => state.danhsachchitiet)
    const {loading, error, benhnhan} = danhsachchitiet

    const capnhatHoso = useSelector((state) => state.capnhatHoso)
    const { loading: updateLoading, error: updateError, success: updateSuccess } = capnhatHoso

    async function get_predict(gender, age, hyper, heart, marries, Residence, 
    glucose, bmi, Gov, Never, Private, Self, children, Unknown, 
    formerly, neversmoke, smokes) {
    try {
      var config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': "http://localhost:8000",
            'Accept': 'application/json',
        }
    };
      let response = await axios.get(`http://127.0.0.1:8000/predict?gender=${gender}&age=${age}&hypertenstion=${hyper}&heart_disease=${heart}&ever_marries=${marries}&Residence_type=${Residence}&avg_glucose_level=${glucose}&bmi=${bmi}&work_type_Govt_job=${Gov}&work_type_Never_worked=${Never}&work_type_Private=${Private}&work_type_Self_employed=${Self}&work_type_children=${children}&smoking_status_Unknown=${Unknown}&smoking_status_formerly_smoked=${formerly}&smoking_status_never_smoked=${neversmoke}&smoking_status_smokes=${smokes}`, config)
      .then((response) =>response.data)
      .then(data => {
        
        return Number(Object.values(data)[0])
      
      })
        return response
          
      }
    catch(e) {
        console.log(e)
    }
    }

    useEffect(() => {
   
        if(updateSuccess){
          localStorage.removeItem('benhtim')
          localStorage.removeItem('tanghuyetap')
          localStorage.removeItem('kethon')
          localStorage.removeItem('stroke')
          localStorage.removeItem('gioitinh')
          localStorage.removeItem('khuvuc')
          dispatch({type: 'UPDATE_HOSO_RESET'})
          history.push('/')
        } else{
          if (benhnhan._id !== benhnhanId) {
          dispatch(listBenhnhanchitietAction(benhnhanId))
          } else {
            
            setten(benhnhan.hoten)
            setdiachi(benhnhan.diachi)
            settinhtrangbenh(benhnhan.tinhtrangbenh)
            setsodienthoai(benhnhan.sodienthoai)
            setcmnd(benhnhan.cmnd)
            settuoi(benhnhan.tuoi)
            setgioitinh(benhnhan.gioitinh)
            settanghuyetap(benhnhan.tanghuyetap)
            setbenhtim(benhnhan.benhtim)
            setkethon(benhnhan.kethon)
            setkhuvuc(benhnhan.khuvuc)
            setglucose(benhnhan.glucose)
            setbmi(benhnhan.bmi)
            setcongviec(benhnhan.congviec)
            sethutthuoc(benhnhan.hutthuoc)
            setnguoitao(JSON.parse(localStorage.getItem("userInfo")).name)
          }
        }
        
      
    }, [dispatch, history, benhnhanId, benhnhan, updateSuccess ])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(tanghuyetap === 'on'){
          const tanghuyetap = true
        } if(kethon === 'on' ){
          const kethon = true
        } if(benhtim === 'on'){
          const benhtim = true
        }
          
        if(gioitinh === 'Nam'){
          localStorage.setItem('gioitinh', 1)
        } else{
          localStorage.setItem('gioitinh', 0)
        }

        if(tanghuyetap){
          localStorage.setItem('tanghuyetap', 1)
        }else{
          localStorage.setItem('tanghuyetap', 0)
        }

        if(benhtim){
          localStorage.setItem('benhtim', 1)
        }else{
          localStorage.setItem('benhtim', 0)
        }
        if(kethon){
          localStorage.setItem('kethon', 1)
        }else{
          localStorage.setItem('kethon', 0)
        }

        if(khuvuc === '1' || khuvuc === '2'){
          localStorage.setItem('khuvuc', 1)
        }else{
          localStorage.setItem('khuvuc', 0)
        }

        

        // GOV 
        if(congviec === 'gov' && hutthuoc === 'usually'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          1, 0, 0, 0, 0, 0, 1, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'gov' && hutthuoc === 'unknown'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          1, 0, 0, 0, 0, 1, 0, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'gov' && hutthuoc === 'no'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          1, 0, 0, 0, 0, 0, 0, 1, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'gov' && hutthuoc === 'yes'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          1, 0, 0, 0, 0, 0, 0, 0, 1)

          localStorage.setItem('stroke', stroke)
        } 
        // End GOV

        // NEVER
        
        if(congviec === 'never' && hutthuoc === 'usually'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 1, 0, 0, 0, 0, 1, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'never' && hutthuoc === 'unknown'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 1, 0, 0, 0, 1, 0, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'never' && hutthuoc === 'no'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 1, 0, 0, 0, 0, 0, 1, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'never' && hutthuoc === 'yes'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 1, 0, 0, 0, 0, 0, 0, 1)

          localStorage.setItem('stroke', stroke)
        } 
        // END NEVER
        
        // PRIVATE
        if(congviec === 'private' && hutthuoc === 'usually'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 1, 0, 0, 0, 1, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'private' && hutthuoc === 'unknown'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 1, 0, 0, 1, 0, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'private' && hutthuoc === 'no'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 1, 0, 0, 0, 0, 1, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'private' && hutthuoc === 'yes'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 1, 0, 0, 0, 0, 0, 1)

          localStorage.setItem('stroke', stroke)
        } 
        // END PRIVATE

        // Self
       
        if(congviec === 'self' && hutthuoc === 'usually'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 1, 0, 0, 1, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'self' && hutthuoc === 'unknown'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 1, 0, 1, 0, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'self' && hutthuoc === 'no'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 1, 0, 0, 0, 1, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'self' && hutthuoc === 'yes'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 1, 0, 0, 0, 0, 1)

          localStorage.setItem('stroke', stroke)
        } 
        // END SELF

        // CHILDREN
        if(congviec === 'children' && hutthuoc === 'usually'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 0, 1, 0, 1, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'children' && hutthuoc === 'unknown'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 0, 1, 1, 0, 0, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'children' && hutthuoc === 'no'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 0, 1, 0, 0, 1, 0)

          localStorage.setItem('stroke', stroke)
        } 

        if(congviec === 'children' && hutthuoc === 'yes'){
          let stroke = await get_predict(Number(localStorage.getItem('gioitinh')), tuoi, 
          Number(localStorage.getItem('tanghuyetap')), Number(localStorage.getItem('benhtim')), 
          Number(localStorage.getItem('kethon')), 
          Number(localStorage.getItem('khuvuc')), glucose, bmi, 
          0, 0, 0, 0, 1, 0, 0, 0, 1)

          localStorage.setItem('stroke', stroke)
        } 
        // END CHILDREN
        
        dispatch(updateHosoAction({_id: benhnhanId, ten,
            diachi,
            tinhtrangbenh,
            sodienthoai,
            cmnd,
            tuoi,
            gioitinh,
            tanghuyetap,
            benhtim,
            kethon,
            khuvuc,
            glucose,
            bmi,
            congviec,
            hutthuoc,
            nguoitao,
            stroke: Number(localStorage.getItem('stroke')) 
        }))
        

      
      }
    
  return (
    <Row className='pt-2 justify-content-md-center' style = {{minHeight:'80vh'}}>

      <Col md={8}>
      <Row className=' mt-5 shadowBestSeller' style={{backgroundColor:'white', borderRadius:'10px', paddingBottom: '25px', marginBottom: '35px'}}>
      <Container>
      <div className='text-center cartIcon'><i style={{fontSize:'30px', paddingTop:'27px', color:'#67ade9'}} className="fa-solid fa-user-pen"></i></div>
      </Container>
          <Container>
         
              <h5 className='pt-3' style={{fontWeight:'bold'}}>Tiếp nhận bệnh nhân</h5>
              <hr style={{border:'1px solid #67ade9'}}></hr>
          </Container>    
          {updateLoading && <Loading />}
          {updateError && <Message variant='danger'>{updateError}</Message>}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
          <Form onSubmit={submitHandler}>
              <Row>
                <Col>
                  <Form.Group controlId='phone' className='p-1'>
                  <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Họ và tên</Form.Label>
                  <FormControl 
                  type='text' 
                  placeholder='Nhập họ và tên bệnh nhân' 
                  value={ten}
                  onChange={(e) => setten(e.target.value)}
                  ></FormControl>
                </Form.Group>
                </Col>   
                
                <Col>
                <Form.Group controlId='phone' className='p-1'>
                  <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Tuổi</Form.Label>
                  <FormControl 
                  type='text' 
                  placeholder='Nhập số tuổi' 
                  value={tuoi}
                  onChange={(e) => settuoi(e.target.value)}
                  ></FormControl>
                </Form.Group>
                </Col>

                <Col>
                <Form.Group controlId='phone' className='p-1'>
                <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Giới tính</Form.Label>
                <Form.Select aria-label="Default select example"
                value={gioitinh}
                onChange={(e) => setgioitinh(e.target.value)}
                >
                <option>Giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Form.Select>
              </Form.Group>
                </Col>
              </Row>
            
              <Row>
                <Col>
                <Form.Group controlId='phone' className='p-1'>
              <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>CMND/CCCD</Form.Label>
              <FormControl 
              type='text' 
              placeholder='Nhập cmnd/cccd' 
              value={cmnd}
              onChange={(e) => setcmnd(e.target.value)}
              ></FormControl>
              </Form.Group>
                </Col>

                  <Col>
                  <Form.Group controlId='phone' className='p-1'>
                  <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Địa chỉ</Form.Label>
                  <FormControl 
                  type='text' 
                  placeholder='Nhập địa chỉ' 
                  value={diachi}
                  onChange={(e) => setdiachi(e.target.value)}
                  ></FormControl>
                  </Form.Group>
                  </Col>

                  
              </Row>
             
            <Row>
              
              <Col>
              <Form.Group controlId='phone' className='p-1'>
                <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Số điện thoại</Form.Label>
                <FormControl 
                type='text' 
                placeholder='Nhập số điện thoại' 
                value={sodienthoai}
                onChange={(e) => setsodienthoai(e.target.value)}
                ></FormControl>
            </Form.Group>
              </Col>
              <Col>
               
              <Form.Group controlId='phone' className='p-1'>
              <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Khu vực</Form.Label>
              <Form.Select aria-label="Default select example"
              value={khuvuc}
              onChange={(e) => setkhuvuc(e.target.value)}
              >
              <option>Khu vực</option>
              <option value="1">Khu vực I</option>
              <option value="2">Khu vực II</option>
              <option value="3">Khu vực III</option>
            </Form.Select>
            </Form.Group>
              </Col>
            </Row>
              
            
            <Form.Group controlId='phone' className='p-1'>
            <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Tình trạng bệnh tiếp nhận</Form.Label>
            <FormControl 
            type='text' 
            placeholder='Nhập tình trạng bệnh' 
            value={tinhtrangbenh}
            onChange={(e) => settinhtrangbenh(e.target.value)}
            ></FormControl>
            </Form.Group>
            

            <Row>
              <Col>
              <Form.Group controlId='phone' className='p-1'>
                  <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Tăng huyết áp</Form.Label>
                  <Form.Check type="checkbox" 
                  checked = {tanghuyetap}
                  onChange={(e) => settanghuyetap(!tanghuyetap)}
                  />
                  
              </Form.Group>
              </Col>

              <Col>
              
              <Form.Group controlId='phone' className='p-1'>
              <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Bệnh tim</Form.Label>
              <Form.Check type="checkbox" 
              checked = {benhtim}
              onChange={(e) => setbenhtim(!benhtim)}
                  />
             
              </Form.Group>
              </Col>

              <Col>
              
              <Form.Group controlId='phone' className='p-1'>
              <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Kết hôn</Form.Label>
              <Form.Check type="checkbox" 
              checked = {kethon}
              onChange={(e) => setkethon(!kethon)}
              />
          </Form.Group>
              </Col>
            </Row>
              
            <Row>
              <Col>
              <Form.Group controlId='phone' className='p-1'>
                  <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Chỉ số Glucose</Form.Label>
                  <FormControl 
                  type='text' 
                  placeholder='Nhập chỉ số glucose' 
                  value={glucose}
                  onChange={(e) => setglucose(e.target.value)}
                  ></FormControl>
              </Form.Group>
              </Col>

              <Col>
              <Form.Group controlId='phone' className='p-1'>
              <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Chỉ số BMI</Form.Label>
              <FormControl 
              type='text' 
              placeholder='Nhập chỉ số BMI' 
              value={bmi}
              onChange={(e) => setbmi(e.target.value)}
              ></FormControl>
              </Form.Group>
              </Col>
            </Row>


             <Row>
              <Col>
              <Form.Group controlId='phone' className='p-1'>
              <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Công việc</Form.Label>
              <Form.Select aria-label="Default select example"
              value={congviec}
              onChange={(e) => setcongviec(e.target.value)}
              >
              <option>Công việc</option>
              <option value="gov">Nhà nước</option>
              <option value="never">Không rõ</option>
              <option value="private">Tư nhân</option>
              <option value="children">Trẻ em</option>
              <option value="self">Nội trợ</option>
              </Form.Select>
              </Form.Group>
              </Col>

              <Col>
              <Form.Group controlId='phone' className='p-1'>
              <Form.Label style={{fontSize:'14px', fontWeight:'bold'}}>Hút thuốc</Form.Label>
              <Form.Select aria-label="Default select example"
              value={hutthuoc}
              onChange={(e) => sethutthuoc(e.target.value)}
              >
              <option>Hút thuốc</option>
              <option value="usually">Thường xuyên</option>
              <option value="unknown">Không rõ</option>
              <option value="no">Không hút thuốc</option>
              <option value="yes">Có hút thuốc</option>
              </Form.Select>
              </Form.Group>
              </Col>
             </Row>


              <Form.Group  className='p-1'>
              
                <Button  type='submit' className='mt-2' style={{backgroundColor:'#67ade9 '}}>Lưu thông tin</Button>
              </Form.Group>

          </Form>
          )}
         
      </Row>
      </Col>
    </Row>
        
  )
}

export default Tiepnhan