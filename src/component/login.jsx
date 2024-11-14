import { useEffect, useState } from "react"
import { Navigate,Link } from "react-router-dom";
import './login.css'


function Login() {
  const [emails, Changemail] = useState(null);
  const [passwords, Changpassword] = useState(null);
  const [success, Changsuccess] = useState(null);


  const emailid = (e) => {
    const selectedFile = e.target.value;
    Changemail(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };
  const password = (e) => {
    const selectedFile = e.target.value;
    Changpassword(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "emailid": emails,
        "password": passwords
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data.success, data.token)
        Changsuccess(data.success)
        if (data.success) {
          localStorage.setItem("token", data.token);
          console.log("welcome")
          alert("welcome to revivemart")
          

        }
        else {
          console.log(data)
          alert(data.error)
        }

      }
      );




  }
  return (
    <>
    <div className="body">
    {success==true?<Navigate to="/home" replace={true} />:<form onSubmit={handleSubmit} className="login">
      <h3 className="revive">ReviveMart - <b className="logtitle">Login</b></h3>
        <input type="email" className="log" name='emailid' placeholder="ENTER EMAIL" onChange={emailid} required/><br />
        <input type="password" className="log"  name='password' placeholder="ENTER PASSWORD" onChange={password} required /><br />
        <br /><br />
        <button type="submit" className="logbtn">Login</button><br />
        <Link to={"/resister"} >Register</Link><br />

      </form>}
      </div>    

      
    </>
  )
}

export default Login