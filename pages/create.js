import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const steps = [
  {
    label: 'Select Style',
    options: [
        { id: '1', name: 'stout' },
        { id: '2', name: 'IPA' },
        { id: '3', name: 'NEIPA' },
        { id: '4', name: 'Belgian' },
        { id: '5', name: 'Brown Ale' }
    ]
  },
  {
    label: 'Select Substyle',
    options: [
        { id: '1', name: 'sweet stout' },
        { id: '2', name: 'American Stout' }
    ]
  },
  {
    label: 'Select Fermentables',
    options: [
        { id: '1', name: 'sweet stout' },
        { id: '2', name: 'American Stout' }
    ]
  },
  {
    label: 'Select Hops',
    options: [
        { id: '1', name: 'sweet stout' },
        { id: '2', name: 'American Stout' }
    ]
  },
  {
    label: 'Select Yeast ',
    options: [
        { id: '1', name: 'sweet stout' },
        { id: '2', name: 'American Stout' }
    ]
  },
];


export default function Create() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
            
  return (
            <Box>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel
                    optional={
                        index === 5 ? (
                        <Typography variant="caption">Last step</Typography>
                        ) : null
                    }
                    >
                    {step.label}
                    </StepLabel>
                    <StepContent>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        >
                        {step.options.map(({ name, id })=><div><FormControlLabel value={name} key={id.toString()} control={<Radio />} label={name} /></div>)}
                        </RadioGroup>
                    </FormControl>

                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                        <div>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Back
                        </Button>
                        </div>
                    </Box>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                </Button>
                </Paper>
            )}
    </Box>
  );
}
