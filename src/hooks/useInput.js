import { useState, useCallback } from 'react';

export default (initalState = null) => {
  const [value, setValue] = useState(initalState);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
