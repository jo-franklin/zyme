import React from 'react';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    slider: {
      width: '580px'
    }
  })
  
export default function Fermentable(props) {
    const [checked, setChecked] = React.useState(false);
    const [sliderValue, setSliderValue] = React.useState();
    const classes = useStyles();

    const handleChange = (event) => {
        setChecked(event.target.checked);
        const val = event.target.checked ? sliderValue : 0;
        const data = event.target.checked ? props.data : {};
        props.handleFermentTotalPercentage(val, props.index, props.count, data);
        props.addFermentable(data, sliderValue);

    };  

    const handleSliderChange = (event) => {
      setSliderValue(event.target.value);
      props.handleFermentTotalPercentage(event.target.value, props.index, props.count, props.data);
      props.addFermentable(props.data, sliderValue);
    }
    return (
      <div>
      <Slider
      className={classes.slider}
      disabled={!checked}
      aria-label="Always visible"
      value={sliderValue}
      defaultValue={props.data.average}
      marks={props.data.marks}
      step={null}
      valueLabelDisplay="on"
      onChange={handleSliderChange}
  />

  <Checkbox checked={checked} aria-label={props.data.name} onChange={handleChange} />
      </div>
    );
}
