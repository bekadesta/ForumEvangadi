import React from 'react'
import Header from '../../src/Pages/Header/Header'
import Footer from '../../src/Pages/Footer/Footer'
import classes from "./LayOut.module.css"

function LayOut({children}) {
  return (
    <div>
      <Header />
      {children}
      <Footer className={classes.background} /> 
    </div>
  )
}

export default LayOut
