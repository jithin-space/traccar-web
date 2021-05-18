import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { positionsActions, devicesActions, sessionActions } from './store';
import { useHistory } from 'react-router-dom';
import { useEffectAsync } from './reactHelper';

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

  const connectSocket = () => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(protocol + '//' + window.location.host + '/api/socket');

    let messages = {
      actions: [],
      positions: [],
    };
    
    socket.onclose = () => {
      setTimeout(() => connectSocket(), 60 * 1000);
    };

    socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
      if (data.devices) {
        messages['actions'].push(data.devices);
      }
      if (data.positions) {
        messages['positions'].push(data.positions);
      }
      if (data.events) {
        displayNotifications(data.events);
      }
    };


    setInterval(() => {
      console.log(messages);
        if ( messages.actions.length > 0) {
            // let updateObj = messages.actions.reduce((totalObj, action) => {
            //   action.forEach(dev => 
            //     {
            //       if(!totalObj.hasOwnProperty(dev.deviceId)) {
            //         let key = dev.id;
            //         totalObj[key] = dev; 
            //       }
            //     });
            //    return totalObj;
            //   },{});
            // dispatch(devicesActions.update(Object.values(updateObj)));
            dispatch(devicesActions.update(messages.actions[0]));
        }
        if( messages.positions.length > 0) {
            console.log('working');
            dispatch(positionsActions.update(messages.positions[0]));
        }
      messages = {
        actions : [],
        positions: [],
      };
    }, 5000);
    // socket.onmessage = (event) => {
    //   console.log('debounce store');
    //   const data = JSON.parse(event.data);
    //   if (data.devices) {
    //     dispatch(devicesActions.update(data.devices));
    //   }
    //   if (data.positions) {
    //     dispatch(positionsActions.update(data.positions));
    //   }
    //   if (data.events) {
    //     displayNotifications(data.events);
    //   }
    // };
  }

  useEffectAsync(async () => {
    const response = await fetch('/api/server');
    if (response.ok) {
      dispatch(sessionActions.updateServer(await response.json()));
    }
  }, []);

  useEffectAsync(async () => {
    if (authenticated) {
      const response = await fetch('/api/devices');
      if (response.ok) {
        dispatch(devicesActions.refresh(await response.json()));
      }
      connectSocket();
    } else {
      const response = await fetch('/api/session');
      if (response.ok) {
        dispatch(sessionActions.updateUser(await response.json()));
      } else {
        history.push('/login');
      }
    }
  }, [authenticated]);

  return null;
}

export default connect()(SocketController);
