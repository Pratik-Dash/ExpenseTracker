import { useState } from 'react'
import Nav from './Components/Nav'
import './App.css';
import ExpenseCollector from './Components/ExpenseCollector';
import { AppContext } from './Context/AppContext';
import {ExpenseList} from './Components/ExpenseList';



function App() {
  

  return (
   <div className="main">
    <Nav/>
    <div className="container">
      
    <div className="leftpane">
    
      <ExpenseCollector/>
      <ExpenseList/>
      
    </div>
    

    <div className="rightPane">
      
    </div>
    </div>
    
   </div>
  )
}

export default App
