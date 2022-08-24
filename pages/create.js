import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@material-ui/core'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { makeStyles } from '@material-ui/core/styles'
import Fermentable from '../components/fermentable';

function valuetext(value) {
  return `${value}%`;
}


const steps = [
  {
    label: 'Select Style',
    options: [
        { id: '1', name: 'stout' },
        { id: '2', name: 'IPA' },
        { id: '3', name: 'NEIPA' },
        { id: '4', name: 'Belgian' },
        { id: '5', name: 'Brown Ale' }
    ],
    fermentables: [],
    hops: [
      
    ]
  },
  {
    label: 'Select Substyle',
    options: [
        { id: '1', name: 'sweet stout' },
        { id: '2', name: 'American Stout' }
    ],
    fermentables: []
  },
  {
    label: 'Select Fermentables',
    options: [],
    fermentables: [
      { 
        name: 'Pale Ale',
        isDisabled: true,
        marks: [
        {
          value: 0,
          label: '0%',
        },{
          value: 20,
          label: '20%',
        },
        {
          value: 25,
          label: '25%',
        },
        {
          value: 30,
          label: '30%',
        },
        {
          value: 37,
          label: '37%',
        }],
        average: 27
      },
      {
        name: 'Two Row',
        isDisabled: true,
        marks: [{
          value: 0,
          label: '0%',
        },{
          value: 20,
          label: '20%',
        },
        {
          value: 40,
          label: '40%',
        },
        {
          value: 50,
          label: '50%',
        },
        {
          value: 60,
          label: '60%',
        }],
        average: 50
      },
    ]
  },
  {
    label: 'Select Hops',
    options: [],
    fermentables: []
  },
  {
    label: 'Select Yeast ',
    options: [],
    fermentables: []
  },
];


export default function Create() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const [isDisabled, setDisabled] = React.useState(true);

  const handleChange = (event, isDisabled) => {
    setChecked(event.target.checked);
    setDisabled(isDisabled);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
     

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      justifyContent: 'center',
  
      [theme.breakpoints.down('xs')]: {
        padding: 5,
      },
    },
    stepper: {
      width: '600px'
    },
    slider: {
      width: '580px'
    }
  }))
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.container}>

            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel
                    optional={
                        (index === 5 ? (
                        <Typography variant="caption">Last step</Typography>
                        ) : null) 
                    }
                    >

                    {step.label}
                    </StepLabel>
                    <StepContent>

                    
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Style</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        >
                        {step.options.map(({ name, id })=><div><FormControlLabel value={name} key={id.toString()} control={<Radio />} label={name} /></div>)}

                        {step.fermentables.length ? step.fermentables.map((data) => (
                          <div>
                            <Typography>{data.name}</Typography>
                            <Fermentable data={data}></Fermentable>
                          </div>
                      )) : null}
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
    </Container>
  );
}
