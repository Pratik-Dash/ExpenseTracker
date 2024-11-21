import React, { ReactElement,useState } from "react"
import ExpenseType from "../Types/ExpenseItem"

interface childrenType{
  children:ReactElement
}
interface ExpenseContextType{
  expenses:ExpenseType[],
  setExpenses:React.Dispatch<React.SetStateAction<ExpenseType[] | []>>
}

const ExpenseContext = React.createContext<undefined|ExpenseContextType>(undefined)

const AppContext = ({children}:childrenType) => {
  const [expenses, setExpenses] = useState<[]|ExpenseType[]>([]);
  return (
    <ExpenseContext.Provider value={{expenses, setExpenses}}>
      {children}
    </ExpenseContext.Provider>
  )
}

export {AppContext,ExpenseContext}
