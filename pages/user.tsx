import React from 'react';
import DialogAdd from './dialog_create'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';
import DialogEdit from './dialog_edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
interface Column {
  id: 'name' | 'username' | 'email';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'username', label: 'User Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
];

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles({});
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [state, setstate] = React.useState({
      rows : [],
  });
  React.useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api',
    })
    .then(function (res: any) {
      const fetch_data = res.data
      setstate(state => {
        return {...state, rows: fetch_data}
      });
    });
  }, [])


  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage);
    setstate(state);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteUser = (index: number) => {
    let id = state.rows[index]['_id']
    console.log(id)
    axios({
      method: 'post',
      url: 'api/delete',
      data: {
        id: id
      }
    }).then((res) => {
      console.log(res, index)
      console.log(index)
      const oldData = state.rows;
      oldData.splice(index, 1);
      setstate(state => {
        return {...state, rows: oldData}
      });
    });
  }

  const handleOnNewUser: any = (newuser: {}) => {
    console.log(newuser)
    let oldData = state.rows as any;
    oldData.push(newuser)
    setstate(state => {
      console.log('them user')
      return {...state, rows: oldData}
    });
    return null
  }

  const handleUpdateUser: any = (index: number, data: any) => {
    console.log(index, data)
    let oldData = state.rows as any;
    oldData[index] = data
    setstate(state => {
      console.log('update user')
      return {...state, rows: oldData}
    });
  }
  return (
    <Paper className={classes.root}>
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              User Management
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Fab aria-label="delete" className={classes.button} onClick = {() => handleDeleteUser(index)}>
                      <DeleteIcon />
                    </Fab>
                  </TableCell>
                  <TableCell>
                  <DialogEdit id = {state.rows[index]['_id']} handleUpdateUser = {handleUpdateUser} index = {index}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DialogAdd handleOnNewUser = {handleOnNewUser}/>
    </Paper>
  );
}
