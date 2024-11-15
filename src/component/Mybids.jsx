import { useEffect,useState } from "react";
import { useParams,Navigate } from "react-router-dom"
import Navbar from "./Navbar";

function Mybids(){

    // let {productid,productuserid}=useParams();
    // console.log(productid,productuserid)
    const [bids,setbids]=useState([]);
    const [url,seturl]=useState([]);

    const [user,setuser]=useState([]);

    useEffect(()=>{
        fetch(`http://localhost:3001/user/mybids`,{
            headers:{
            "Authorization":localStorage.getItem("token")
             }})
        .then(res => res.json())
        .then((data)=>{
            setbids(data.bid)
            setuser(data.user)
            seturl(data.user.image.url)
        }
        );
      },[])
    console.log(user)
    console.log(bids)

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
<Navbar user={user} url={url}></Navbar>
<h3 className='header'>Mybids</h3>
<div className='table'>
<table>
  <tr>
  <th scope="col">products</th>
            <th >name</th>
           <th >bidplacedOn</th>
            <th >seller</th>
            <th >offered Price</th>
            <th >bid Amount</th>
            <th >Message</th>
            <th >Contact Details</th>
  </tr>
  
  {bids.map((data) => (
        <tr>
       <th scope="row"><img src={data.Productid.image[0].url} alt=""  height="30px" width="30px"/></th>
              <td>{data.Productid.name}</td>
              <td>{data.createAt}</td>
              <td>{data.Productid.User[0].name}</td>
              <td>{data.Productid.price}</td>
              <td>{data.bidamount}</td>
              <td>{data.message}</td>
              <td>{data.contact } <br /> {data.User[0].name}</td>
  
      </tr>
      ))}
  
  
</table><br />
</div>
</>

    )
}

export default Mybids