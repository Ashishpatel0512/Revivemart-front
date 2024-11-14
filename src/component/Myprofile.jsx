import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import './Myprofile.css'
import axios from "axios";
import { Navigate } from "react-router-dom";
function Myprofile() {
    const [data, setdata] = useState([]);
    const [image, setimage] = useState(null);
    const [file, setFile] = useState(null);
    const [url,seturl]=useState([]);



    useEffect(() => {
        fetch(`http://localhost:3001/user/general`, {
            headers: {
                "Authorization":localStorage.getItem("token")

            }
        })

            .then(res => res.json())
            .then((data) => {
                console.log(data.data)
                setdata(data.data)
                setimage(data.data.image.url)
                seturl(data.data.image.url)

            });
    }, [])


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file)
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

            await axios.post('http://localhost:3001/upload',formData,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                    }
            });
            alert("File uploaded successfully");
            Navigate("/myprofile")
        
    }
    return (
        <>
<Navbar user={data} url={url}></Navbar>
<div className="photo">

            <img src={image} alt=""  className="image"/>
            <h2>name:{data.name}</h2>
            <h2>emailid:{data.emailid}</h2>
            <form onSubmit={handleSubmit}  className="upload">
            <input type="file" className="upload" onChange={handleFileChange}/><br />
            <button type="submit" className="uplaodbtn">Upload File</button><br /><br /><br />
            </form>

</div>
           

        </>

    )
}

export default Myprofile