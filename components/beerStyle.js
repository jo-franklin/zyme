
import * as React from 'react';

import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function BeerStyle(props) {
    const [beerStyleValue, setBeerStyleValue] = React.useState();

    const handleChange = (event) => {
      props.setStepValidator()
      props.addStyle(event.target.value, props.isSubStyle)
    }

      return (
        <>
        <FormControl>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={beerStyleValue}
        onChange={(e) => {handleChange(e)}}
        >
        {props.options.map(({ name, id })=><div><FormControlLabel value={name} key={id.toString()} control={<Radio />} label={name} /></div>)}
        </RadioGroup>                        
    </FormControl>
      </>
      );
}
