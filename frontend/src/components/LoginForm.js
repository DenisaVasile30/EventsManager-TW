import { useState, React } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const SERVER = 'http://localhost:8000';

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(true);  
   
  const handleClose = () => {
      setOpen(false); 
      window.location.href = './';
  };      
      
  const handleUserNameInput = (evt) => {
      evt.preventDefault();
      setUserName(evt.target.value);
      console.log(userName);
  };

  const handlePasswordInput = (evt) => {
      evt.preventDefault();
      setPassword(evt.target.value);
      console.log(password);
  };

  async function  doLogin(e) {
    e.preventDefault();
    try {
      console.log(userName+password);
      const response = await fetch(`${SERVER}/login`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({userName: userName, password: password})
        });  
      if (response.status == '401') {
        toast.error('Invalid username or password! If you do not have an account you can create' 
        + ' one with Sign Up option!', {
          position: toast.POSITION.TOP_CENTER
      });
      } else {
        const user = await response.json();
        setUserId(user.id.toString());
        console.log(userId + 'okkkkkkkkkkkk');
        console.log("response::" + response.status);
        toast.success('Login successfully!', {
          position: toast.POSITION.TOP_CENTER
        });
        window.location.href = `/users/${user.id}`;
      }
      if (!response.ok) {
          throw response;
      }        
    } catch(err) {
      console.warn(err);    
    }
  }; 
      
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
             Please enter your credentials.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="UserName"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleUserNameInput(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={ (e) => handlePasswordInput(e)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={doLogin}>Login</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;