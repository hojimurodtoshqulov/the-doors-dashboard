import React,{useRef} from 'react'
import JoditEditor from "jodit-react"
export default function EditorText(props) {
    const editor = useRef(null);
    const handleChange =(content)=>{
        props.setData(oldValue =>({...oldValue, ['content_'+props.lang]: content}))
        // props.setData(oldValue=>({...oldValue, ['content']: {...oldValue['content'],  [props.lang]:content}}))

    }
    
  return (
    <JoditEditor ref={editor}  style={{height: "400px"}}  onChange={(content)=> handleChange(content)} value={props.value || ""}/>
  )
}
