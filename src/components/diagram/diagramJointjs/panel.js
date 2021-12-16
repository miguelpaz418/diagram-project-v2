import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    ...theme.formTheme,
    list: {
        position: 'absolute',
        zIndex: '1',
        width: '40px',
        borderWidth: 1, 
        borderColor: '#A7A7A7',
        borderStyle: 'solid',
        padding: 0
    },
    btn: {
        paddingLeft : '8px',
        backgroundColor: '#CCCCCC',
    },
    ico: {
        minWidth: '24px',
    }
});

class Panel extends React.Component {

    render() {
        const { classes, listOfActions, action } = this.props;
        
        return (
            <List  className={classes.list}>
                {listOfActions.map((button, index)  => {
                    return (
                    <Tooltip key={index} title={button.title} placement="left">
                        <ListItem className={classes.btn} button onClick={() => action(button.action)} >
                            <ListItemIcon className={classes.ico}>
                                {button.icon}
                            </ListItemIcon>
                        </ListItem>
                    </Tooltip>
                    );
                })}
            </List>
        );
    }
}

export default withStyles(styles)(Panel)