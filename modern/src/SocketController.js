import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { positionsActions, devicesActions, sessionActions } from './store';
import { useHistory } from 'react-router-dom';
import { useEffectAsync } from './reactHelper';
import axios from 'axios';

const displayNotifications = events => {
  if ("Notification" in window) {
    if (Notification.permission === "granted") {
      for (const event of events) {
        const notification = new Notification(`Event: ${event.type}`);
        setTimeout(notification.close.bind(notification), 4 * 1000);
      }
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(permission => {
        if (permission === "granted") {
          displayNotifications(events);
        }
      });
    }
  }
};

const SocketController = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(state => !!state.session.user); 
  const userData = useSelector(state => state.session.user);

  const connectSocket = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(protocol + '//' + window.location.host + '/api/socket');

    socket.onclose = () => {
      setTimeout(() => connectSocket(), 60 * 1000);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.devices) {
        dispatch(devicesActions.update(data.devices));
      }
      if (data.positions) {   
        //dispatch(positionsActions.update(data.positions));   //code to update positions via websocket
      }
      if (data.events) {
        displayNotifications(data.events);
      }
    };
  }

  const fetchPositions = async (src) => {
    try {
      
      const {data: res} = await axios('/api/positions', {
        cancelToken: src.token
      });  
     //console.log('>> positions', res);
      dispatch(positionsActions.refresh(await res));

    } catch(err) {
      console.log(err);
      if (axios.isCancel(err)) { //clean up resources on unmount
      } else {
          throw err
      }
    }
  }

  useEffectAsync(async () => {
    const response = await fetch('/api/server');
    if (response.ok) {
      dispatch(sessionActions.updateServer(await response.json()));
    }
  }, []);

  useEffectAsync(async () => {
    const source = axios.CancelToken.source();

    if (authenticated) {
      const response = await fetch('/api/devices');
      if (response.ok) {
        dispatch(devicesActions.refresh(await response.json()));
      }
      //positions api call at 5s interval
        const PERIOD = 10
        setInterval(() => fetchPositions(source), PERIOD * 1000); 
      //
      connectSocket();
    } else {
      const response = await fetch('/api/session');
      if (response.ok) {
        dispatch(sessionActions.updateUser(await response.json()));
      } else {
        history.push('/login');
      }
    }

    //cleanup...
      return () => {
        source.cancel();
      }

  }, [authenticated]);

  return null;
}

export default connect()(SocketController);
