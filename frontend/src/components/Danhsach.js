import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBenhnhanAction, taoHosoAction } from '../actions/benhnhanaction'
import EditIcon from '@material-ui/icons/Edit';
import dateFormat from 'dateformat';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Button } from 'react-bootstrap'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const Danhsach = ({history}) => {
  const dispatch = useDispatch()

    const  danhsachbenhnhan =  useSelector(state => state.danhsachbenhnhan)
    const { benhnhan } = danhsachbenhnhan
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const  taoHoso =  useSelector(state => state.taoHoso)
    const { success: createSuccess, benhnhan: createdHoso} = taoHoso

    
    const addHandler = () => {
      dispatch(taoHosoAction())
    }
    const updateHandler = (id) => {
      window.location.href = `/admin/benh-nhan/${id}/chinh-sua`
  }
    
    const columns = [
        { field: '_id', title: 'Số hồ sơ',
          render: row =>
          <div>
            <span className='d-inline-block text-truncate' style={{maxWidth: '100px', fontSize:'11px'}}>{row._id}</span>
          </div>
        },
        { field: 'hoten', title: 'Tên bệnh nhân',
        render: row =>
        <div>
          <span style={{fontSize:'11px'}}>{row.hoten}</span>
        </div>
        },
        { field: 'tuoi', title: 'Tuổi',
        render: row =>
        <div>
          <span style={{fontSize:'11px'}}>{row.tuoi}</span>
        </div>
        },
        { field: 'gioitinh', title: 'Giới tính',
        render: row =>
        <div>
          <span style={{fontSize:'11px'}}>{row.gioitinh}</span>
        </div>
        },
        { field: 'diachi', title: 'Địa chỉ',
        render: row =>
        <div>
          <span style={{fontSize:'11px'}}>{row.diachi}</span>
        </div>
        },
        { field: 'createdAt', title: 'Ngày khám',
        render: row => 
        <div style={{fontSize:'11px'}}>
            {dateFormat(row.createdAt, "HH:MM")}, {dateFormat(row.createdAt, "dd/mm/yyyy")}
        </div>},
        { field: 'stroke', title: 'Dự đoán đột quỵ',
        render: row =>
        <div> 
          {row.stroke === 1
          ? <span  style={{fontSize:'11px'}} className='btn btn-danger'>Có</span>
          : <span  style={{fontSize:'11px'}} className='btn btn-success'>Không</span>
          }
        </div>
        },
        { field: 'nguoitao', title: 'Người tạo',
        render: row =>
        <div>
          <span style={{fontSize:'11px'}}>{row.nguoitao}</span>
        </div>
        },

    ]
  
    useEffect(() =>{
      dispatch({type: 'CREATE_HOSO_RESET'})
      if(!userInfo){
          history.push('/dang-nhap')
      }
      if(createSuccess){
          history.push(`/admin/benh-nhan/${createdHoso._id}/chinh-sua`)
      } else{
        dispatch(listBenhnhanAction()) 
      }

  },[dispatch, history, userInfo, createSuccess, createdHoso])


  return (
    <div style = {{minHeight:'90vh'}}>
    
    <div>

      <div className ='text-end'>
        <Button style={{backgroundColor: '#f2f2f2', fontSize:'11px', color:'black', fontWeight:'bold'}} className='my-3 btn-sm float-right' onClick={addHandler}>
            <i className='fas fa-plus'></i> Tạo hồ sơ mới
        </Button>
      </div>

      <MaterialTable
      style={{backgroundColor:'white', borderRadius:'10px'}}
      title="Danh sách bệnh nhân"
      columns={columns}
      icons={tableIcons}
      data={benhnhan}
      localization={{ 
        body: { 
          editRow: 
          { deleteText: 'Xóa tài khoản này?'} 
        },
        header: {
          actions: ''
      },
      
      }}
      
      options={{
          exportButton: {
              csv: true,
              pdf: false,
          },
          headerStyle: {          
              backgroundColor: '#67ade9',
              color: 'white',
              fontSize:'11px'
          },
          sorting: true,
          search: true,
          paging: false,
          maxBodyHeight: 400,
          toolbar: true,   
          actionsColumnIndex: -1,
          rowStyle: {
              fontSize: 12,
          
          }                 
        }}

        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: 'Chỉnh sửa hồ sơ',
            onClick: (event, row) => updateHandler(row._id)

          }
        ]}

        
                          
  />
  
    </div>
  
</div>
  )
}

export default Danhsach