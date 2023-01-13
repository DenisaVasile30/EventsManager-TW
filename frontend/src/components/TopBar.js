import { AppBar, Toolbar, Button } from "@mui/material"


function TopBar() {    
  return (
    <AppBar position="static">
      <Toolbar>
        <Button variant="Login" onClick={() => {
          window.location.href = '/login'
        }}>Login</Button>
        <Button variant="SignUp" onClick={() =>
          window.location.href = '/register'}>Sign Up</Button>
        <Button variant="SignOut" onClick={() =>
        window.location.href = '/login'}>Sign Out</Button>
      </Toolbar>
    </AppBar>
  );
}  
export default TopBar