import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  stats: { base_stat: number; name: string }[];
}

const TableComponent: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
          params: {
            offset: 0,
            limit: 20,
          },
        });
        const data = response.data;
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return pokemonResponse.data as Pokemon;
          })
        );
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Number", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "types",
      headerName: "Types",
      width: 100,
      renderCell: (params) => (
        <div>
          {params.value.map((type: { type: { name: string } }) => (
            <span key={type.type.name}>{type.type.name}</span>
          ))}
        </div>
      ),
    },
    {
      field: "stats",
      headerName: "Stats",
      width: 500,
      renderCell: (params) => (
        <div>
          {params.value.map(
            (st: { base_stat: number; stat: { name: string } }) => (
              <span key={st.stat.name}>
                {`${st.stat.name.charAt(0).toUpperCase()}${st.stat.name.slice(
                  1
                )}: ${st.base_stat} `}
              </span>
            )
          )}
        </div>
      ),
    },
    {
      field: "sprites",
      headerName: "Photo",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value.front_default}
          alt={params.row.name}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
  ];

  const handlePageChange = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          offset: page * 20,
          limit: 20,
        },
      });
      const data = response.data;
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data as Pokemon;
        })
      );
      setPokemonData(pokemonDetails);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "calc(100vh - 100px)", width: "100%" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={pokemonData}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowCount={pokemonData.length}
        />
      )}
    </div>
  );
};

export default TableComponent;
