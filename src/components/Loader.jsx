import React from 'react'
import { BiLoaderCircle } from "react-icons/bi";

function Loader() {
  return (
    <div className="flex justify-center h-screen  w-full "><BiLoaderCircle className="loader-icon"  /></div>
  )
}

export default Loader