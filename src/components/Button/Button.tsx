import React from 'react';
import { Props } from './props';
import './Button.css';

export default (props: Props) => <button className="btn" {...props}>{props.children}</button>
