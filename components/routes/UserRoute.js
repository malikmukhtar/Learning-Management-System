import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {useRouter} from 'next/router'
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({children}) => {
  const [ok, setOK] = useState(false);

  const router = useRouter()

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if(data.ok) setOK(true);
    } catch (err) {
      console.log(err);
      setOK(false);
      router.push('/login')
    }
  };

  return <>{!ok ? <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/> : <>{children}</>}</>
};

export default UserRoute;
