import React, { ReactElement,useState } from "react"
import ExpenseType from "../Types/ExpenseItem"

interface childrenType{
  children:ReactElement
}
interface ExpenseContextType{
  expenses:ExpenseType[],
  setExpenses:React.Dispatch<React.SetStateAction<ExpenseType[] | []>>
  selected: readonly number[],
  setSelected:React.Dispatch<React.SetStateAction<readonly number[]>>
}

const ExpenseContext = React.createContext<undefined|ExpenseContextType>(undefined)


const AppContext = ({children}:childrenType) => {
  const [expenses, setExpenses] = useState<[]|ExpenseType[]>([]);
  const [selected, setSelected] = useState<readonly number[]>([]);

  return (
    <ExpenseContext.Provider value={{expenses, setExpenses,selected,setSelected}}>
      {children}
    </ExpenseContext.Provider>
  )
}

export {AppContext,ExpenseContext}
