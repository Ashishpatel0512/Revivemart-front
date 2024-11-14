import { Link, useParams,Navigate } from 'react-router-dom'
import './Show.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Show() {
 
  let { productid } = useParams();
  console.log(productid)

  const [product, setproduct] = useState([])
  const [user, setuser] = useState([])
  const [users, setusers] = useState([])
  const [url, seturl] = useState("")
  const [bidamounts,Changamount]=useState(null);
  const [messages,Changmessage]=useState(null);
  const [buyers,Changbuyer]=useState(null);
  const [contacts,Changcontact]=useState(null);
  const [sellers,Changseller]=useState(null);
  const [urls,seturls]=useState(null);


  useEffect(() => {
    fetch(`http://localhost:3001/listings/${productid}`,{
      headers: { 
          "Authorization":localStorage.getItem("token")
     }
      
    })
      .then(res => res.json())
      .then((listing) => {
        setproduct(listing.data)
        setuser(listing.data.User[0])
        setusers(listing.user)
        seturls(listing.user.image.url)

        seturl(listing.data.image[0].url)
      });
  }, [])

  console.log(product)
  console.log(user) 
  console.log(users)

  const bidamount = (e) => {
    const selectedFile = e.target.value;
    Changamount(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const message = (e) => {
    const selectedFile = e.target.value;
    Changmessage(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const buyer = (e) => {
    const selectedFile = e.target.value;
    Changbuyer(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};
const contact = (e) => {
    const selectedFile = e.target.value;
    Changcontact(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
};

const showform = async (e) => {
  const form=document.querySelector(".bidform").classList.toggle("myStyle");;
  console.log(form)
 }

// Function to handle file upload
const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('bidamount', bidamounts);
    // formData.append('message', messages);
    // formData.append('buyer', buyers);
    // formData.append('contact', contacts);
    // formData.append('seller', sellers);


    try {
        await axios.post(`http://localhost:3001/listings/bidings/${productid}`,{
          bidamounts,
          messages,
          buyers,
          contacts,
          sellers:user.name
        },{
            headers:{
                "Authorization": localStorage.getItem("token")

            }
        });
        alert("bid uploaded successfully");
         const form=document.querySelector(".bidform").classList.toggle("myStyle");
         <Navigate to="/show" replace={true} />

        // Navigate("/Myproduct")
    } catch (error) {
        console.error(" upload error:", error);
    }
};

  return (
    <>
    <Navbar user={users}  url={urls}></Navbar>
      <div className="grid-container">
        <div className='first' >
          <img className='img' src={url} alt="" /><br />
          <p className='date'>Added On</p>
          <p className='date'>{product.createAt}</p>
        </div>
        <div>

          <h1>Details</h1><hr />
          <h4>{product.name}</h4>
          <p>price:{product.price}</p>
          <p>description:{product.description}</p>
          <p>catagories:{product.catagory}</p>
          <p>other:{product.other}</p>
          <p>user:{user.name}</p>
          <hr />
          <p>emailid:{user.emailid}</p>
          <p>location:{product.location}</p>
          <hr />
          <form action="" className='bidform myStyle' onSubmit={handleSubmit}>
            <h4>Add Bids</h4>
          <p onClick={showform} className='p'>&times;</p>
            <input type="number" name='bidamount' placeholder='enter bid amount' onChange={bidamount}/>
            <input type="text" name='message' placeholder='enter massage' onChange={message}/>
            <input type="text" name='buyer' placeholder='enter your name' onChange={buyer}/>
            <input type="text" name='contact' placeholder='enter your mo no..' onChange={contact}/>
            <input type="submit" className='bidbtn' value="submit"/>
          </form>



             {users.role=="Admin"?<button onClick={showform} className='newbids' disabled> New Bids</button>
  :
            <button onClick={showform} className='newbids'> New Bids</button>
              }
            </div>
      </div>

    </>

  )
}

export default Show