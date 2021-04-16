import React, { useEffect, useState } from 'react';
import { Button, Container, makeStyles, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormLabel from '@material-ui/core/FormLabel';
import { acAddProduct, acIsNewProduct } from '../../redux/containerAdmin';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  rootForm: {
    width: '50%',
    paddingRight: 8,
  },
  searchFrom: {
    display: 'grid',
    padding: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '1rem',
  },
}));

export default function AddProductForm() {
  const classes = useStyles();
  const isNewProduct = useSelector(
    (state) => state.containerAdmin.isNewProduct
  );
  const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [inputs, setInputs] = useState({
    ibm: { value: '' },
    alias: { value: '' },
    totalCount: { value: 0 },
  });
  const dispatch = useDispatch();
  function onChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputName]: {
          ...prevState[inputName],
          value: newValue,
          dirty: true,
        },
      };
    });
  }
  useEffect(() => {
    if (inputs.ibm.value.length === 6) {
      dispatch(acIsNewProduct(inputs.ibm.value));
    } else {
      dispatch({
        type: 'CHANGE_IS_NEW_OR_OLD',
        payload: false,
      });
    }
  }, [inputs]);
  useEffect(() => {
    if (inputs.ibm.value.length === 6 && !isNewProduct) {
      setDisabledAddButton(false);
    } else {
      setDisabledAddButton(true);
    }
  }, [inputs, isNewProduct]);
  const submitNewProduct = (e) => {
    e.preventDefault();
    let ibm = inputs.ibm.value;
    let alias = inputs.alias.value;
    dispatch(acAddProduct({ ibm, alias }));
  };
  const addLoad = () => {
    console.log(
      `add load`,
      inputs.ibm.value,
      'total:',
      inputs.totalCount?.value
    );
    clearInput();
  };
  const clearInput = () => {
    setInputs({
      ibm: { value: '' },
      alias: { value: '' },
      totalCount: { value: 0 },
    });
  };

  return (
    <Container className={classes.root}>
      <div className={classes.rootForm}>
        <Paper className={classes.searchFrom}>
          <TextField
            name="ibm"
            label="IBM"
            variant="outlined"
            autoFocus
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 6);
            }}
            min={0}
            type="number"
            value={inputs.ibm.value}
            onChange={onChange}
          />
          <TextField
            name="alias"
            label="Alias"
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.textInput,
              },
            }}
            type="text"
            value={inputs.alias.value}
            onChange={onChange}
          />
          <TextField
            name="totalCount"
            label="Total Count"
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.textInput,
              },
            }}
            type="number"
            value={inputs.totalCount.value}
            onChange={onChange}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={disabledAddButton}
            onClick={addLoad}
          >
            add load
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ color: 'white' }}
            disabled={!isNewProduct}
            onClick={submitNewProduct}
          >
            add new product
          </Button>
          <Button
            variant="contained"
            onClick={clearInput}
            disabled={!inputs.ibm.value}
          >
            cancel
          </Button>
        </Paper>
      </div>
      <div>
        <BoxMeasure />
      </div>
    </Container>
  );
}

const BoxMeasure = () => {
  const classes = useStyles();
  return (
    <Paper component={'form'} className={classes.BoxMeasure}>
      <TextField name="msLength" label="MS Length" variant="outlined" />
      <TextField name="msWidth" label="MS Width" variant="outlined" />
      <TextField name="msHeight" label="MS Height" variant="outlined" />
      <Button variant="contained" color="primary">
        save
      </Button>
    </Paper>
  );
};

const UOMandSizeComponent = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('pl');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Paper className={classes.sizeForm}>
      <div className={classes.palletSize}>
        <TextField
          name="plUOM"
          label="PL UOM"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
        />
        <TextField
          name="plTi"
          label="PL Ti"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
        />
        <TextField
          name="plHi"
          label="PL Hi"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
        />

        <TextField
          name="p1UOM"
          label="P1 UOM"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
        />
        <TextField
          name="p1Ti"
          label="P1 Ti"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
        />
        <TextField
          name="p1Hi"
          label="P1 Hi"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
        />
      </div>
      <div className={classes.palletConfig}>
        <FormLabel component="legend">Pallet Config</FormLabel>
        <RadioGroup
          aria-label="pallet-config"
          name="palletStatus"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="pl" control={<Radio />} label="PL" />
          <FormControlLabel value="p1" control={<Radio />} label="P1" />
        </RadioGroup>
        <TextField
          name="msUOM"
          label="MS UOM"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
        />
      </div>
    </Paper>
  );
};
