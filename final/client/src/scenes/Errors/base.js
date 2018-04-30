import React from 'react';
import classes from './Errors.css';

const base = props => {
    const Tag = `${props.tag}`;

    return (
    <div className={classes.Errors}>
        <img src={require('../../assets/' + props.img)}/>
        <section>{props.title}</section>
        <article>{props.body}</article>
    </div>);
}

export default base;
