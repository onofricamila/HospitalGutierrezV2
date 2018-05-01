import React from 'react';
import classes from './Errors.css';

const base = props => {
    return (
    <div className={classes.Errors}>
        <img src={require('../../assets/' + props.img)} alt="Img Error" />
        <section>{props.title}</section>
        <article>{props.body}</article>
    </div>);
}

export default base;
