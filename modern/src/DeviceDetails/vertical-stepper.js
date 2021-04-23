import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Required from './Required';
import Extra from './Extra';
import ChatIcon from '@material-ui/icons/Chat';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useHistory, useParams } from 'react-router-dom';

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient(to bottom, #784af4 0%, #9966ff 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient(to bottom, #784af4 0%, #9966ff 100%)',
      },
    },
    line: {
      height: 10,
      width: 2,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 35,
      height: 35,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'small'
    },
    active: {
      backgroundImage:
        'linear-gradient(to bottom, #ffffff 0%, #ffffff 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      color: '#6600ff',
      width: 40,
      height: 40,
      transform: "translate(3px,0)",
      marginRight: "5px",
      border: '1px solid #6600ff'
    },
    completed: {
      backgroundImage:
        'linear-gradient(to bottom, #784af4 0%, #9966ff 100%)',
    },
  });
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <ChatIcon fontSize="small"/>,
      2: <AddBoxIcon fontSize="small"/>,

    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginLeft: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'left', 
    marginLeft: theme.spacing(6),
  },

}));

function getSteps() {
  return ['Primary', 'Extra'];
}

function getStepContent(step, handleFormSave, handleBack, buttonText, activeStep) {
  switch (step) {
    case 0:
      return <Required 
               handleFormSave={handleFormSave}
              
               submitButton={buttonText}
               activeStep={activeStep}
              />;
    case 1:
      return <Extra 
              handleFormSave={handleFormSave}
              handleBack={handleBack}
              submitButton={buttonText}
              activeStep={activeStep}
              
              />;         
    default:
      return 'Unknown step';
  }
}

export default function DeviceVerticalStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const history = useHistory();
  const { id } = useParams();

  const handleSave = async (value) => {
    // let endpoint = "devices"
    // let url = `/api/${endpoint}`;
    // if (id) {
    //   url += `/${id}`;
    // }

    // const response = await fetch(url, {
    //   method: !id ? 'POST' : 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(value),
    // });
    // if (response.ok) {
    //   history.goBack();
    // }
    handleNext();
  };
  
  const handleNext = () => {
    //alert(JSON.stringify(values, null, 2));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper  activeStep={activeStep} orientation="vertical" connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
            </StepLabel>
            <StepContent> 
            <Paper elevation={2} className={classes.formContainer}>
                {getStepContent(index, handleSave,handleBack, activeStep === steps.length - 1 ? 'Finish' : 'Save')}
                
            </Paper>

            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
