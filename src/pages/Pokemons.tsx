import Table from "../components/Table";
import Paper from "@mui/material/Paper";

function Pokemons() {
  return (
    <Paper style={{ height: "calc(100vh - 100px)", marginTop: "50px" }}>
      <Table />
    </Paper>
  );
}

export default Pokemons;
