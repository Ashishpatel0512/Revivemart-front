import { useEffect,useState } from "react";
import { useParams,Link,Navigate } from "react-router-dom"
import Navbar from "./Navbar";

function Users(){

    // let {productid,productuserid}=useParams();
    // console.log(productid,productuserid)
    const [data,setdata]=useState([]);
    const [user,setuser]=useState([]);
    const [url,seturl]=useState([]);


    useEffect(()=>{
        fetch(`http://localhost:3001/userdata`,{
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
<h3 className='header'>Users</h3>
<div className='table'>
<table>
  <tr>
            <th scope="col">user</th>
            <th scope="col">name</th>
           <th scope="col">emailid</th>
            <th scope="col">status</th>
            <th scope="col">Action</th>

  </tr>
  
  {data.reverse().map((data) => (
        <tr>
       <th scope="row"><img src={data.image.url} alt=""  height="30px" width="30px"/></th>
              <td>{data.name}</td>
              <td>{data.emailid}</td>
              <td>{data.status}</td>
              <td>
                <button className="deletebtn"><Link to={`/block/${data._id}/` } className="deletebtn">Block</Link></button>&nbsp; &nbsp;
                <button className="deletebtn"><Link to={`/unblock/${data._id}/` } className="deletebtn">Unlock</Link></button>
            </td>
\
      </tr>
      ))}
  
  
</table><br />
</div>
</>

    )
}

export default Users