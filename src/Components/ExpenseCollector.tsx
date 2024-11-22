import React, { useContext, useState } from 'react'
import { ExpenseContext } from '../Context/AppContext';
import ExpenseType from '../Types/ExpenseItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Padding } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ExpenseCollector = () => {
    
    const [expense, setExpense] = useState<ExpenseType>({id:0,title:"",amount:0,date:""})
    const context = useContext(ExpenseContext);
    const [open, setOpen] = React.useState(false);
    const [focused,setFocused] = useState<boolean>(false)
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      
      const updatedExpense:ExpenseType = {...expense,id:Date.now()}
      setExpenses((prev) => [...prev,updatedExpense]);
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
      <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4" sx={{textAlign:'center', fontWeight:500}}>
            Add Expense
          </Typography>
          <Typography sx={{ mt: 2, padding:1, display:'flex', flexDirection:'column', boxSizing:'border-box'
           }}>
          <TextField id="outlined-hidden-label-small" label="Expense" variant="outlined" required sx={{padding:0.5, boxSizing:'border-box'}} 
          
          />
          <TextField id="outlined-hidden-label-small" label="Amount" variant="outlined" type='number' sx={{padding:0.5, boxSizing:'border-box'}} />
          <TextField id="outlined-hidden-label-small" label="Date" variant="outlined" type={focused?'date':'text'} required sx={{padding:0.5, boxSizing:'border-box'}} onFocus={onFocus} onBlur={onBlur}/>

          <section style={{display:'flex', justifyContent:'center', boxSizing:'border-box', marginTop:'1rem', gap:'.5rem'}}>
          <Button variant="contained" disableElevation>Add Expense</Button>
          <Button variant="outlined">Cancel</Button></section>


          </Typography>
          
          
          
        </Box>
      </Modal>
    </div>
    </div>
  )
}

export default ExpenseCollector
