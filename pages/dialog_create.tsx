import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    fabButton: {
        position: 'absolute',
        zIndex: 0,
        top: 'auto',
        left: 0,
        right: 0,
        margin: '0 auto',
    },
  }));

export default function FormDialog(props: any) {
    const classes = useStyles({});
    const [open, setOpen] = React.useState(false);
    const [state, setstate] = React.useState({
        name: '',
        username:'',
        email: '',
        password: ''
    })

    const handleOnNameChange = (event: any) => {
        console.log(state)
        let new_name = event.target.value
        setstate(state => {
            return {...state, name: new_name}
        });
    }
    const handleOnUsernameChange = (event: any) => {
        console.log(state)
        let new_username = event.target.value
        setstate(state => {
            return {...state, username: new_username}
        });
    }
    const handleOnEmailChange = (event: any) => {
        console.log(state)
        let new_email = event.target.value
        setstate(state => {
            return {...state, email: new_email}
        });
    }
    const handleOnPassChange = (event: any) => {
        console.log(state)
        let new_pass = event.target.value
        setstate(state => {
            return {...state, password: new_pass}
        });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUpdateUser = () => {
        Axios({
            method: 'post',
            url: 'api/createUser',
            data: {
              name: state.name,
              username: state.username,
              email: state.email,
              password: state.password
            }
        }).then((res) => {
            console.log(res)
            props.handleOnNewUser(res.data)
            handleClose()
        });
    }
    return (
        <div>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen} className = {classes.fabButton}>
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add user</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange = {handleOnNameChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="User Name"
                        type="text"
                        fullWidth
                        onChange = {handleOnUsernameChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange = {handleOnEmailChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange = {handleOnPassChange}
                    />
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateUser} color="primary">
                        Create
                    </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
        </div>
    );
}
