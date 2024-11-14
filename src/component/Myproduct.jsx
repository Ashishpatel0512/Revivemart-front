import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Myproduct.css'
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';
function FileUpload() {
    const [file, setFile] = useState(null);
const [name,Changname]=useState(null);
const [descriptions,Changdescription]=useState(null);
const [catagorys,Changcatagory]=useState(null);
const [prices,Changprice]=useState(null);
const [ages,Changage]=useState(null);
const [locations,Changlocation]=useState(null);
const [others,Changother]=useState(null);
const [data,setdata]=useState([]);
const [user,setuser]=useState("undefined");
const [url,seturl]=useState([]);


useEffect(()=>{
    fetch('http://localhost:3001/user/products',{
        headers:{
            "Authorization":localStorage.getItem("token")

        }
    })
    .then(res => res.json())
    .then((data)=>{
    setuser(data.user)
    setdata(data.data)
    seturl(data.user.image.url)
    }
    );
  },[])
  console.log(data)
  console.log(user)

    // Function to handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const Name = (e) => {
        const selectedFile = e.target.value;
        Changname(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const description = (e) => {
        const selectedFile = e.target.value;
        Changdescription(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const price = (e) => {
        const selectedFile = e.target.value;
        Changprice(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const age = (e) => {
        const selectedFile = e.target.value;
        Changage(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const location = (e) => {
        const selectedFile = e.target.value;
        Changlocation(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const other = (e) => {
        const selectedFile = e.target.value;
        Changother(selectedFile)

        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const catagory = (e) => {
        const selectedFile = e.target.value;
        Changcatagory(selectedFile)
        console.log("Selected file:", selectedFile); // Debug: check if the file is selected
    };
    const showform = async (e) => {
      const form=document.querySelector(".form").classList.toggle("myStyle");;
      console.log(form)
      const table=document.querySelector("table").classList.toggle("opcity");
    //   table.style.opacity="0.2"
      }

    // Function to handle file upload
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('description', descriptions);
        formData.append('price', prices);
        formData.append('age', ages);
        formData.append('location', locations);
        formData.append('catagory', catagorys);
        formData.append('other', others);

        console.log("FormData object:", formData.get('file')); // Debug: check if file is appended to FormData
        console.log("FormData object:", formData.get('catagory')); // Debug: check if file is appended to FormData
        
        try {
            await axios.post('http://localhost:3001/index',formData,{
                headers:{
                    "Authorization":localStorage.getItem("token")

                }
            });
            alert("product uploaded successfully");
            const form=document.querySelector(".form").classList.toggle("myStyle");
            const table=document.querySelector("table").classList.toggle("opcity");

            <Navigate to="/myproduct" replace={true} />

        } catch (error) {
            console.error("product upload error:", error);
        }
    };
 console.log(descriptions)

//admin error
 if(user.role=="Admin"){
    return (
       <>
       <Navigate to="/error" replace={true} />
       </>
    )
   }


    return (
<>
<Navbar   user={user} url={url} ></Navbar>
<h3 className='header'>Myproducts</h3>
<div className='table'>
<button onClick={showform} className='new'>Add Product</button>
<table>
  <tr>
  <th scope="col">products</th>
            <th >name</th>
            <th >price</th>
            <th >category</th>
            <th>age</th>
            <th >status</th>
            <th>Added on</th>
            <th>Action</th>
  </tr>
  
  {data.reverse().map((product) => (
        <tr>
        <td><img src={product.image[0].url} alt="" /></td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.catagory}</td>
        <td>{product.age}</td>
        <td>{product.status}</td>
        <td>{product.createAt}</td>
         <td>
        <Link to={`/showbids/${product._id}`}>Showbids</Link> &nbsp;&nbsp; 
        <Link to={`/delete/${product._id}`}>
            <button className='deletebtn'>Delete</button>
          </Link> &nbsp;  &nbsp; 
           <Link to={`/edit/${product._id}`}>
            <button className='editbtn'>Edit</button>
          </Link> &nbsp; 
        </td>
      </tr>
      ))}
  
  
</table><br />
</div>
        <form onSubmit={handleSubmit} className='form myStyle'>
            <h4>New product</h4>
            <p onClick={showform} className='p'>&times;</p>
            <input type="text" name='name' placeholder='ENTER PRODUCT NAME..'  onChange={Name} /><br />
            <textarea name="description"placeholder='ENTER PRODUCT DESCRIPTION..' onChange={description}></textarea><br />
            <input type="text" name='price' placeholder='ENTER PRODUCT PRICE..'onChange={price} /><br />
            <input type="text" name='age'placeholder='ENTER PRODUCT HOW MANY OLD..' onChange={age} /><br />
            <input type="text" name='location' placeholder='ENTER LOCATION..'  onChange={location}/><br />
            <select name="catagory" id="catagory" onChange={catagory}>
             <option value="Funicher">Funicher</option>
             <option value="Electronic">Electronic</option>
             <option value="Vehicals">Vehicals</option>
             <option value="Other">Other</option>
             </select><br />
             <select name="other" id="catagory" onChange={other}>
             <option value="warenty">warenty</option>
             <option value="gerenty">gerenty</option>
             <option value="warenty-gerenty">warenty-gerenty</option>
             </select><br />
            {/* <input type="text" name='other' onChange={other} /><br /> */}
            <input type="file" onChange={handleFileChange}  /><br />

            <button type="submit" className='updatebtn'>Save</button><br />

        </form>
        </>
    );
}

export default FileUpload;
