import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
export default function AddProducts() {
    const [text, setText] = useState("Enter the text");
    const [color, setColor] = useState();
    const handleUp = () => {
        let newText = text.toUpperCase();
        setText(newText);
    }
    const handleDown = () => {
        let newText = text.toLowerCase();
        setText(newText)
    }
    const handlechange = (e) => {
        setText(e.target.value)
        
    }
    const handleColor = () => {
        setColor('white')
     }
   
     const handleSpaces = () => {
        let newText = text.split(/\s+/); // Split by one or more whitespace characters
        setText(newText.join(" ")); // Join with a single space
    };
    
        
    
    return (
        <><><div>
            <form>
                <h1>enter text area</h1>

                <textarea className="myboxi" id="mybox" value={text} onChange={handlechange} rows="5" style={{ width: "80%", marginLeft: "10px",color:color }}></textarea>

            </form>
        </div><div>
                <Button variant="primary" onClick={handleUp}>convert to upper</Button>
           
                <Button variant="primary" style={{ marginLeft: "2px" }} onClick={handleDown}>convert to lower</Button>
                
                <Button variant="primary" style={{ marginLeft: "2px" }} onClick={handleColor}>convert to red</Button>
                
                <Button variant="primary" style={{marginLeft: "2px"  }} onClick={handleSpaces}>Handle Spaces</Button>
            </div>
        
        
        </><div>
                <p className='up' id="up"></p>
            </div>
            <div className='container'>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>{0.008 * text.split(" ").length} read time</p>
                <p>{text}</p>
        </div>
        
        </>
  )
}
