import { useEffect, useState } from "react"
import { Navigate,Link } from "react-router-dom";
import './login.css'


function Resister() {
  const [names, Changname] = useState(null);
  const [emails, Changemail] = useState(null);
  const [passwords, Changpassword] = useState(null);

  const [success, Changsuccess] = useState(null);

  const name = (e) => {
    const selectedFile = e.target.value;
    Changname(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };
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

    fetch('http://localhost:3001/resister', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": names,
        "emailid": emails,
        "password": passwords
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data.success)
        Changsuccess(data.success)
        if (data.success) {
          console.log("welcome")
          alert(data.message)


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
      {success == true ? <Navigate to="/" replace={true} /> : <form onSubmit={handleSubmit} className="login">
      <h3 className="revive">ReviveMart - <b className="logtitle">Register</b></h3>

        <input type="text" name='emailid' className="log" onChange={name} placeholder="enter name" required /><br />
        <input type="email" name='emailid' className="log" onChange={emailid} placeholder="enter emailid" required/><br />
        <input type="password" name='password' className="log" onChange={password} placeholder="enter password" required /><br />
        <button type="submit" className="logbtn">Register</button><br />
        <Link to={"/"} className="loglink">Have already an account?login</Link><br />

      </form>}
      </div>


    </>
  )
}

export default Resister