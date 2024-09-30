import { useEffect, useState } from 'react'
import axios from 'axios';


import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [filteredusers, setfilteredusers] = useState([]);
  const [ismodelopen, setismodelopen] = useState(false);
  const [userdata, setuserdata] = useState([]);


  const getallusers = async()=>{
    await axios.get("http://localhost:8000/users/").then((res)=>{
      setUsers(res.data)
      setfilteredusers(res.data)
      console.log(res.data)
    });
  }
  useEffect(()=>{
    getallusers();
  },[]);
  const handlesearch = (e)=>{
    const text= e.target.value.toLowerCase();
    const filteruser=users.filter((user)=>user.name.toLowerCase().includes(text)||user.city.toLowerCase().includes(text));
    setfilteredusers(filteruser)
  };

  const handledelete = async(userid) =>{

    const isdelete=window.confirm("are you went to delete the user")

    if(isdelete){
      await axios.delete(`http://localhost:8000/users/${userid}`).then((res)=>{
        setUsers(res.data)
        setfilteredusers(res.data)
    
    
        });
    };

    
  };
   
 const handleadd =(e)=>{
  setuserdata({...userdata,[e.target.name]:[e.target.value]})

 };


 const handlemodel=()=>{
   setismodelopen(true)
   setuserdata({name:"",age:"",city:""})
 };
 
 const handlesubmit=async ()=>{
  if(userdata.id){
    await axios.patch(`http://localhost:8000/users/${userdata.id}`,userdata).then((res)=>
      console.log(res))

  };
  await axios.post(`http://localhost:8000/users/`,userdata).then((res)=>
  console.log(res))
  setismodelopen(false)



 };
 const handleupdate =(user)=>{
    setismodelopen(true)
    setuserdata(user)


 };
  return (
    <>
      <div className="container">
        <h1>CRUD APPLICATON</h1>
        <div className="inputsearch">
          <input className='search' placeholder='enter name or city' onChange={handlesearch}></input>
          <button onClick={handlemodel}>ADD</button>
        </div>
        <div className="tablecontainer">
          <table>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>NAME</th>
                <th>AGE</th>
                <th>CITY</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {filteredusers && filteredusers.map((user,index)=>{
                return(
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
                  <td><button onClick={()=>handleupdate(user)}>edit</button></td>
                  <td><button onClick={()=>handledelete(user.id)}>delete</button></td>
                </tr> 
                )
              })}
            </tbody>
          </table>
          </div>
          {ismodelopen && (

            
            <form className='addusers'>
            <label htmlFor="name">Name</label>
            <input type='text' name='name' onChange={handleadd} value={userdata.name}></input>
            <label htmlFor="age">Age</label>
            <input type='number' name='age' onChange={handleadd} value={userdata.age}></input>
            <label htmlFor="city">city</label>
            <input type='text' name='city' onChange={handleadd} value={userdata.city}></input>
            <button onClick={handlesubmit}>adduser</button>
            <button onClick={()=>{setismodelopen(false)}}>close</button>

            </form>

            )}
          
       

      </div>
    </>
  )
}

export default App
