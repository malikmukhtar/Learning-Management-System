import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for secret code!!!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword =async (e) =>{
      e.preventDefault();
     
      try {
          setLoading(true)
          const {data} = await axios.post('/api/reset-password', {
              email, code, newPassword
          })
          setEmail('')
          setCode('')
          setNewPassword('')
          setLoading(false)
          toast('Now you can log in with your new Password')
          router.push("/login")
      } catch (err) {
          console.log(err)
          setLoading(false)
          toast(err.response.data)
      }
  }

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Forgot Password
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input 
          type="email"
           className="form-control mb-4 p-4"
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter email'
            required
          />
          {success &&(
              <>
              <input 
          type="text"
           className="form-control mb-4 p-4"
            value={code} 
            onChange={(e)=>setCode(e.target.value)}
            placeholder='Enter secret code'
            required
          />
          <input 
          type="password"
           className="form-control mb-4 p-4"
            value={newPassword} 
            onChange={(e)=>setNewPassword(e.target.value)}
            placeholder='Enter New Password'
            required
          />
              
              </>
          )}
          <button className="btn btn-primary btn-block p-2" disabled={loading || !email}>
              {loading ? <SyncOutlined spin/> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword
