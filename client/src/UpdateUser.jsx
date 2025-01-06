import React, { useState , useEffect } from "react"
import { useParams , useNavigate} from "react-router-dom"
import axios from 'axios'

function UpdateUser (){
    const { id } = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:5000/getUser/${id}`)
        .then(result => {
            setName(result.data.name)
            setEmail(result.data.email)
            setAge(result.data.age)
        })

        .catch(err => console.log(err))
        },[id]);

    //handle from submission
    const handleSubmit = (e) => {
        e.preventDefault()

        //prepare the update data
    const updateUser={
        name,
        email,
        age
    };

    //send the PUT request to update user data
    axios
        .put(`http://localhost:5000/updateUser/${id}`, updateUser)
        .then((result) => {
            alert("user update successfully!");
            navigate("/") //redirect to homePage after update
        })
        .catch((err) => {
            alert("error updateing user")
            console.log(err)
        })
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;