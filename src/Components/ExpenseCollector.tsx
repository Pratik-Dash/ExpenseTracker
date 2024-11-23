import React, { useContext, useState } from 'react'
import { ExpenseContext } from '../Context/AppContext';
import ExpenseType from '../Types/ExpenseItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Padding } from '@mui/icons-material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from '@mui/material';

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
    
    const [expense, setExpense] = useState<ExpenseType>({id:0,title:"", category:'Select category',amount:0,date:""})
    const context = useContext(ExpenseContext);
    const [open, setOpen] = React.useState(false);
    const [focused,setFocused] = useState<boolean>(false)
    const [error,setError] = useState<boolean>(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    if(!context){
      throw new Error("context undefined");
    }
    const {expenses,setExpenses} = context;
    const handleAmountEntry = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      
      const value = e.target.value;
      if(/^\d+$/.test(value)){
        setExpense({...expense, id:Date.now(), amount:Number(e.target.value)});
        console.log(expense.amount)
      }
      else{
        setExpense({...expense, amount:0});
        console.log(expense.amount)
      }

    }
    const handleExpenseDateEntry = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

      console.log(e.target.value)
      const value = e.target.value;
      setExpense({...expense, date:value});
      
    }
    const clearFields = () => {
      setExpense({id:0,title:"", category:'',amount:0,date:""})
      
    }
    const handleAddExpense = () => {
      
      if(expense.title != "" && expense.date != "" ){
        const updatedExpense:ExpenseType = {...expense,id:Date.now()}
        setExpenses((prev) => [...prev,updatedExpense]);
        clearFields();
        handleClose();
        setError(false)
      }
      else{
        setError(true)
      }
      

    }
    
    const handleCategorySelect = (e:SelectChangeEvent<string>) => {
      setExpense({...expense,category:e.target.value})
    }
  
  return (
    <div>
      <div className="expense-form">
      <div className='modal-container'>
      <Button onClick={handleOpen} variant='outlined' sx={{color:'black', borderColor:'black'}}>Add Expense</Button>
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
          <Typography sx={{ mt: 2, padding:1, display:'flex', flexDirection:'column', boxSizing:'border-box', gap:'.5rem'
           }}>
          <TextField id="outlined-hidden-label-small" label="Expense" variant="outlined" required sx={{padding:0.5, boxSizing:'border-box'}} onChange={(e) => {(setExpense({...expense,title: e.target.value}))}} value={expense.title} error = {error}/>

          <TextField id="outlined-hidden-label-small" label="Amount" value = {expense.amount} variant="outlined" type='text' sx={{padding:0.5, boxSizing:'border-box'}} onChange={(e) => handleAmountEntry(e)} />
            <FormControl>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
           
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={expense.category}label="Category"onChange={(e) => handleCategorySelect(e)}>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
          <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
          </Select>
          </FormControl>

          <TextField id="outlined-hidden-label-small" label="Date" variant="outlined" type={focused?'date':'text'} required sx={{padding:0.5, boxSizing:'border-box'}} onFocus={onFocus} onBlur={onBlur} value={expense.date} onChange={(e)=>handleExpenseDateEntry(e)} error = {error}/>

          <section style={{display:'flex', justifyContent:'center', boxSizing:'border-box', marginTop:'1rem', gap:'.5rem'}}>
          <Button variant="contained" disableElevation onClick={handleAddExpense} sx={{color:'#fff', borderColor:'black', backgroundColor:'black'}}>Add Expense</Button>
          <Button variant="outlined" onClick={clearFields} sx={{color:'black', borderColor:'black'}}>Clear</Button></section>
          </Typography>
        </Box>
      </Modal>
    </div>
      </div>
      
    </div>
  )
}

export default ExpenseCollector
