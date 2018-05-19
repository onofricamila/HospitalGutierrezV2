import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const listItem = ({ title, value }) => <ListItem>
    <ListItemText primary={title} secondary={value} />
</ListItem>

export default listItem