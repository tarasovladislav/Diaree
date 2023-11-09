import React from 'react'
import "./AddButton.css"

function AddButton() {

    function handleAddButton() {
        alert("Button works")
    }

  return (
    <div className='add-button'>
        <p onClick={handleAddButton}>⊕</p> 
    </div>
  )
}

export default AddButton