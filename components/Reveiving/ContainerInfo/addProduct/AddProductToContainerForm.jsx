import { Button, Paper } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import {
  acIsNewProduct,
  acResetProductInfo,
  acSaveUOM,
} from '../../../../redux/containerAdmin';
import { acAddProductToContainer } from '../../../../redux/receivingReducer';
const transferOption = [
  {
    value: 'freeport',
    label: 'Freeport ',
  },
  {
    value: 'cranberry',
    label: 'Cranberry',
  },
  {
    value: 'quality',
    label: 'Quality',
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    marginBottom: theme.spacing(2),
  },
  ibmForm: {
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: theme.spacing(1),
    maxWidth: 452,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(1),
    },
  },
  textFields: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),

    width: '100%',
  },
  button: {
    margin: theme.spacing(1),

    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  textFieldTransfers: {
    display: 'flex',

    width: '100%',
  },
}));
export default function AddProductToContainerForm() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const classes = useStyles();
  const { isNewProduct, stationProduct } = useSelector(
    (state) => state.containerAdmin
  );
  const [transfer, setTransfer] = React.useState('freeport');
  const { stationContainer } = useSelector((state) => state.receivingReducer);
  const [inputs, setInputs] = useState({
    ibm: '',
    alias: '',
    totalCount: 0,
  });

  const { disabledFormButton } = useSelector((state) => state.receivingReducer);

  function onChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputName]: newValue,
      };
    });
  }

  useEffect(() => {
    if (inputs.ibm.length === 6) {
      dispatch(acIsNewProduct(inputs.ibm));
    } else {
      dispatch({
        type: 'PRODUCT_IS_OLD',
      });
    }
  }, [inputs.ibm]);

  useEffect(() => {
    if (stationProduct?.alias) {
      setInputs((prevState) => {
        return {
          ...prevState,
          ['alias']: stationProduct.alias,
        };
      });
    } else {
      setInputs((prevState) => {
        return {
          ...prevState,
          ['alias']: '',
        };
      });
    }
  }, [stationProduct]);

  const handleChangeTransfer = (event) => {
    setTransfer(event.target.value);
  };

  const handleChangeIsTransfer = (event) => {
    setIsTransfer(event.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    let body = { ...inputs, containerId: stationContainer.containerId };
    if (stationContainer.isTransfer === 'yes') {
      body = { ...body, transfer };
    }
    body.qtyS = body.totalCount;

    addLoad(body);
  };

  const clearInput = () => {
    setInputs({
      ibm: '',
      alias: '',
      totalCount: '',
    });
    inputRef.current.focus();
  };

  const addLoad = (body) => {
    dispatch(acAddProductToContainer(body));
    clearInput();
  };
  return (
    <div className={classes.root}>
      <Paper
        className={classes.ibmForm}
        component={'form'}
        onSubmit={handelSubmit}
      >
        <div className={classes.textFields}>
          <TextField
            name="ibm"
            label="IBM"
            variant="outlined"
            inputRef={inputRef}
            autoFocus
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 6);
            }}
            min={0}
            type="number"
            value={inputs.ibm}
            onChange={onChange}
            className={classes.textField}
            margin="dense"
            variant="filled"
          />
          <TextField
            name="alias"
            label="Alias"
            variant="outlined"
            className={classes.textField}
            type="text"
            value={inputs.alias}
            onChange={onChange}
            margin="dense"
            variant="filled"
          />
          <TextField
            name="totalCount"
            label="Total Count"
            variant="outlined"
            type="number"
            value={inputs.totalCount}
            onChange={onChange}
            margin="dense"
            variant="filled"
            className={classes.textField}
          />

          {stationContainer.isTransfer === 'yes' && (
            <TextField
              select
              label="Transfers Locations"
              value={stationContainer.transfer}
              className={classes.textField}
              onChange={handleChangeTransfer}
              margin="dense"
              variant="filled"
              value={transfer}
            >
              {transferOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}

          <Button
            variant="contained"
            color="primary"
            disabled={disabledFormButton}
            type="submit"
            className={classes.button}
          >
            add load
          </Button>
          <Button
            variant="contained"
            onClick={clearInput}
            className={classes.button}
            disabled={disabledFormButton}
          >
            cancel
          </Button>
        </div>
      </Paper>
      {stationProduct?.ibm && (
        <UOMandSizeComponent key={stationProduct?.updatedAt} />
      )}
    </div>
  );
}

const useStylesUOM = makeStyles((theme) => ({
  from: {
    display: 'grid',
    padding: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 2fr',
    gap: '1rem',
  },
  itemPalletConfig: {
    placeSelf: 'center',
  },
}));
//UOMandSizeComponent
const UOMandSizeComponent = () => {
  const classes = useStylesUOM();
  const { stationProduct } = useSelector((state) => state.containerAdmin);
  const [inputs, setInputs] = useState(stationProduct);
  const dispatch = useDispatch();

  function handleChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputName]: newValue,
      };
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(acSaveUOM(inputs));
  };

  const onReset = () => {
    dispatch(acResetProductInfo());
  };

  return (
    <Paper className={classes.from} component="form" onSubmit={onSubmit}>
      <TextField
        name="plUOM"
        label="PL UOM"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.plUOM}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="plTi"
        label="PL Ti"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.plTi}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="plHi"
        label="PL Hi"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.plHi}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />

      <TextField
        name="p1UOM"
        label="P1 UOM"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.p1UOM}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="p1Ti"
        label="P1 Ti"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.p1Ti}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="p1Hi"
        label="P1 Hi"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.p1Hi}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="msUOM"
        label="MS UOM"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.msUOM}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="plMaxHeight"
        label="Max PL Height"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.plMaxHeight}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="p1MaxHeight"
        label="Max P1 Height"
        variant="outlined"
        onChange={handleChange}
        value={inputs?.p1MaxHeight}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <div className={classes.itemPalletConfig}>
        <FormLabel component="legend">Pallet Config</FormLabel>
        <RadioGroup
          aria-label="pallet-config"
          name="palletStatus"
          value={inputs.palletStatus}
          onChange={handleChange}
        >
          <FormControlLabel value="pl" control={<Radio />} label="PL" />
          <FormControlLabel value="p1" control={<Radio />} label="P1" />
        </RadioGroup>
      </div>
      <Button variant="contained" onClick={onReset}>
        Reset
      </Button>
      <Button variant="contained" color="secondary" type="submit">
        save
      </Button>
    </Paper>
  );
};
