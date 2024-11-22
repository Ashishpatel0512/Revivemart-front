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
    const [names, Changname] = useState(null);
    const [emails, Changemail] = useState(null);




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

    const Name = (e) => {
        const selectedFile = e.target.value;
        Changname(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const email = (e) => {
        const selectedFile = e.target.value;
        Changemail(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };

    const showform = async (e) => {
        const form=document.querySelector(".form").classList.toggle("myStyle");;
        console.log(form)
      //   table.style.opacity="0.2"
        }
        const uploadimage = async (e) => {
            const form=document.querySelector(".upload").classList.toggle("myStyle");;
            console.log(form)
            }


        
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
            }).then((data)=>{
                console.log(data.data)
                if(data.data.success){
                    alert(data.data.message);
                    const form=document.querySelector(".upload").classList.toggle("myStyle");;
        
                    Navigate("/myprofile")
                }
                else{
                    alert("error is"+data.data.error);
 
                }
            });
           
        
    }
    const handleprofile = async (e) => {
        e.preventDefault();
        
        /* updating title of product with id 1 */
fetch('http://localhost:3001/change/profile', {
  method: 'POST', /* or PATCH */
  headers: { 'Content-Type': 'application/json',       
     "Authorization":localStorage.getItem("token")
  },
  body: JSON.stringify({
    "name":names||data.name,
    "emailid":emails||data.emailid
  })
})
.then(res => res.json())
.then(console.log);
const form=document.querySelector(".form").classList.toggle("myStyle");;

            Navigate("/myprofile")
        
    }
    return (
        <>
<Navbar user={data} url={url}></Navbar>
<div className="photo">

            <img src={image} alt=""  className="image"/>
            <h2>name:{data.name}</h2>
            <h2>emailid:{data.emailid}</h2>


        <form onSubmit={handleprofile} className='form myStyle'>
            <h4 className="up">update profile</h4>
            <p onClick={showform} className='p'>&times;</p>
            <input type="text" name='name'  placeholder='ENTER NAME.'  onChange={Name} /><br />
            <input type="email" name='emailid' placeholder='ENTER EMAIL.'  onChange={email} /><br />
            <button type="submit" className='updatebtn'>Update</button><br />

        </form>


            <form onSubmit={handleSubmit}  className="upload update myStyle">
            <h2 className="up">upload image</h2>
            <input type="file" className="upload"  onChange={handleFileChange}/><br />
            <button type="submit" className="uplaodbtn">Upload</button><br /><br /><br />
            </form>
            <button className="uplaodbtn" onClick={uploadimage} >Upload-image</button>
            <button className="uplaodbtn" onClick={showform} >Update-Profile</button>
</div>
           

        </>

    )
}

export default Myprofile