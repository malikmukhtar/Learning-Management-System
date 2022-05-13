import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCards";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";
import NavBar from "../components/Header/NavBar";

const Index = ({courses})=>{

  // const [ courses, setCourses] = useState([])

  // useEffect(()=>{

  //   const fetchCourses = async () => {
  //     const {data} = await axios.get('/api/courses')
  //     setCourses(data)
  //   }
  //   fetchCourses()
  // }, [])
  return(
    <>
    <NavBar/>
    <Header/>
    <h1 className="jumbotron text-center bg-primary square">Dynamic International Academy Online Learning </h1>
    <div className="container-fluid">
      <div className="row">
       {courses.map(course => (
          <div key={course._id} className="col-md-4">
              <CourseCard course={course}/>
          </div>
       ))}
      </div>
    </div>
    <Footer/>
    </>
  )
}

export async function getServerSideProps() {
  const {data} = await axios.get(`${process.env.API}/courses`)

  return {
    props: {
      courses: data
    }
  }
}

export default Index;