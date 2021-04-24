import React, { useState } from "react";
import axios from "../lib/axios";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import t from "../common/localization";
import {
  formatDistance,
  formatSpeed,
  formatHours,
  formatDateTime,
} from "../common/formatter";
import ReportFilter from "./ReportFilter";
import ReportLayoutPage from "./ReportLayoutPage";
import { useAttributePreference } from "../common/preferences";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));
const Filter = ({ setDevice, devices, setItems }) => {
  const handleSubmit = async (deviceId, from, to, mail, headers) => {
    const query = new URLSearchParams({ deviceId, from, to, mail });
    axios
      .post("/fn-api/positions", {
        deviceId,
        from,
        to,
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch(console.error);
  };

  const handleDeviceSelect = (deviceId) => {

    const device = devices.find(e => e.id === deviceId);
    setDevice(device);

  }

  return <ReportFilter 
    handleSubmit={handleSubmit}
    handleDeviceSelect={handleDeviceSelect}
    showOnly={true} />;
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
const SpeedReportPage = () => {
  
  const devices = useSelector((state) => Object.values(state.devices.items));
  const distanceUnit = useAttributePreference("distanceUnit");
  const speedUnit = useAttributePreference("speedUnit");
  const [items, setItems] = useState([]);
  const [device, setDevice ] = useState([]);
  const classes = useStyles();

  const columns = [
    {
      field: "fixtime",
      headerName: "Date Time",
      flex: 1.5,
      valueFormatter: (p) => formatDateTime(p.value),
    },
    {
      field: "speed",
      headerName: "Speed",
      flex: 1,
      valueFormatter: (p) => formatSpeed(p.value, "kmh"),
    },
    { field: "longitude", headerName: "Longitude", flex: 1 },
    { field: "latitude", headerName: "Latitude", flex: 1 },
    { field: "address", headerName: "Position", flex: 1 },
    {
      field: "overspeed",
      headerName: "Over Speed",
      flex: 1,
      valueGetter: (p) =>
        ((p.getValue("speed") || 0) * 1.852).toFixed(2) < 80 ? "No" : "YES",
    },
  ];

  return (
    <ReportLayoutPage filter={<Filter setDevice={setDevice} devices={devices} setItems={setItems} />}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h4">
                  Overview
                </Typography>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={4}>
                    <div className={classes.demo}>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Vehicle Owner Name"
                            secondary={ device.vehicleOwnerName || 'N/A' }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Phone Number"
                            secondary={ device.ownerPhoneNumber || 'N/A'}
                          />
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className={classes.demo}>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Vehicle Reg Num"
                            secondary={ device.licensePlate || 'N/A'}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Vehicle Engine Num"
                            secondary={ device.engineNumber || 'N/A'}
                          />
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <div className={classes.demo}>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Device ID"
                            secondary={device.deviceId || 'N/A'}
                           />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Vehicle Status"
                            secondary={device.status || 'N/A'}
                          />
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h4">
                  Summary
                </Typography>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Set Speed" />
                          <ListItemAvatar>
                            <Avatar>80</Avatar>
                          </ListItemAvatar>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Max Speed" />
                          <ListItemAvatar>
                            <Avatar>140</Avatar>
                          </ListItemAvatar>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className={classes.demo}>
                      <List dense>
                        <ListItem>
                          <ListItemText primary="Avg Speed" />
                          <ListItemAvatar>
                            <Avatar>20</Avatar>
                          </ListItemAvatar>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Over Speed Events" />
                          <ListItemAvatar>
                            <Avatar>3</Avatar>
                          </ListItemAvatar>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <DataGrid
          autoHeight={"true"}
          rows={items}
          columns={columns}
          pageSize={5}
          width={"100%"}
          components={{ Toolbar: CustomToolbar }}
        />
      </TableContainer>
    </ReportLayoutPage>
  );
};

export default SpeedReportPage;
