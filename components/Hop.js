
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Scale from '@mui/icons-material/Scale';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Input = styled(MuiInput)`
  width: 42px;
`;

const MenuItem2 = styled(MenuItem)`
  display: block !important;
`;

  const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;
  
  const InputWrapper = styled('div')(
    ({ theme }) => `
    width: 300px;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    border-radius: 4px;
    padding: 1px;
    display: flex;
    flex-wrap: wrap;
  
    &:hover {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    }
  
    &.focused {
      border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
  
    & input {
      background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
      color: ${
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
      };
      height: 30px;
      box-sizing: border-box;
      padding: 4px 6px;
      width: 0;
      min-width: 30px;
      flex-grow: 1;
      border: 0;
      margin: 0;
      outline: 0;
    }
  `,
  );
  
  
  function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
      <div {...other}>
        <span>{label}</span>
        <CloseIcon onClick={onDelete} />
      </div>
    );
  }
  
  Tag.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
  };


export default function Hop(props) {

      const [weight, setValue] = React.useState(30);

      const handleSliderChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
      };
    
      const handleBlur = () => {
        if (weight < 0) {
          setValue(0);
        } else if (weight > 100) {
          setValue(100);
        }
      };
    
      const [usage, setUsage] = React.useState('');

    const handleUsageChange = (event) => {
        setUsage(event.target.value);
    };
      return (
        <>
        <h2>{props.option.label} </h2>
        <p>{props.option.description}</p>
        <p>Alpha Acid{props.option.aa}</p>
        <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Scale />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof weight === 'number' ? weight : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={weight}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Usage</InputLabel>
          <Select
          labelId="Hop Usage"
          id="hop-usage-select"
          value={usage}
          label="Hop Usage"
          onChange={handleUsageChange}>
          <MenuItem2 value='boil'>Boil</MenuItem2>
          <MenuItem2 value='hopStand'>Hop Stand</MenuItem2>
          <MenuItem2 value='dryHop'>Dry Hop</MenuItem2>
          </Select>
      </FormControl>
      </Box>
      </>
      );
}
