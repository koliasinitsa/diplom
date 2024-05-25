import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Grid, TextField, } from '@mui/material';

interface CarFilterComponentProps {
  onFiltersChange: (
    filters: {
      brand: string;
      bodyType: string;
      transmission: string;
      typeEngine: string;
      minPrice: number;
      maxPrice: number;
    }
  ) => void;
}



const CarFilterComponent: React.FC<CarFilterComponentProps> = ({ onFiltersChange }) => {
  const [brand, setBrand] = useState('');
  const [transmission, setTransmission] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [typeEngine, setTypeEngine] = useState('');
  const [minPrice, setMinPrice] = useState<number | string>(0);
  const [maxPrice, setMaxPrice] = useState<number | string>(5000);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFiltersChange({
      brand,
      transmission,
      bodyType,
      typeEngine,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    });
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setMinPrice(min.toString());
    setMaxPrice(max.toString());
  };

  return (
    <form onSubmit={handleFormSubmit} className="car-filter-form">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="brand-select-label">Brand</InputLabel>
            <Select
              labelId="brand-select-label"
              id="brand-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value as string)}
              label="Brand"
            >
              <MenuItem value="">Select Brand</MenuItem>
              <MenuItem value="Audi">Audi</MenuItem>
              <MenuItem value="BMW">BMW</MenuItem>
              <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
              <MenuItem value="Lexus">Lexus</MenuItem>
              <MenuItem value="Jaguar">Jaguar</MenuItem>
              <MenuItem value="Porsche">Porsche</MenuItem>
              <MenuItem value="Tesla">Tesla</MenuItem>
              <MenuItem value="Land Rover">Land Rover</MenuItem>
              <MenuItem value="Maserati">Maserati</MenuItem>
              <MenuItem value="Ferrari">Ferrari</MenuItem>
              <MenuItem value="Lamborghini">Lamborghini</MenuItem>
              <MenuItem value="Bentley">Bentley</MenuItem>
              <MenuItem value="Rolls-Royce">Rolls-Royce</MenuItem>
              <MenuItem value="Aston Martin">Aston Martin</MenuItem>
              <MenuItem value="McLaren">McLaren</MenuItem>
              <MenuItem value="Cadillac">Cadillac</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="transmission-select-label">Transmission</InputLabel>
            <Select
              labelId="transmission-select-label"
              id="transmission-select"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value as string)}
              label="Transmission"
            >
              <MenuItem value="">Transmission</MenuItem>
              <MenuItem value="Автомат">Автомат</MenuItem>
              <MenuItem value="Механика">Механика</MenuItem>
              <MenuItem value="Робот">Робот</MenuItem>
              <MenuItem value="Вариатор">Вариатор</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="body-type-select-label">Type</InputLabel>
            <Select
              labelId="body-type-select-label"
              id="body-type-select"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value as string)}
              label="Type"
            >
              <MenuItem value="">Type</MenuItem>
              <MenuItem value="Внедорожник">Внедорожник</MenuItem>
              <MenuItem value="кабриолет">кабриолет</MenuItem>
              <MenuItem value="купе">купе</MenuItem>
              <MenuItem value="микроавтобус">микроавтобус</MenuItem>
              <MenuItem value="лифтбек">лифтбек</MenuItem>
              <MenuItem value="минивэн">минивэн</MenuItem>
              <MenuItem value="седан">седан</MenuItem>
              <MenuItem value="спорт">спорт</MenuItem>
              <MenuItem value="универсал">универсал</MenuItem>
              <MenuItem value="хэтчбэк 3дв">хэтчбэк 3 дв</MenuItem>
              <MenuItem value="хэтчбэк 5дв">хэтчбэк 5 дв</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="engine-type-select-label">Type Engine</InputLabel>
            <Select
              labelId="engine-type-select-label"
              id="engine-type-select"
              value={typeEngine}
              onChange={(e) => setTypeEngine(e.target.value as string)}
              label="TypeEngine"
            >
              <MenuItem value="">type Engine</MenuItem>
              <MenuItem value="Бензин">Бензин</MenuItem>
              <MenuItem value="Бензин(метан)">Бензин(метан)</MenuItem>
              <MenuItem value="Бензин(гибрид)">Бензин(гибрид)</MenuItem>
              <MenuItem value="Бензин(гибрид)">Бензин(гибрид)</MenuItem>
              <MenuItem value="Дизель">Дизель</MenuItem>
              <MenuItem value="Дизель(гибрид)">Дизель(гибрид)</MenuItem>
              <MenuItem value="Электро">Электро</MenuItem>

            </Select>
          </FormControl>
        </Grid>
        {/* <Typography variant="h6" gutterBottom>
            Cost per day
          </Typography> */}

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Grid>

        {/* <Grid item xs={12}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
            />
          </Grid> */}


        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CarFilterComponent;
