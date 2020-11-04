import * as React from 'react';

const TextError: React.FunctionComponent<any> = (props) => {
  return (
      <div className="error">
        {props.children}
      </div>);
};

export default TextError;
