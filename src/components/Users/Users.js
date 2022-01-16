import React, {useEffect, useState} from "react";
import axios from "axios";
import './Users.css'
const URL = 'https://bank-appleseed.herokuapp.com'

const Users =()=>{

const[usersList, setUsersList]=useState([])

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
            // .then((res)=>res.json())
            .then(data=>{

            setUsersList(data.data)
                console.log('u',usersList)
        });
        }catch(e){
            throw Error(e.message)
        }
        // if (response.status !== 200) {
        //     throw Error(response.message)
        // }
        //
        // return response;
    };
    const data=  callBackendAPI();
    setUsersList(data)
},[])

return (
    <div>
        users
       length:  {usersList.length}
        {/*{usersList && usersList[0].first}*/}
        {/*{usersList.map((user)=>{*/}
        {/*    return <p>{user}</p>*/}
        {/*})}*/}
        {showUsers()}
    </div>
)
}
export default Users