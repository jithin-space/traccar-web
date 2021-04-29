import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';

import AddIdentification from './vehicle/Details/AddIdentification';
import AddClassification from './vehicle/Details/AddClassification';
import AddCustomerDetails from './vehicle/CustomerDetails';
import AddSpecificaion from './vehicle/Specification';
import AddSettings from './vehicle/Settings';
import AddFluids from './vehicle/Fluids';
import AddEngine from './vehicle/Engine';
import AddTransmission from './vehicle/Transmission';
import AddAdditionalDetails from './vehicle/Details/AdditionalDetails';
import AddPhoto from './vehicle/Details/AddPhoto';

import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ChatIcon from '@material-ui/icons/Chat';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import OpacityIcon from '@material-ui/icons/Opacity';
import SpeedIcon from '@material-ui/icons/Speed';
import CollectionsIcon from '@material-ui/icons/Collections';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

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
      2: <InsertPhotoIcon fontSize="small"/>,
      3: <CollectionsIcon fontSize="small" />,
      4: <AddBoxIcon fontSize="small"/>,
      5: <AssignmentIndIcon fontSize="small" />,
      6: <AssignmentIcon fontSize="small" />,
      7: <DirectionsCarIcon fontSize="small" />,
      8: <SpeedIcon fontSize="small"/>,
      9: <OpacityIcon fontSize="small" />,
      10: <SettingsIcon fontSize="small" />, 

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
  backButton: {
    display: 'flex',
    justifyContent: 'right', 
  }

}));

function getSteps() {
  return ['Identification', 'Upload Image', 'Classification', 'Additional Details',
          'Customer Details', 'Specification', 
          'Engine', 'Transmission', 'Fluids','Settings'
          ];
}

function getStepContent(
                step, 
                handleIdentificationForm,
                handleImage,
                handleClassificationForm, 
                handleAdditionalForm,
                handleCustomerForm,
                handleSpecificationForm,
                handleEngineForm,
                handleTransmissionForm,
                handleFluidsForm,
                handleSettingsForm,
                handleBack, 
                activeStep,
                editItem
              ) 
                  {
  switch (step) {
    case 0:
      return <AddIdentification
                handleFormSave={handleIdentificationForm}
                activeStep={activeStep}
                editItem={editItem}
              />;
    case 1: 
      return <AddPhoto 
                handleFormSave={handleImage}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
              />        
    case 2:
      return <AddClassification 
                handleFormSave={handleClassificationForm}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
              />;
    case 3: 
      return <AddAdditionalDetails 
                handleFormSave={handleAdditionalForm}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
              />          
    case 4: 
      return <AddCustomerDetails 
              handleFormSave={handleCustomerForm}
              handleBack={handleBack}
              activeStep={activeStep}
              editItem={editItem}
              />      
    case 5: 
        return <AddSpecificaion 
                handleFormSave={handleSpecificationForm}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
               />              
    case 6:
      return  <AddEngine
                handleFormSave={handleEngineForm}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
              />
    case 7: 
      return  <AddTransmission 
                handleFormSave={handleTransmissionForm}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
              />         
    case 8:
      return   <AddFluids 
                handleFormSave={handleFluidsForm}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
              />
    case 9: 
      return  <AddSettings 
                handleFormSave={handleSettingsForm}
                handleBack={handleBack}
                activeStep={activeStep}
                editItem={editItem}
              />;                               
    default:
      return 'Unknown step';
  }
}

export default function VehicleVerticalStepper({ firstFormData, handleSubmit, goBackStep, editItem }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  
  const [identificationData, setIdentificationData] = useState({});
  const [imageData, setImageData] = useState({});
  const [classificationData, setClassificationData] = useState({});
  const [additionalData, setAdditionalData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [specificationData, setSpecificationData] = useState({});
  const [engineData, setEngineData] = useState({}); 
  const [transmissionData, setTransmissionData] = useState({});
  const [fluidsData, setFluidsData] = useState({});
  const [settingsData, setSettingsData] = useState({});
  const [finalData, setFinalData] = useState({});

  const steps = getSteps();

  const handleClassificationData = async (value) => {
    setClassificationData(value);
    handleNext();
  };
  const handleIdentificationData = async (value) => {
    setIdentificationData(value); 
    handleNext();
  }
  const handleImageData = async(value) => {
    setImageData(value);
    handleNext();
  }
  const handleAdditionalData = async(value) => {
    setAdditionalData(value);
    handleNext();
  }
  const handleCustomerData = async(value) => {
    setCustomerData(value);
    handleNext();
  }
  const handleSpecificationData = async(value) => {
    setSpecificationData(value);
    handleNext();
  }
  const handleEngineData = async(value) => {
    setEngineData(value);
    handleNext();
  }
  const handleTransmissionData = async(value) => {
    setTransmissionData(value);
    handleNext();
  }
  const handleFluidsData = async(value) => {
    setFluidsData(value);
    handleNext();
  }
  const handleSettingsData = async(value) => {
    setSettingsData(value);
    handleNext();
  }
  const handleFinalSubmission = async(values) => {
    let attributesData = {
      attributes : {
        ...identificationData,
        ...imageData,
        ...classificationData,
        ...additionalData,
        ...customerData,
        ...specificationData,
        ...engineData,
        ...transmissionData,
        ...fluidsData,
        ...settingsData,
      }
    }
    let finalData = {
      ...firstFormData,
      ...attributesData
    }
    //setFinalData({ finalData });
    handleSubmit(finalData);                    //fired at wizard.js
    //alert(JSON.stringify(finalData, null, 2));
  }
  const goBackToFirstForm = async() => {
    goBackStep();
  }

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
    <div className={classes.root}>
      <Stepper  activeStep={activeStep} orientation="vertical" connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
            </StepLabel>
            <StepContent> 
            <Paper elevation={2} className={classes.formContainer}>
                {getStepContent(index, 
                  handleIdentificationData,
                  handleImageData,
                  handleClassificationData,
                  handleAdditionalData,
                  handleCustomerData,
                  handleSpecificationData,
                  handleEngineData,
                  handleTransmissionData,
                  handleFluidsData,
                  handleSettingsData,
                  handleBack, 
                  activeStep,
                  editItem.attributes,
                   )}
              </Paper>

            </StepContent>
          </Step>
        ))}
      </Stepper>
        <Grid container direction="row">
          
            
           {activeStep === steps.length && (
             <Grid item xs={12}>
               <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed - you can now submit form</Typography>
               <Button className={classes.prevButton} variant="default" onClick={handleBack}>Prev</Button>
             </Paper>
           
           </Grid>
           )}
            <Grid item xs={6}>
              <Button fullWidth variant="contained" onClick={goBackToFirstForm} className={classes.button}>
                Go Back
              </Button>
              </Grid>  
             <Grid item xs={6}>
             <Button disabled={activeStep !== steps.length} fullWidth variant="contained" color="primary" onClick={handleFinalSubmission} className={classes.button}>
                Submit 
              </Button>
              
             </Grid>
           
          </Grid>
        
    </div>
  );
}
