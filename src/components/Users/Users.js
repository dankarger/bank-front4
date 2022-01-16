import React, {useEffect, useState} from "react";
import axios from "axios";
import './Users.css'
const URL = 'https://bank-appleseed.herokuapp.com'
// import {CURRENT_URL} from "../../costants/global.constants";

const Users =()=>{

const[usersList, setUsersList]=useState([]);
const[isAddMenu,setIsAddMenu]=useState(false);
const[firstName, setFirstname]=useState('');
    const[lastName, setLastname]=useState('');
    const[cash, setCash]=useState(0);
    const[credit, setCredit]=useState(0);
    const[id, setId]=useState(0);
const[newUser,setNewUser]=useState({first:'t',
last:'t',cash:20,credit:10,id:3210})

    const handleChange=(e)=> {
        setNewUser({[e.target.name]:[...e.target.value]})

        console.log(e.target.value)

    }
        // async function fetchSomething() {
        // const {data} = await axios.get(CURRENT_URL)
        //     console.log(data)
        // }

    const deleteUser= async (id)=>{
    try{
        await axios.delete(URL +'/users', {data:{id: +id}})
            // .then((res)=>res.json())
            .then(data=>{

                setUsersList(data.data)
                console.log('u',usersList)
            });
    }catch (e){
        throw Error('errr')
    }
    }
    const viewUser=(id)=>{
    }

    const handleAddUser = () => {
        // http://127.0.0.1:3000/users
    }

    const showUsers=()=> {
        if(usersList.length>0) {
            return (
                usersList.map(user=>{
                    return  (<div className='card' key={user.id}>
                            <p>name :{user.first} {user.last}</p>

                            <p>cash: {user.cash}</p>
                            <p>credit: {user.credit}</p>
                            <button onClick={()=>console.log(user.id)}>Edit</button>
                            <button onClick={()=>deleteUser(user.id)}>Delete</button>
                            <button onClick={()=>viewUser(user.id)}>View</button>
                    </div>

                    )
                })

            )
        }
    }
    const addUserToServer= async ()=>{
        try {
            console.log(newUser)
            await axios.post(URL +'/users',{data:newUser})
                .then(data=>{
                console.log('dd',data)

                })
        }catch(e){
         console.log(e)
        }
    }

useEffect(()=>{
    const callBackendAPI = async () => {
          // await fetch('http://localhost:3000/users',{
          //     headers : {
          //         'Content-Type': 'application/json',
          //         'Accept': 'application/json',
          //         'mode':"no-cors"
          //     }}

          // )
        try {
        await axios.get(URL +'/users')
            .then(data=>{

            setUsersList(data.data)
                console.log('u',usersList)
        });
        }catch(e){
            throw Error(e.message)
        }
    };
    const data=  callBackendAPI();
    setUsersList(data)
},[])

return (
    <div>
        users
       length:  {usersList.length}
        <div>
            <button onClick={()=>{setIsAddMenu(!isAddMenu)}}>Add user</button>
        </div>
        <div className={isAddMenu?"show":'hide'}>
            <div>
                <label htmlFor="firstName">First name: </label>
                <input onChange={handleChange} name="firstName" type="text" value={newUser.first}/>
                <label htmlFor="lastName">Last name: </label>
                <input onChange={handleChange} name="lastName" type="text"  value={newUser.last}/>
                <label htmlFor="cash">cash: </label>
                <input onChange={handleChange} name="cash" type="number"  value={newUser.cash}/>
                <label htmlFor="credit">Credit: </label>
                <input onChange={handleChange} name="credit" type="text"  value={newUser.credit}/>
                <label htmlFor="id">ID: </label>
                <input onChange={handleChange} name="id" type="number"  value={newUser.id}/>
                <button onClick={addUserToServer}>Add User</button>
            </div>
        </div>
        {showUsers()}
    </div>
)
}
export default Users