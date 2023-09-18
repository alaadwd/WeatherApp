import React, { useState } from 'react'
import "./Home.css"
import {CiSearch} from "react-icons/ci"
import {FiSun} from "react-icons/fi"
import {MdOutlineWaterDrop} from "react-icons/md"
import {TbTemperatureFahrenheit} from "react-icons/tb"
import {BiSolidErrorCircle} from "react-icons/bi"

function Home() {
  const [inputValue,setInputValue] = useState("")
  const [fetchedJSON,setFetchedJSON] = useState([])
  const [errorMenu,setErrorMenu] = useState(false)
  const [expand,setExpand] = useState(false)
  const [errorHandler,setErrorHandler] = useState(false)
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
 
//   
//  .then(res => res.json())
//  .then(data => setFetchedJSON(data))
  
  const submitRequest = async (event) => {  
     event.preventDefault()
     try{
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}/${formattedDate}/?key=QFGL7CJ93WM6KH3VAWD5TV7SK`)
      if(response.status === 200){
        const data = await response.json()
        setFetchedJSON(data)
        setErrorMenu(false)
        setExpand(true)
        setErrorHandler(true)  


      }else if(response.status === 400){
        setErrorMenu(true)
        setExpand(prev => false)
        setErrorHandler(prev => false)
        setInputValue("")
      }
      
     } catch (error){
      console.error(error)
     }
  
  }
  // The list of data
  // 1 .description
  // 2 .days[0].tempmax .days[0].tempmin .days[0].temp .days[0].humidity 
  // useEffect(submitRequest(),[counter])
  // useEffect(
  
  //   ,[fetchedJSON])
  // 
  function ErrorSection() {
    return (
      <div className='error_Container'>
        <BiSolidErrorCircle size={80} color='lightgreen'/>
        <h3>Unvalid Input : Please Type The Country Name Correctly</h3>
        <h6>I Did error handling terribly so please dont test how wrong this can go</h6>
      </div>
    )
  }  
  function Fetched() {
    return (
      <div>

        <div className='temp_details'>
          <p>Temperature Today:</p>
          <FiSun color={'yellow'} size={60}/>
          <h1 className='flexy'>{fetchedJSON["days"][0]["temp"]}<TbTemperatureFahrenheit/></h1>
        </div>
        <div className='temp_details'>
          <p>Weather Details: {formattedDate}</p>
          <p className='smol'>{fetchedJSON["description"]}</p>
        </div>
      <div className='small_temps'>
        <div className='temp_details'>
        <FiSun  size={30}/>
          <h1 className='flexy'>{fetchedJSON["days"][0]["tempmax"]}<TbTemperatureFahrenheit/></h1>
          <p className='smol'>Max Temperature</p>
        </div>
        <div className='temp_details'>
        <FiSun  size={30}/>
          <h1 className='flexy'>{fetchedJSON["days"][0]["tempmin"]}<TbTemperatureFahrenheit/></h1>
          <p className='smol'>Minimum Temperature</p>

        </div>
        <div className='temp_details'>
        <MdOutlineWaterDrop size={30}/>
          <h1 >{fetchedJSON["days"][0]["humidity"]}%</h1>
          <p className='smol'>Humidity</p>

        </div>
      </div>
      </div>
    )
  }

  return (
    <div className={expand ? "Home_Container expanded" : "Home_Container"}>
      <form className='input_Container'>
      <input value={inputValue} onChange={handleInputChange}  className='input_field' placeholder='Enter Your Location...'></input>
      <button onClick={submitRequest} className='search_btn'><CiSearch size={20}/></button>
      {errorMenu && <ErrorSection/>}
      </form>
      <div className='fetched_Data'>
      {errorHandler &&<Fetched/>}
      
      </div>
    </div>
  )
}

export default Home
