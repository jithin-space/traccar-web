import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import {
  Fab,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import MainToolbar from '../MainToolbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import t from '../common/localization';
import { useEffectAsync } from '../reactHelper';
import { formatBoolean } from '../common/formatter';

const useStyles = makeStyles(theme => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const VendorsView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);
  const vendors = items
    .filter(user => user.attributes && user.attributes.type && user.attributes.type === 'vendor');

  useEffectAsync(async () => {
    const response = await fetch('/api/users');
    if (response.ok) {
      setItems(await response.json());
    }
  }, [updateTimestamp]);

  return (
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={classes.columnAction} />
          <TableCell>{t('sharedName')}</TableCell>
          <TableCell>{t('userEmail')}</TableCell>
          <TableCell>{t('userAdmin')}</TableCell>
          <TableCell>{t('sharedDisabled')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {vendors.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={classes.columnAction} padding="none">
              <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                <MoreVertIcon />
              </IconButton>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{formatBoolean(item, 'administrator')}</TableCell>
            <TableCell>{formatBoolean(item, 'disabled')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  );
}

const VendorsPage = () => {
  const adminEnabled = useSelector(state => state.session.user && state.session.user.administrator);
  const classes = useStyles();
  const history = useHistory();

  const handleAddVendor = () => {
    history.push('/vendor');
    // menuHide();
  };
  return (
    <>
      <MainToolbar />
      <VendorsView />
      {adminEnabled && 
        <Fab size="medium" color="primary" className={classes.fab} onClick={handleAddVendor}>
          <AddIcon />
        </Fab>
      }
    </>
  );
}

export default VendorsPage;
