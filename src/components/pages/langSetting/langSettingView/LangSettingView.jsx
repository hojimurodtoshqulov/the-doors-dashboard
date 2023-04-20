import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import Switch from '../../../layouts/switch/Switch';

export default function LangSettingView() {
  const [data, setData] = useState({
    title: "",
    key: "",
    status: false
})

const params = useParams();
const id = params.id;
const navigation = useNavigate();


const handleChange = (event) =>{
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData(oldValue => ({...oldValue, [inputName]: inputValue}))
}


useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}lang/get/${id}`)
    .then(res =>{
        if(res.status == 200){
            setData(res.data.data)
        }
    })
  
}, [])

const handleSubmit = (event)=>{
    event.preventDefault();
   
    axios.put(`${process.env.REACT_APP_API_URL}lang/update/${id}`, data)
    .then(res=>{
        if (res.status == 200){
            navigation("/admin/setting", {replace: true})
        }
       
     
    })
   
}
  return (
    <div className="container-fluid pt-4 px-4">
    <div className="row vh-100  rounded  justify-content-center mx-0">
    
    <div className="col-12">
    <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Lang create form</h6>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                <input type="text" name='title' onChange={handleChange} className="form-control" id="exampleInputEmail1"
                                 value={data.title || ""} required  /> 
                               
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Key</label>
                                <input type="text" value={data.key || ""} name="key" onChange={handleChange} className="form-control" id="exampleInputPassword1" required/>
                            </div>
                        </div>

                        <div className="col-6">
                          <Switch setData={setData} value={data.status}/>
                        </div>
                    </div>
                   
                  
                    <button type="button" onClick={()=>{navigation("/admin/setting")}} className="btn btn-warning me-3">Back</button>
                    <button type="submit" className="btn btn-primary">Update</button>
                
                </form>
            </div>
        </div>
    </div>
</div>
  )
}
