import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { Provider, useSelector } from 'react-redux';

import { map } from './Map';
import store from '../store';
import { useHistory } from 'react-router-dom';
import StatusView from './StatusView';
import { useDebounce } from 'use-debounce';

const PositionsMap = ({ positions }) => {
  const id = 'positions';

  const history = useHistory();
  const devices = useSelector(state => state.devices.items);

 const [debouncedPositions] = useDebounce(positions, 5000);

  const createFeature = (devices, position) => {
    const device = devices[position.deviceId] || null;
    return {
      deviceId: position.deviceId,
      name: device ? device.name : '',
      category: device && (device.category || 'default'),
    }
  };

  const onMouseEnter = () => map.getCanvas().style.cursor = 'pointer';
  const onMouseLeave = () => map.getCanvas().style.cursor = '';

  const onClickCallback = useCallback(event => {
    const feature = event.features[0];
    let coordinates = feature.geometry.coordinates.slice();
    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const placeholder = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <StatusView deviceId={feature.properties.deviceId} onShowDetails={positionId => history.push(`/position/${positionId}`)} />
      </Provider>,
      placeholder
    );

    new mapboxgl.Popup({
      offset: 25,
      anchor: 'top'
    })
      .setDOMContent(placeholder)
      .setLngLat(coordinates)
      .addTo(map);
  }, [history]);

  useEffect(() => {
    map.addSource(id, {
      'type': 'geojson',
      'data': {
        type: 'FeatureCollection',
        features: [],
      },
      'cluster':true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    map.addLayer({
      'id': 'clusters',
      'type': 'circle',
      'source': id,
      'filter': ['has', 'point_count'],
      paint: {
        "circle-color": [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1',
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });

    map.addLayer({
    'id': 'cluster-count',
    'type': 'symbol',
    'source': id,
    'filter': ['has', 'point_count'],
    'layout': {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['Roboto Regular'],
    'text-size': 12
    }
    });

    

    map.addLayer({
      'id': id,
      'type': 'symbol',
      'source': id,
      'layout': {
        'icon-image': '{category}',
        'icon-allow-overlap': true,
        'text-field': '{name}',
        'text-allow-overlap': true,
        'text-anchor': 'bottom',
        'text-offset': [0, -2],
        'text-font': ['Roboto Regular'],
        'text-size': 12,
      },
      'paint': {
        'text-halo-color': 'white',
        'text-halo-width': 1,
      },
    });

    map.on('mouseenter', id, onMouseEnter);
    map.on('mouseleave', id, onMouseLeave);
    map.on('click', id, onClickCallback);

    return () => {
      Array.from(map.getContainer().getElementsByClassName('mapboxgl-popup')).forEach(el => el.remove());

      map.off('mouseenter', id, onMouseEnter);
      map.off('mouseleave', id, onMouseLeave);
      map.off('click', id, onClickCallback);

      map.removeLayer('clusters');
      map.removeLayer('cluster-count');
      map.removeLayer(id);
      map.removeSource(id);
    };
  }, [onClickCallback]);

  // useEffect(() => {

  //   console.log('normal update');

  //   map.getSource(id).setData({
  //     type: 'FeatureCollection',
  //     features: positions.map(position => ({
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [position.longitude, position.latitude],
  //       },
  //       properties: createFeature(devices, position),
  //     }))
  //   });
  // }, [devices, positions]);


  useEffect(() => {
    if(debouncedPositions) {
      console.log('debounce map');
      map.getSource(id).setData({
        type: 'FeatureCollection',
        features: positions.map(position => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [position.longitude, position.latitude],
          },
          properties: createFeature(devices, position),
        }))
      });
    }
  },[debouncedPositions]);

  return null;
}

export default PositionsMap;
