import React from 'react'

const Child = (props) => {
 return (
    <div>
      <p>This is a child component.</p>
      <p>Received prop value: {props.propValue}</p>
    </div>
  )
}
export default Child
