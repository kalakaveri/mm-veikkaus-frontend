/** @format */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

const Finder = ({ type, findHandler }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [element, setElement] = useState(null);
  const id = Object.values(params)[0];
  let stateType = `${type}s`;
  
  if (type === 'match') {
    stateType = 'matches';
  }
  if (type === 'guess') {
    stateType = 'guesses';
  }

  const objects = useSelector(state => state[stateType]);

  useEffect(() => {
    if (objects.length < 1) {
      dispatch(findHandler(id));
    }
    setElement(objects.find(o => o.id === id));
  }, []);

  if (!element || element === null) {
    return (
      <div id={`no-${type}-found-component`}>Linkkiä ei löytynyt.</div>
    );
  }
  return (
    <div id={`${type}-found-component`}>
      <Outlet />
    </div>
  );

};

export default Finder;
