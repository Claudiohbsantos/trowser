import React from 'react';
import {formatSignature, formatTypedSignature} from '../../astParser/index';

const ResultEntry = ({entry}) => {

  return (
    <div className="container">{formatSignature(entry)}</div>
    // <div className="container">{formatTypedSignature(entry)}</div>
  )
}


export default ResultEntry