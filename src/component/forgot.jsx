import { useEffect, useState } from "react"
import { Navigate,Link } from "react-router-dom";
import './login.css'


function Forgot() {
  const [emails, Changemail] = useState(null);
  const [success, Changsuccess] = useState(null);
  const [otps, Changotps] = useState(null);
  const [pass, setpass] = useState("");


  const emailid = (e) => {
    const selectedFile = e.target.value;
    Changemail(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };
  const otp = (e) => {
    const selectedFile = e.target.value;
    Changotps(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };
  const password = (e) => {
    const selectedFile = e.target.value;
    setpass(selectedFile)
    console.log("Selected file:", selectedFile); // Debug: check if the file is selected
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "emailid": emails,
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data.success)
        Changsuccess(data.success)
        console.log(data.email)
        Changemail(data.email)
        if (data.success) {
          alert("otp is sent in your email address please fill otp in 50 seconds")
          }
        else {
          console.log(data)
          alert(data.error)
        }

      }
      );




  }
  const handleverify = async (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "emailid": emails,
        "otp":otps
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data.success)
        Changsuccess(data.success)
        console.log(data.email)
        Changemail(data.email)
        if (data.success) {
            alert("change password");
            Changsuccess("verify");
            Changemail(data.email);
          }
        else {
          console.log(data);
          Changsuccess(null);
          Changemail("");
         alert("otp is invalid")
          
        }

      }
      );
}
//change password
const chagepassword = async (e) => {
  e.preventDefault();

  fetch('http://localhost:3001/forgot/password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "emailid": emails,
      "password":pass
    })
  })
    .then(res => res.json())
    .then((data) => {
      console.log(data.success)
      Changsuccess(data.success)
      if (data.success) {
          alert(data.message);
          Changsuccess("completed");
        }
      else {
        console.log(data);
        alert(data.message)
        Changsuccess(null);
        Changemail("");
        
      }

    }
    );
}
  return (
    <>
      <div className="body">
        {(() => {
          switch (success) {
            case "verify":
              return (
                <form onSubmit={chagepassword} className="login">
                  <h3 className="revive">
                    ReviveMart - <b className="logtitle">CHANGE-PASSWORD</b>
                  </h3>
                   <input
                    type="password"
                    className="log"
                    name="password"
                    value={pass}
                    placeholder="ENTER PASSWORD"
                    onChange={password}
                    required
                  />
                  <br />
                  <br />
                  <button type="submit" className="logbtn">
                    CHANGE
                  </button>
                  <br />
                </form>
              );
              case "completed":
                return (
                 <Navigate to="/" replace={true} />
                );
            case true:
              return (
                <form onSubmit={handleverify} className="login">
                  <h3 className="revive">
                    ReviveMart - <b className="logtitle">VERIFY-OTP</b>
                  </h3>
                  <input
                    type="email"
                    className="log"
                    name="emailid"
                    value={emails}
                    placeholder="ENTER EMAIL"
                    onChange={emailid}
                    required
                  />
                  <br />
                  <input
                    type="text"
                    className="log"
                    name="otp"
                    placeholder="ENTER OTP"
                    onChange={otp}
                    required
                  />
                  <br />
                  <br />
                  <button type="submit" className="logbtn">
                    VERIFY-OTP
                  </button>
                  <br />
                </form>
              );
            case null:
              return (
                <form onSubmit={handleSubmit} className="login">
                  <h3 className="revive">
                    ReviveMart - <b className="logtitle">SEND-OTP</b>
                  </h3>
                  <input
                    type="email"
                    className="log"
                    name="emailid"
                    value={emails}
                    placeholder="ENTER EMAIL"
                    onChange={emailid}
                    required
                  />
                  <br />
                  <br />
                  <button type="submit" className="logbtn">
                    SEND-OTP
                  </button>
                  <br />
                </form>
              );
            default:
              return null;
          }
        })()}
      </div>
    </>
  );
  
}

export default Forgot