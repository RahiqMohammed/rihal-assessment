import './App.css';
import  Container  from './components/Container';
import  Table  from './components/Table';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div className="App">
     <Container>
      <Paper style={{height: 'calc(100vh - 100px)', marginTop: '50px'}} >
        <Table/>
      </Paper>

     </Container>
    </div>
  );
}

export default App;
