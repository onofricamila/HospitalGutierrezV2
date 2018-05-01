import React from "react";
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import classes from 'classnames';
import {Link} from 'react-router-dom';
import Grid from 'material-ui/Grid';

const button = (props) => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Grid container justify="left">
                    <Link to={props.path}>
                        <Button variant="fab" className={classes.fab} color='primary'>
                            <AddIcon />
                        </Button>  
                    </Link>   
                </Grid>   
            </Grid>   
        </Grid>   
    );
}

export default button;