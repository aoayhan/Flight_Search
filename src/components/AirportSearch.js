import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState, React } from 'react';
import { searchAirports } from '../services/mockApi';
import { useEffect } from 'react';
function AirportSearch() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let active = true;

    if (searchTerm === '') {
      setOptions([]);
      return undefined;
    }

    searchAirports(searchTerm).then((results) => {
      if (active) {
        setOptions(results);
      }
    });

    return () => {
      active = false;
    };
  }, [searchTerm]);

  return (
    <Autocomplete
      id="airport-search"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => `${option.name} (${option.code}) - ${option.city}`}
      options={options}
      loading={open && options.length === 0}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Airports"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default AirportSearch;