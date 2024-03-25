import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

const TableComponent: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      const pokemonDetails = await Promise.all(data.results.map(async (pokemon: { url: string }) => {
        const pokemonResponse = await fetch(pokemon.url);
        return pokemonResponse.json();
      })) as Pokemon[];
      setPokemonData(pokemonDetails);
      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Number', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'types',
      headerName: 'Types',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.value.map((type: { type: { name: string } }) => (
            <span key={type.type.name}>{type.type.name}</span>
          ))}
        </div>
      ),
    },
    {
      field: 'sprites',
      headerName: 'Photo',
      width: 150,
      renderCell: (params) => (
        <img src={params.value.front_default} alt={params.row.name} style={{ width: 50, height: 50 }} />
      ),
    },
  ];

  return (
    <div style={{ height: 'calc(100vh - 100px)', width: '100%' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={pokemonData}
          columns={columns}
          initialState={{
            pagination: {
                paginationModel: {page:0, pageSize: 20 },
            },
          }}
        />
      )}
    </div>
  );
};

export default TableComponent;
