import axios from 'axios';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Switch from '../../../layouts/switch/Switch';


export default function LangSettingCreate() {
  const [data, setData] = useState({
    title: "",
    key: "",
    status: false
})
const navigation = useNavigate();


const handleChange = (event) =>{
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setData(oldValue => ({...oldValue, [inputName]: inputValue}))
}

const handleSubmit = (event)=>{
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}lang/create`, data)
    .then(res=>{
        if (res.status == 200){
            navigation("/admin/setting", {replace: true})
        }
       
     
    }).catch(err =>{
        NotificationManager.error('Error create lang', 'Error!')
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
                                  required  /> 
                            
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Key</label>
                                <input type="text" name="key" onChange={handleChange} className="form-control" id="exampleInputPassword1" required/>
                            </div>
                        </div>
                    
                        <div className="col-6">

                          <Switch setData={setData} value={data.status}/>

                        </div>
                    </div>
                   
                  
                    <button type="button" onClick={()=>{navigation("/admin/setting")}} className="btn btn-warning me-3">Back</button>

                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}
