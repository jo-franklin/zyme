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
import { makeStyles } from '@material-ui/core/styles'
import Fermentable from '../components/fermentable';
import Hops from '../components/hops';
import BeerStyle from '../components/beerStyle';

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
    hops: []
  },
  {
    label: 'Select Substyle',
    options: [
        { id: '1', name: 'sweet stout' },
        { id: '2', name: 'American Stout' }
    ],
    fermentables: [],
    hops:[]
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
        },
        {
          value: 40,
          label: '40%',
        },
        {
          value: 45,
          label: '45%',
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
    ],
    hops:[]
  },
  {
    label: 'Select Hops',
    options: [],
    fermentables: [],
    hops: [
      {
        label: 'Admiral',
        id: '100',
        aa: '14.9',
        description: 'This is the description'
      },
      {
        label: 'Citra',
        id: '101',
        aa: '12',
        description: 'This is the description'
      },
      {
        label: 'Centennial',
        id: '102',
        aa: '4',
        description: 'This is the description'
      },
      {
        label: 'Cascade',
        id: '103',
        aa: '11',
        description: 'This is the description'
      },
      {
        label: 'Simcoe',
        id: '104',
        aa: '3.4',
        description: 'This is the description'
      }
    ]
  },
  {
    label: 'Select Yeast ',
    options: [],
    fermentables: [],
    hops:[]
  },
];


export default function Create() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepValidator, setStepValidator] = React.useState([false, false, false, false, false])
  const [isStepValid, setIsStepValid] = React.useState(false);
  const [fermentTotalPercentage, setFermentTotalPercentage] = React.useState(0);
  const [fermentSliderArray, setFermentSliderArray] = React.useState([{ val: 0, data: {}},{ val: 0, data: {}}, { val: 0, data: {}}, { val: 0, data: {}}, { val: 0, data: {}}, { val: 0, data: {}},{ val: 0, data: {}}]);

  const handleFermentTotalPercentage = async (value, index, count, data) => {


    // if (!fermentSliderArray) {
    //   console.log('init')
    //   setFermentSliderArray(new Array(count).fill(0));
    // }
    const newState = fermentSliderArray.map((val, i) => {
      if (index === i) {
        return { val: value, data};
      }
      return val;
    });

    setFermentSliderArray(newState);
    const percentage = newState.reduce((a, b) => {
      return a + b.val
    }, 0)
    setFermentTotalPercentage(percentage);

      // fermentSliderArray.map((val) => {
      //   setFermentTotalPercentage(val)
      // });

      if (percentage === 100) {
        handleSetStepValidator();
      } else {
        console.log('Fermentables must equal 100%')
        handleSetStepValidator(false);
      }
  };

  const handleSetStepValidator = (val) => {
    const newItems = stepValidator.map((item, index) => {
      if (activeStep == index) {
        if (val !== undefined) {
          return val
        }
        return true
      }
      return item;
    });
    setStepValidator(newItems);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleSetStepValidator();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsStepValid(true);
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
                      <StepContent TransitionProps={{ unmountOnExit: false }}>

                      <BeerStyle step={activeStep} stepValidator={stepValidator} setStepValidator={handleSetStepValidator}  options={step.options}></BeerStyle>

                      {step.fermentables.length ? step.fermentables.map((data, index) => (
                        <div>
                          <Typography>{data.name}</Typography>
                          <Fermentable count={step.fermentables.length} index={index} handleFermentTotalPercentage={handleFermentTotalPercentage} data={data}></Fermentable>
                        </div>
                    )) : null}
                        <h2>{fermentTotalPercentage}%</h2>
                        <ul>{fermentSliderArray.map((data) => (
                          <li>{data.data.name}</li>
                        ))}</ul>

                    {step.hops.length ? <div><Hops isStepValid={isStepValid} data={step.hops}></Hops></div>: null}

                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                          <div>
                          <Button
                              type="submit"
                              disabled={!stepValidator[activeStep]}
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
