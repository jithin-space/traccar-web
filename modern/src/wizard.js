import React, {useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Connections from './Connections';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VehicleVerticalStepper from './vertical-stepper';
import { StepLabel } from '@material-ui/core';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import DeviceVerticalStepper from './DeviceDetails';
import Container from '@material-ui/core/Container';
import MainToolbar from './MainToolbar';
import { useEffectAsync } from './reactHelper';

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 45,
    height: 25,
    display: 'flex',
    borderRadius: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor:
      '#FFFFFF',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    color: '#0000FF',
    border: '2px solid #0066ff',
    width: 55,
    height: 27,
  },
  completed: {
    backgroundColor:
      '#0066ff',
    color: '#FFFFFF',
  },
  completedTick: {
    color: '#FFFFFF',
    zIndex: 1,
    fontSize: 18,
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: '1',
    2: '2',
    3: '3',
    4: '4'
  }
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {completed ? <Check className={classes.completedTick}/> : <div>{icons[String(props.icon)]}</div>}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'  
  },
  container: {
    marginTop: theme.spacing(2),
  },
}));

function getSteps(editMode) {
  let steps = ['Device Details', 'Vehicle Details'];
  if (editMode) {
    steps.push('Connections') 
  }
  return steps;
}

function getStepContent(editItem, step, handleFormSave, firstFormData, handleSubmitForm, goBackStep) {
  if(!editItem) {
    switch (step) {
      case 0:
        return <DeviceVerticalStepper
                  handleFormSave={handleFormSave}
              />;
      case 1:
        return <VehicleVerticalStepper
                  firstFormData={firstFormData}
                  handleSubmit={handleSubmitForm}
                  goBackStep={goBackStep}
                />;
      default:
        return 'Unknown step';
    }
  } else {
    switch (step) {
      case 0:
        return <DeviceVerticalStepper
                  editItem={editItem}
                  handleFormSave={handleFormSave} //change to handleFormSave
              />;
      case 1:
        return <VehicleVerticalStepper
                  editItem={editItem}
                  firstFormData={firstFormData}
                  handleSubmit={handleSubmitForm}
                  goBackStep={goBackStep}
                />;
      case 2:
        return  <Connections />;
      default:
        return 'Unknown step';
    }
  }

}

export default function Wizard() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  
  const [firstFormData, setFirstFormData] = useState({});
  const [itemtoEdit, setItemtoEdit] = useState({}); //item to edit is set here
  const history = useHistory();
  const { id } = useParams();
  const steps = getSteps(id);

  useEffectAsync(async () => {
    let endpoint="devices";
    if (id) {
      const response = await fetch(`/api/${endpoint}/${id}`);
      if (response.ok) {
        setItemtoEdit(await response.json());
      }
    } else {
      setItemtoEdit({});
    }
  }, [id]);


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleFinalSubmit = async (value) => {
    handleComplete();
    let endpoint = "devices"
    let url = `/api/${endpoint}`;
    if (id) {
      url += `/${id}`;
      value.id = id;
    }
    const response = await fetch(url, {
      method: !id ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    if (response.ok) {
      localStorage.clear(); //clears all local stored form data 
      history.goBack();
    }
    //alert(JSON.stringify(value, null, 2));
  };

  const handleFirstForm = (value) => {
    setFirstFormData(value);
    handleNext();
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  return (
    <>
    <MainToolbar />
    <Container maxWidth='xl' className={classes.container}>
     <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>  
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div >
              <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                        {getStepContent(
                          itemtoEdit,
                          activeStep, 
                          handleFirstForm, 
                          firstFormData, 
                          handleFinalSubmit,
                          handleBack,                         
                          )}
                    </Paper>
                    </Grid>
                    
            </Grid>
            </div>
            
        )}
      </div>
      </div>
      </Container>
      </>
  );
}
