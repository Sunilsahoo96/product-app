import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export function Login(){
  const[email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/home");
    }
  },[navigate])

  const handleLogin = async()=>{
    try {
      const response = await fetch("https://reqres.in/api/login",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
          "x-api-key":"reqres-free-v1"
        },
        body:JSON.stringify({email,password})
      });

      const data = await response.json();

      if(response.ok){
        localStorage.setItem("token", data.token);
        navigate("/home");
      }else{
        alert(data.error || "Login Failed");
      }
    } catch (error) {
      alert("Something went wrong")
    }
  };

  return(
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" className="login-input" placeholder="Enter Email Id" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" className="login-input" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="login-button">Login</button>
    </div>
  )
}