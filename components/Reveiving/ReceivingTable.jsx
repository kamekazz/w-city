import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const columns = [
  { id: 'containerId', label: 'Container', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  {
    id: 'completion',
    label: 'Completion %',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(ft\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'locationDoor',
    label: 'Door',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(containerId, status, completion, size, locationDoor) {
  let id = getRandomInt(1000);
  return { containerId, status, completion, size, locationDoor, id };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, 52),
  createData('China', 'CN', 1403500365, 9596961, 52),
  createData('Italy', 'IT', 60483973, 301340, 52),
  createData('United States', 'US', 327167434, 9833520, 52),
  createData('Canada', 'CA', 37602103, 9984670, 52),
  createData('Australia', 'AU', 25475400, 7692024, 52),
  createData('Germany', 'DE', 83019200, 357578, 52),
  createData('Ireland', 'IE', 4857000, 70273, 52),
  createData('Mexico', 'MX', 126577691, 1972550, 52),
  createData('Japan', 'JP', 126317000, 377973, 52),
  createData('France', 'FR', 67022000, 640679, 52),
  createData('United Kingdom', 'GB', 67545757, 242495, 52),
  createData('Russia', 'RU', 146793744, 17098246, 52),
  createData('Nigeria', 'NG', 200962417, 923768, 52),
  createData('Brazil', 'BR', 210147125, 8515767, 52),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '60vh',
  },
});

export default function ReceivingTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
