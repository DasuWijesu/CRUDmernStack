import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users (){
    //to display data create variable 
    const [users, setUsers] = useState([{
        _id: "676bef0" ,name: "JK", email: "jk@gmail.com", age: 20
    }]);

    useEffect(()=>{
        axios.get('http://localhost:5000/')
        .then(result =>setUsers(result.data))
        .catch(err=> console.log(err))
    },[]);

    const handleDelete = (id) => {
        console.log('Deleting user with ID :', id) //debugging log
        axios.delete(`http://localhost:5000/deleteUser/${id}`)
            .then(res => {console.log(res);
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            })
            .catch(err => console.log('Delete error:', err.response || err.message))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className='btn btn-success'>Add+</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>(
                                <tr key = {index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>  
                                        <button className='btn btn-danger'
                                        onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
//use [`/update/${user._id}`] for update data through _id
export default Users;