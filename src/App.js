import { useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';
import { TodoCard } from './components/todocard/TodoCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
function App() {
  const [toDos, setToDos] = useState([])// need to ste array so that push funtion can work
  const [newCardData,setNewCardData]=useState({
    newTitle:"",
    newDescription:""
  });

  useEffect(()=>{
      let data = localStorage.getItem("data")
      if(data){
        setToDos(JSON.parse(data))
      }
  },[])
  //Handles the event when add btn is clicked
  const addHandler =()=>{
    let newTodo = {  //making a new todo object
      id: Math.random(),
      title: newCardData.newTitle,
      description:newCardData.newDescription,
      color:"",
      isCompleted: false,
      isDeleted: false,
      time:Math.floor(Date.now()/1000),
  }

  if(newCardData.newTitle.length == 0 || newCardData.newDescription.length == 0  )
  {
    toast('Cannot be empty', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  else
  {
    toDos.push(newTodo) //adding new object in state
    setToDos([...toDos]) // updating state
    localStorage.setItem("data",JSON.stringify(toDos)) // Updating Local Storage with state
  }

  }
  //Handles The Event when complete btn is clicked
  const completeHandler =(id)=>{
    const todo = toDos.find(e => e.id === id); // finds the element with id 
    todo.isCompleted = true // changes are made which are reflected automatically
    setToDos([...toDos]) //updating the current state
    localStorage.setItem("data",JSON.stringify(toDos)) //updating local storage with state
  }

  //Hanldes the event when clicked on delete btn
  const deleteHandler =(id)=>{
    const todo = toDos.find(e => e.id === id); // Finds the element  by id
    todo.isDeleted = true // Changes are made 
    setToDos([...toDos])// updating the state
    localStorage.setItem("data",JSON.stringify(toDos)) // Updating Local Storage with state
  }
    //Handles The Event when color is changed
    const UpdateColor = (id, color) => { 
      const todo = toDos.find(e => e.id === id); // finds the element with id 
      todo.color = color // changes are made which are reflected automatically
      setToDos([...toDos]) //updating the current state
      localStorage.setItem("data", JSON.stringify(toDos)) //updating local storage with state
    }
  return (
    <div className='main-container'>
    <ToastContainer/>
   
      <div className='input-container'>
      <Typography gutterBottom variant="h5" component="div" style={{display:'flex',alignItems:"center",justifyContent:'center',marginTop:"20px"}}>Todo App</Typography>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Enter title" variant="outlined"  onChange={(e)=>setNewCardData(newCardData=>({...newCardData,newTitle:e.target.value}))}/>
          <TextField id="outlined-basic"  label="Enter description" variant="outlined"  onChange={(e)=>setNewCardData(newCardData=>({...newCardData,newDescription:e.target.value}))}/>
        </Box>
        <Button variant="outlined" onClick={addHandler}  style={{color:"#7DB9B6",fontWeight:"bolder",width:"100px",marginTop:"15px"}}>Add</Button>
      </div>
      <div className='output-container'>
        <div className='card-container'>
          <h4>Pending</h4>
          <div className='card-list'>
            {toDos.sort((a,b) => a.time < b.time ? 1 : -1)
              .map((e) => {
                if(!e.isCompleted) {
                  return(
                  <div>
                    {!e.isDeleted && 
                      <TodoCard key={e.id} title={e.title} id={e.id} complete={completeHandler} updateColor={UpdateColor} color={e.color} isCompleted={e.isCompleted} delete={deleteHandler} description={e.description}/>}
                    </div>
                    )
                } else {
                  return <></>
                }
              })
              
            }
          </div>
        </div>
        <div className='card-container'>
          <h4>Completed</h4>
          <div className='card-list'>
          {
            toDos?.map((e) => {
                if(e.isCompleted) {
                  return (!e.isDeleted && <TodoCard key={e.id} id={e.id} description={e.description} title={e.title} isCompleted={e.isCompleted} delete={deleteHandler} updateColor={UpdateColor} color={e.color}/>)
                } else {
                  return <></>
                }
              })
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
