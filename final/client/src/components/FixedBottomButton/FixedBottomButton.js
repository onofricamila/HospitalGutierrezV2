import React from "react";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import classes from 'classnames';
import {Link} from 'react-router-dom';
import myClasses from './FixedBottomButton.css';

const button = (props) => {
    return (
        <div className={myClasses.FixedBottomButton}>
        <Link to={props.path}>
            <Button variant="fab" className={classes.fab} color='primary'>
                <AddIcon />
            </Button>  
        </Link> 
        </div>  
    );
}

export default button;