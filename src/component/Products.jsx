import { useEffect,useState } from "react";
import { useParams,Link,Navigate } from "react-router-dom"
import Navbar from "./Navbar";

function Products(){

    // let {productid,productuserid}=useParams();
    // console.log(productid,productuserid)
    const [data,setdata]=useState([]);
    const [user,setuser]=useState([]);
    const [url,seturl]=useState([]);


    useEffect(()=>{
        fetch(`http://localhost:3001/products`,{
            headers:{
            "Authorization":localStorage.getItem("token")
             }})
        .then(res => res.json())
        .then((data)=>{
          setuser(data.user)
          seturl(data.user.image.url)
          setdata(data.data)
        }
        );
      },[])
    console.log(data)
    console.log(user)

    if(user.role=="User"){
      return (
         <>
         <Navigate to="/error" replace={true} />
         </>
      )
     }


    return (
<>
<Navbar user={user} url={url}></Navbar>
<h3 className='header'>Products</h3>
<div className='table'>
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
<button className="editbtn"><Link to={`/approve/${product._id}`} className="editbtn">Approve</Link></button><br /> <br />
<button className="deletebtn"><Link to={`/reject/${product._id}`} className="deletebtn">Reject</Link></button>

        </td>

      </tr>
      ))}
  
  
</table><br />
</div>
</>

    )
}

export default Products