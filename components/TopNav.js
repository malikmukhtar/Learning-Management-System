import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
    AppstoreOutlined,
    CoffeeOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
  } from "@ant-design/icons";
  import { Context } from "../context";
  import axios from "axios";
import { toast } from "react-toastify";
import {useRouter} from 'next/router';


const { Item, SubMenu, ItemGroup } = Menu;


const TopNav = () => {
  const [current, setCurrent] = useState("")
  
  const {state, dispatch}= useContext(Context)

  const {user} = state;
  
  const router = useRouter()

  useEffect(()=>{
    process.browser && setCurrent(window.location.pathname)
  },[process.browser && window.location.pathname])

  const logout =async ()=>{
    dispatch({
      type:'LOGOUT'
    })
    window.localStorage.removeItem('user')
    const {data} = await axios.get('/api/logout')
    toast(data.message)
    router.push('/login')
  }
 
  return (
    <Menu mode="horizontal" selectedKeys={[current]} >
      <Item key='/' onClick={e=>setCurrent(e.key)} icon={<AppstoreOutlined/>}>
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>
      {user === null && (
        <>
        <Item key='/login' onClick={e=>setCurrent(e.key)} icon={<LoginOutlined/>}>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Item>
      <Item icon={<UserAddOutlined/>}>
        <Link key='/register' onClick={e=>setCurrent(e.key)} href="/register" >
          <a>Register</a>
        </Link>
      </Item>
        </>
      )}

      {user !== null && (
        <SubMenu icon={<CoffeeOutlined/>} title={user && user.name} className='ml-auto'>
         <ItemGroup>
           <Item key='/user'>
        <Link href='/user'>
          <a>Dashboard</a>
        </Link>
           </Item>
         <Item onClick={logout}  className="ml-auto">
        Logout
      </Item>
         </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
