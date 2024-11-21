import React, { ReactElement,useState } from "react"

interface expenseItem {
  id:number,
  title:string,
  amount:number,
  date:string

}
interface childrenType{
  children:ReactElement
}
interface ExpenseContextType{
  expenses:expenseItem[],
  setExpenses:React.Dispatch<React.SetStateAction<expenseItem[] | []>>
}

const ExpenseContext = React.createContext<undefined|ExpenseContextType>(undefined)

const AppContext = ({children}:childrenType) => {
  const [expenses, setExpenses] = useState<[]|expenseItem[]>([]);
  return (
    <ExpenseContext.Provider value={{expenses, setExpenses}}>
      {children}
    </ExpenseContext.Provider>
  )
}

export {AppContext,ExpenseContext}
