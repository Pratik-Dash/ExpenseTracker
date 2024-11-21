import React, { useContext, useState } from 'react'
import { ExpenseContext } from '../Context/AppContext';
import ExpenseType from '../Types/ExpenseItem';
const ExpenseCollector = () => {
    
    const [expense, setExpense] = useState<ExpenseType>({id:0,title:"",amount:0,date:""})
    const context = useContext(ExpenseContext);
    if(!context){
      throw new Error("context undefined");
    }
    const {expenses,setExpenses} = context;
    const handleAmountEntry = (e:React.ChangeEvent<HTMLInputElement>) => {

      const value = e.target.value;
      if(/^\d+$/.test(value)){
        setExpense({...expense, id:Date.now(), amount:Number(e.target.value)});
      }
      else{
        setExpense({...expense, amount:0});
      }

    }
    const handleExpenseDateEntry = (e: React.ChangeEvent<HTMLInputElement>) => {

      console.log(e.target.value)
      const value = e.target.value;
      setExpense({...expense, date:value});
      
    }
    const clearFields = () => {
      setExpense({id:0,title:"",amount:0,date:""})
    }
    const handleAddExpense = () => {
      setExpense((prev) => ({...prev, id:Date.now()}));
      setExpenses([...expenses,expense]);
      clearFields();

    }
    console.log(expenses)
  
  return (
    <div>
      <div className="expense-form">
        <span className='expenseHeader'>Add Expense</span>
        <input type="text" className="expenseTitle" value = {expense.title} onChange={(e) => setExpense({...expense,title: e.target.value})} placeholder='Expense' />
        <input type="text" className="expenseAmount" value={expense.amount} onChange={(e) => handleAmountEntry(e)} placeholder='Amount'/>
        <input type="date" className="expenseDate" placeholder='date' value={expense.date} onChange={(e)=>handleExpenseDateEntry(e)} />
        <div className="button-container">
          <button className="add-btn" onClick={handleAddExpense}>Add Expense</button>
          <button className="add-btn" onClick={clearFields}>Clear</button>
          </div>
      </div>
    </div>
  )
}

export default ExpenseCollector
