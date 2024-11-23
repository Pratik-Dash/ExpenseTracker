import { useContext, useState } from 'react'
import Nav from './Components/Nav'
import './App.css';
import ExpenseCollector from './Components/ExpenseCollector';
import { AppContext, ExpenseContext } from './Context/AppContext';
import {ExpenseList} from './Components/ExpenseList';
import Charts from './Components/Charts';
import Footer from './Components/Footer';



function App() {
  
const context = useContext(ExpenseContext)
if(!context){
  throw new Error("Context undefined")
}
const {expenses} = context

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
    

    {expenses.length>0?<div className="rightPane">
      <Charts/>
    </div>:<></>}
    </div>
    <Footer/>
   </div>
  )
}

export default App
