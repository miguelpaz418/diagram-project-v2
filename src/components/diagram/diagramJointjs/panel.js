import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const styles = theme => ({
    ...theme.formTheme,
    list: {
        position: 'absolute',
        zIndex: '1',
        width: '40px',
        
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
            <List className={classes.list}>
                {listOfActions.map((button, index)  => {
                    return (
                    <div key={index}>
                        <ListItem className={classes.btn} button onClick={() => action(button.action)} >
                            <ListItemIcon className={classes.ico}>
                                {button.icon}
                            </ListItemIcon>
                        </ListItem>
                    </div>
                    );
                })}
            </List>
        );
    }
}

export default withStyles(styles)(Panel)