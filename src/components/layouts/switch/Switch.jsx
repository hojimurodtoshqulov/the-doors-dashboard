import { data } from 'jquery'
import React from 'react'
import s from "./Switch.module.css"


function Switch(props) {
   
    const handleChange =(status)=>{
        props.setData(oldValue =>({...oldValue, ['status']: status.target.checked}))
    }
    
  return (
    <label className={s.switch}>
    <input type="checkbox" value={props.value || ""} checked={props.value} onChange={(status)=> handleChange(status)} />
    <div className={s.slider}></div>
  </label>
  )
}

export default Switch