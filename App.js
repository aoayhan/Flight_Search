import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import dayjs from 'dayjs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import 'dayjs/locale/tr'; // Import the Turkish locale
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import { ToggleButtonGroup } from '@mui/material';
import logo from './navlogo.png'; // Adjust the path as necessary
//import mockAirportData from './mockAirportData.json';
import mockFlightsData from './mockFlightsDatacopy.json'; // adjust the path as necessary
import { Tooltip } from '@mui/material';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'; // For alphabetical sorting
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // For duration sorting
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // For ascending sorting
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // For descending sorting


dayjs.locale('tr');

function App() {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [isOneWay, setIsOneWay] = useState(false);
  const [departureAirportError, setDepartureAirportError] = useState(false);
  const [arrivalAirportError, setArrivalAirportError] = useState(false);
  const [departureDateError, setDepartureDateError] = useState(false);
  const [returnDateError, setReturnDateError] = useState(false);
  const [flights, setFlights] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'departureTime', direction: 'ascending' });
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const sortFlights = (key) => {
    setSortConfig((currentSortConfig) => {
      const direction = currentSortConfig.key === key && currentSortConfig.direction === 'ascending' ? 'descending' : 'ascending';
      const sortedFlights = [...flights].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setFlights(sortedFlights);
      return { key, direction };
    });
  };
  
  const handleSearchClick = () => {
    console.log('Search clicked');
  
    // Reset errors and results
    let isError = false;
    setFlights([]);
  
    // Validate inputs
    if (!departureAirport) {
      setDepartureAirportError(true);
      isError = true;
      console.log('Error: No departure airport selected');
    } else {
      setDepartureAirportError(false);
    }
  
    if (!arrivalAirport) {
      setArrivalAirportError(true);
      isError = true;
      console.log('Error: No arrival airport selected');
    } else {
      setArrivalAirportError(false);
    }
  
    if (!departureDate) {
      setDepartureDateError(true);
      isError = true;
      console.log('Error: No departure date selected');
    } else {
      setDepartureDateError(false);
    }
  
    if (!isOneWay && !returnDate) {
      setReturnDateError(true);
      isError = true;
      console.log('Error: No return date selected');
    } else {
      setReturnDateError(false);
    }
  
    // If there are no errors, filter and set the flights
    if (!isError) {
      console.log('No errors found, proceeding with search');
      console.log('Filters:', {
        departureAirport: departureAirport?.code,
        arrivalAirport: arrivalAirport?.code,
        departureDate: departureDate ? dayjs(departureDate).format('YYYY-MM-DD') : 'N/A',
        returnDate: isOneWay ? 'N/A' : returnDate ? dayjs(returnDate).format('YYYY-MM-DD') : 'N/A',
      });
  
      if (!isError) {
        const outboundFlights = mockFlightsData.filter((flight) => {
          const matchesDepartureAirport = flight.departureAirport.code === departureAirport.code;
          const matchesArrivalAirport = flight.arrivalAirport.code === arrivalAirport.code;
          const matchesDepartureDate = dayjs(departureDate).isSame(dayjs(flight.departureDate), 'day');
          return matchesDepartureAirport && matchesArrivalAirport && matchesDepartureDate;
        });
    
        let returnFlights = [];
        if (!isOneWay) {
          returnFlights = mockFlightsData.filter((flight) => {
            const matchesDepartureAirport = flight.departureAirport.code === arrivalAirport.code;
            const matchesArrivalAirport = flight.arrivalAirport.code === departureAirport.code;
            const matchesReturnDate = dayjs(returnDate).isSame(dayjs(flight.departureDate), 'day');
            return matchesDepartureAirport && matchesArrivalAirport && matchesReturnDate;
          });
        }
    
        const combinedFlights = [...outboundFlights, ...returnFlights];
    
        console.log('Outbound Flights:', outboundFlights);
        console.log('Return Flights:', returnFlights);
        console.log('Combined Flights:', combinedFlights);
        setFlights(combinedFlights);
      }
    };
  };
  const handleSort = (event, newSortKey) => {
    if (newSortKey) {
      setSortConfig((prevSortConfig) => {
        // Determine the new direction
        const newDirection = prevSortConfig.key === newSortKey && prevSortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        
        // Perform the sorting
        const sortedFlights = [...flights].sort((a, b) => {
          if (a[newSortKey] < b[newSortKey]) {
            return newDirection === 'ascending' ? -1 : 1;
          }
          if (a[newSortKey] > b[newSortKey]) {
            return newDirection === 'ascending' ? 1 : -1;
          }
          return 0;
        });
  
        // Update the flights state with the sorted flights
        setFlights(sortedFlights);
  
        // Return the new sort configuration
        return { key: newSortKey, direction: newDirection };
      });
    }
  };
  
  
  const handleDepartureAirportChange = (event, newValue) => {
    setDepartureAirport(newValue);
    setDepartureAirportError(!newValue); // Clear the error if newValue is not null
  };
  const handleArrivalAirportChange = (event, newValue) => {
    setArrivalAirport(newValue);
    setArrivalAirportError(!newValue);
  };
  const handleDepartureDateChange = (newValue) => {
    setDepartureDate(newValue);
    // Check if newValue is truthy. If not, set error.
    setDepartureDateError(newValue ? false : true);
  };
  const handleReturnDateChange = (newValue) => {
    setReturnDate(newValue);
    // Check if newValue is truthy or if it's a one-way trip. If not, set error.
    setReturnDateError(isOneWay || newValue ? false : true);
  };
  
  


  const mockAirports = [
    { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul' },
    { code: 'SAW', name: 'Sabiha Gokcen Airport', city: 'Istanbul' },
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York' },
    { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles' },
    { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo' },
    { code: 'ADB', name: 'Izmir Adnan Menderes Airport', city: 'Izmir' },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt' },
    { code: 'LCY', name: 'London City Airport', city: 'London' },
    { code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen' },
    { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich' },
    { code: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing' },
    { code: 'SVO', name: 'Sheremetyevo International Airport', city: 'Moscow' }
];

  



  // Use this structure for both departure and arrival airport Autocomplete components
const airports = mockAirports.map((airport) => ({
  code: airport.code,
  label: `${airport.name} (${airport.code}), ${airport.city}`
}));

  // and include these handlers in your Autocomplete components
  console.log("this is flights" , flights);

return (
  <div className="App">
    <nav className="navbar">
      <img src={logo} alt="Company Logo" className="logo" />
    </nav>

    {/* Search Box for Airports */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} className="search-box">
        {/* Toggle Button Group for flight type selection */}
        <Grid item xs={12} className="flight-toggle-buttons">
          <ToggleButtonGroup
            exclusive
            value={isOneWay ? 'oneWay' : 'return'}
            onChange={(event, newAlignment) => {
              setIsOneWay(newAlignment === 'oneWay');
              if (newAlignment === 'oneWay') {
                setReturnDate(null); // Clear the return date if "One way" is selected
              }
            }}
            aria-label="flight type"
          >
            <ToggleButton value="oneWay" aria-label="one way">One Way</ToggleButton>
            <ToggleButton value="return" aria-label="return">Return</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* Autocomplete for departure airport */}
        <Grid item xs={3} sm={3}>
          <Autocomplete
            id="departure-airport"
            options={airports}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            renderInput={(params) => (
              <TextField {...params}
                error={departureAirportError}
                helperText={departureAirportError ? 'Please choose a departure airport' : ''}
                label="From"
                variant="filled"
                placeholder="Departure airport"
              />
            )}
            value={departureAirport}
            onChange={handleDepartureAirportChange}
          />
        </Grid>

        {/* Autocomplete for arrival airport */}
        <Grid item xs={3} sm={3}>
          <Autocomplete
            id="arrival-airport"
            options={airports}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            renderInput={(params) => (
              <TextField {...params}
                error={arrivalAirportError}
                helperText={arrivalAirportError ? 'Please choose an arrival airport' : ''}
                label="To"
                variant="filled"
                placeholder="Arrival airport"
              />
            )}
            value={arrivalAirport}
            onChange={handleArrivalAirportChange}
          />
        </Grid>

        {/* DatePicker for departure date */}
        <Grid item xs={3} sm={3}>
          <DatePicker
            label="Departure Date"
            value={departureDate}
            disablePast
            onChange={setDepartureDate}
            format="DD/MM/YYYY"
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>

        {/* DatePicker for return date */}
        <Grid item xs={3} sm={3}>
          <DatePicker
            label="Return Date"
            value={returnDate}
            disablePast
            onChange={setReturnDate}
            format="DD/MM/YYYY"
            renderInput={(params) => <TextField {...params} />}
            disabled={isOneWay}
          />
        </Grid>

        {/* Search Flights Button */}
        <Grid item xs={3} sm={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" className="search-button" onClick={handleSearchClick}>
              Search Flights
            </Button>
          </Grid>

          {/* Sorting Buttons */}
          <ToggleButtonGroup exclusive onChange={handleSort} aria-label="text sorting" style={{ marginBottom: '20px' }}>
            <Tooltip title="Sort by price" placement="top">
              <ToggleButton value="price" aria-label="sort by price">
                <SortByAlphaIcon />
                &nbsp; Price
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Sort by flight length" placement="top">
              <ToggleButton value="duration" aria-label="sort by flight length">
                <AccessTimeIcon />
                &nbsp; Flight Length
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Sort by departure time" placement="top">
              <ToggleButton value="departureTime" aria-label="sort by departure time">
                <ArrowUpwardIcon />
                &nbsp; Departure Time
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Sort by arrival time" placement="top">
              <ToggleButton value="arrivalTime" aria-label="sort by arrival time">
                <ArrowDownwardIcon />
                &nbsp; Arrival Time
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>

        {/* Flights List */}
    {/* This should be placed right after the sorting buttons grid */}
    <List sx={{ width: '100%', bgcolor: 'rgba(255, 255, 255, 0.3)',borderRadius: '16px',overflow: 'hidden' }}>
      {flights.map((flight, index) => (
        <React.Fragment key={flight.id}>
          <ListItem alignItems="flex-start" key={flight.id} disablePadding>
            <Paper elevation={2} sx={{ width: '100%', padding: 2, margin: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '16px'}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    {flight.airline} - Flight {flight.id}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography variant="body2" color="textSecondary">
                    <FlightTakeoffIcon /> Departure: {dayjs(flight.departureDate).format('DD/MM/YYYY')} {flight.departureTime}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <FlightLandIcon /> Arrival: {dayjs(flight.arrivalDate).format('DD/MM/YYYY')} {flight.arrivalTime}
                  </Typography>
                  <Typography variant="body2">
                    Duration: {flight.duration} hours
                  </Typography>
                  <Typography variant="body2">
                    Price: ${flight.price}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </ListItem>
          {index < flights.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
        </Grid>
      </LocalizationProvider>

  </div>
);
}

export default App;