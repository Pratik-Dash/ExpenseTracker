import { useState } from 'react'
import Nav from './Components/Nav'
import './App.css';
import ExpenseCollector from './Components/ExpenseCollector';
import { AppContext } from './Context/AppContext';
import {ExpenseList} from './Components/ExpenseList';
import Charts from './Components/Charts';



function App() {
  

  return (
   <div className="main">
    <Nav/>
    <div className="container">
      
    <div className="leftpane">
    
      <ExpenseCollector/>
      <div className="expense-list">
      <ExpenseList/>
      </div>
      
      
    </div>
    

    <div className="rightPane">
      <Charts/>
    </div>
    </div>
    
   </div>
  )
}

export default App
