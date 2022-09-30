import React, {useEffect, useRef, useReducer} from 'react';
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
import Yeast from '../components/yeast';
import Extras from '../components/Extras';
import SideBar from '../components/Sidebar';

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
    isSubStyle: false,
    fermentables: [],
    hops: [],
    yeast: [],
    extras: []
  },
  {
    label: 'Select Substyle',
    options: [
        { id: '1', name: 'sweet stout' },
        { id: '2', name: 'American Stout' }
    ],
    isSubStyle: true,
    fermentables: [],
    hops:[],
    yeast: [],
    extras: []
  },
  {
    label: 'Select Fermentables',
    options: [],
    isSubStyle: false,
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
    hops:[],
    yeast: [],
    extras: []
  },
  {
    label: 'Select Hops',
    options: [],
    isSubStyle: false,
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
    ],
    yeast: [],
    extras: []
  },
  {
    label: 'Select Yeast ',
    options: [],
    isSubStyle: false,
    fermentables: [],
    hops:[],
    yeast: [
      {
        name: 'SAFALE US-05 YEAST',
        description: 'American ale yeast producing well balanced beers with low diacetyl and a very clean, crisp end palate. Forms a firm foam head and presents a very good ability to stay in suspension during fermentation.'
      },
      {
        name: 'SAFLAGER W-34/70 YEAST',
        description: 'This famous yeast strain from Weihenstephan in Germany is used world-wide within the brewing industry.'
      },
      {
        name: 'LALLEMAND NOTTINGHAM 11G',
        description: 'LalBrew Nottingham™ is an English style ale yeast selected for its high performance and versatility for a wide variety of styles and fermentation conditions. Traditional styles brewed with this yeast include but are not limited to Pale Ales, Ambers, Porters, Stouts and Barleywines. In addition to these traditional styles, Nottingham can be used to produce Golden Ale, Kölsch, Lager-style beers, IPA, and Imperial Stout, among many others. LalBrew Nottingham™ is a relatively neutral ale strain that is stress tolerant making it a good choice for high gravity, sour and other challenging fermentation conditions.'
      },
      {
        name: 'MANGROVE JACK’S M44 – US WEST COAST',
        description: 'A top fermenting ale strain suitable for American style ales. This yeast produces an exceptionally clean flavour, ideal for when you want the hop character to really punch through.'
      }
    ],
    extras: []
  },
  {
    label: 'Select Additions ',
    options: [],
    isSubStyle: false,
    fermentables: [],
    hops:[],
    yeast: [],
    extras: [
      {
        label: 'All Spice',
        id: '100',
        description: 'This is the description'
      },
      {
        label: 'Cacao nibs',
        id: '101',
        description: 'This is the description'
      },
      {
        label: 'Cardomom',
        id: '102',
        description: 'This is the description'
      },
      {
        label: 'Chilli',
        id: '103',
        description: 'This is the description'
      },
      {
        label: 'Cloves',
        id: '104',
        description: 'This is the description'
      }
    ]
  }
];


export default function Create() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [stepValidator, setStepValidator] = React.useState([false, false, false, false, false, false])
  const [isStepValid, setIsStepValid] = React.useState(false);
  const [fermentTotalPercentage, setFermentTotalPercentage] = React.useState(0);
  const [fermentSliderArray, setFermentSliderArray] = React.useState([{ val: 0, data: {}},{ val: 0, data: {}}, { val: 0, data: {}}, { val: 0, data: {}}, { val: 0, data: {}}, { val: 0, data: {}},{ val: 0, data: {}}]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [recipe, setRecipe] = React.useState();

  const handleFermentTotalPercentage = async (value, index, count, data) => {

    const addFermentable = () => {

      window.globalRecipe.add('fermentable', {
          name: 'Extra pale extract',
          weight: 4.0,
          color: 2.5,
          yield: 75.0
      })
  
      setRecipe(window.globalRecipe);
      forceUpdate();
  }

  

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
        handleSetStepValidator(true);
      } else {
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

  const addStyle = (style, isSubStyle) => {

    if (!isSubStyle) {
      window.globalRecipe.__proto__.style = style;
    } else {
      window.globalRecipe.substyle = style;
    }
    

    setRecipe(window.globalRecipe);
    forceUpdate();
}

const addFermentable = (data, value) => {
  const uniqueFermentables = Array.from(new Set(window.globalRecipe.fermentables.reverse().map(a => a.name)))
  .map(name => {
    return window.globalRecipe.fermentables.find(a => a.name === name)
  })

  debugger;

  const weight = value ? value : data.average;

  window.globalRecipe.add('fermentable', {
    name: data.name,
    color: 2.5,
    weight,
    yield: 78.0
  });

  
  setRecipe(window.globalRecipe);
  forceUpdate();
}

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

                      <BeerStyle isSubStyle={step.isSubStyle} addStyle={addStyle} step={activeStep} stepValidator={stepValidator} setStepValidator={handleSetStepValidator}  options={step.options}></BeerStyle>

                      {step.fermentables.length ? step.fermentables.map((data, index) => (
                        <div>
                          <Typography>{data.name}</Typography>
                          <Fermentable addFermentable={addFermentable} count={step.fermentables.length} index={index} handleFermentTotalPercentage={handleFermentTotalPercentage} data={data}></Fermentable>
                        </div>
                    )) : null}

                    {step.hops.length ? <div><Hops handleSetStepValidator={handleSetStepValidator} data={step.hops}></Hops></div>: null}

                    {step.yeast.length ? <div><Yeast setStepValidator={handleSetStepValidator} data={step.yeast}></Yeast></div>: null}

                    {step.extras.length ? <div><Extras handleSetStepValidator={handleSetStepValidator} data={step.extras}></Extras></div>: null}

                      <Typography>{step.description}</Typography>
                      <Box sx={{ mb: 2 }}>
                          <div>
                          <Button
                              type="submit"
                              disabled={activeStep !== 3 && !stepValidator[activeStep] && (index !== steps.length - 1)}
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
                    Edit
                </Button>
                </Paper>
            )}
            <SideBar recipe={recipe}></SideBar>

    </Container>
  );
}
