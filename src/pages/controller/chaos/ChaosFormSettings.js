import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';

export default function ChaosFormSettings(props) {
  const label = props.label;
  const value = props.value;
  const options = props.options;
  const optionDisplays = props.optionDisplays;

  const elementOptions = [];

  for (var i = 0; i < options.length; i++) {
    elementOptions.push(
      <MenuItem value={options[i]}>{optionDisplays[i]}</MenuItem>
    );
  }

  const handleChange = (val) => {
    props.onChange(val.target.value);
  };

  return (
    <FormGroup>
      <InputLabel>{label}</InputLabel>
      <Select
        variant="outlined"
        fullWidth
        margin="normal"
        value={value}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {elementOptions}
      </Select>
    </FormGroup>
  );
}
