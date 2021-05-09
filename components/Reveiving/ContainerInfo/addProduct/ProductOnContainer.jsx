import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { acGetAllActionContainer } from '../../../../redux/receivingReducer';
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const columns = [
  { id: 'ibm', label: 'IBM', minWidth: 100 },
  { id: 'alias', label: 'Alias', minWidth: 100 },
  {
    id: 'qtyS',
    label: 'Qty Ship EA',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'msCnt',
    label: 'MS Cnt',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'plCnt',
    label: 'PL Cnt',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'plUOM',
    label: 'PL UOM',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'p1Cnt',
    label: 'P1 Cnt',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'p1UOM',
    label: 'P1 UOM',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'pP',
    label: 'Partial Pallet',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
  {
    id: 'transfer',
    label: 'Transfer',
    minWidth: 100,
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '48vh',
  },
});

export default function ProductOnContainer() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = [{ ibm: '131000', qtyS: 1000, itemId: getRandomInt(1000) }];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(acGetAllActionContainer());
  }, []);

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
                return <DynamicTableRow key={row.itemId} row={row} />;
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

function DynamicTableRow({ row }) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
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
}
