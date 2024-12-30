import React, { useState } from 'react';

function Child(props) {
  const [data, setData] = useState(null);
  const handleClick = () => {
       const newData = " mashup stack";
        setData(newData);
        props.onDataFromChild(newData);
  }
   return (
       <div>
           <button onClick={handleClick}> click me </button>
           <p> Data in child component : {data}</p>
     </div>
  );
}

export default Child;