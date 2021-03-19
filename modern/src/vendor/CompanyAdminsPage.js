import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useParams } from 'react-router-dom';
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

const CompanyAdminsView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();
  const { v_id } = useParams();

  const [items, setItems] = useState([]);

  useEffectAsync(async () => {
    const response = await fetch(`/fn-api/vendor/${v_id}/users`);
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
        {items.map((item) => (
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

const CompanyAdminsPage = () => {
  const vendorEnabled = useSelector(state => state.session.user 
    && state.session.user.attributes
    && state.session.user.attributes.type === 'vendor'
    );
  const classes = useStyles();
  const history = useHistory();

  const userId = useSelector(state => state.session.user.id);

  const handleAddCompanyAdmin = () => {
    history.push(`/vendor/${userId}/company`);
    // menuHide();
  };
  return (
    <>
      <MainToolbar />
      <CompanyAdminsView />
      {vendorEnabled && 
        <Fab size="medium" color="primary" className={classes.fab} onClick={handleAddCompanyAdmin}>
          <AddIcon />
        </Fab>
      }
    </>
  );
}

export default CompanyAdminsPage;
