import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function Yeast(props) {
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.setStepValidator();
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.name}
        id="yeast-autocomplete"
        options={props.data}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
      <b>{`Yeast: ${inputValue}`}</b>

      <div>{`Description: ${(value !== undefined && value.description !== undefined) ? `${value.description}` : 'null'}`}</div>
      <br />
    </div>
  );
}
