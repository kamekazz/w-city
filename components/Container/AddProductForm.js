import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, makeStyles, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormLabel from '@material-ui/core/FormLabel';
import {
  acAddProduct,
  acAddProductLoad,
  acGetPalletConfig,
  acIsNewProduct,
  acSaveUOM,
} from '../../redux/containerAdmin';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  rootForm: {
    width: '50%',
    paddingRight: 4,
  },
  searchFrom: {
    display: 'grid',
    padding: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
  },
  cubeDiv: {
    width: '50%',
    paddingLeft: 4,
  },
}));

export default function AddProductForm() {
  const classes = useStyles();
  const inputRef = useRef();
  const { isNewProduct, stationProduct } = useSelector(
    (state) => state.containerAdmin
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
        type: 'PRODUCT_IS_OLD',
      });
    }
  }, [inputs.ibm.value]);

  useEffect(() => {
    if (inputs.ibm.value.length === 6 && !isNewProduct) {
      setDisabledAddButton(false);
    } else {
      setDisabledAddButton(true);
    }
  }, [inputs, isNewProduct]);

  useEffect(() => {
    if (stationProduct?.alias) {
      setInputs((prevState) => {
        return {
          ...prevState,
          ['alias']: {
            ...prevState['alias'],
            value: stationProduct.alias,
            dirty: true,
          },
        };
      });
    } else {
      setInputs((prevState) => {
        return {
          ...prevState,
          ['alias']: {
            ...prevState['alias'],
            value: '',
            dirty: true,
          },
        };
      });
    }
  }, [stationProduct]);
  const submitNewProduct = (e) => {
    e.preventDefault();
    let ibm = inputs.ibm.value;
    let alias = inputs.alias.value;
    dispatch(acAddProduct({ ibm, alias }));
    inputRef.current.focus();
  };
  const addLoad = () => {
    let body = {};
    body.ibm = inputs.ibm.value;
    body.alias = inputs.alias.value;
    body.totalCount = inputs.totalCount.value;
    dispatch(acAddProductLoad(body));
    clearInput();
  };
  const clearInput = () => {
    setInputs({
      ibm: { value: '' },
      alias: { value: '' },
      totalCount: { value: 0 },
    });
    inputRef.current.focus();
  };

  return (
    <Container className={classes.root}>
      <div className={classes.rootForm}>
        <Paper className={classes.searchFrom}>
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
        {stationProduct?.ibm && (
          <UOMandSizeComponent key={stationProduct?.updatedAt} />
        )}
      </div>
      <div className={classes.cubeDiv}>
        {stationProduct?.ibm && (
          <>
            <BoxMeasure key={stationProduct?.updatedAt} />
            <PalletImages key={stationProduct?.updatedAt + 12} />
          </>
        )}
      </div>
    </Container>
  );
}

const useStylesUOM = makeStyles((theme) => ({
  from: {
    display: 'grid',
    padding: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 2fr',
    gap: '1rem',
  },
  itemPalletConfig: {
    placeSelf: 'center',
  },
}));

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
      <Button variant="contained" color="secondary" type="submit">
        save
      </Button>
    </Paper>
  );
};
////BoxMeasure
const useStylesBoxMeasure = makeStyles((theme) => ({
  from: {
    display: 'grid',
    padding: '1rem',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr',
    gap: '1rem',
    marginBottom: '1rem',
  },
}));

const BoxMeasure = () => {
  const classes = useStylesBoxMeasure();
  const { stationProduct, scrapingImage } = useSelector(
    (state) => state.containerAdmin
  );
  const [inputs, setInputs] = useState(stationProduct);
  const dispatch = useDispatch();
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

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(acGetPalletConfig(inputs));
  };

  return (
    <Paper component={'form'} className={classes.from} onSubmit={onSubmit}>
      <TextField
        name="msLength"
        label="MS Length"
        variant="outlined"
        onChange={onChange}
        value={inputs.msLength}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="msWidth"
        label="MS Width"
        variant="outlined"
        onChange={onChange}
        value={inputs.msWidth}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <TextField
        name="msHeight"
        label="MS Height"
        variant="outlined"
        onChange={onChange}
        value={inputs.msHeight}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 8);
        }}
        min={0}
        type="number"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={scrapingImage}
      >
        check
      </Button>
    </Paper>
  );
};

function PalletImages() {
  const { stationProduct } = useSelector((state) => state.containerAdmin);
  const [image, setImage] = useState(
    'https://res.cloudinary.com/dujqdfwzi/image/upload/v1617328839/w-city/kimwmoaof5twajxxytby.jpg'
  );

  function getActivePalletsImages(product) {
    let palletStatues = product.palletStatus;
    if (palletStatues === 'pl') {
      if (product.palletImagesPl.length === 1) {
        setImage(cuteString(product.palletImagesPl[0], product.plMaxHeight));
      } else {
        setImage(
          'https://res.cloudinary.com/dujqdfwzi/image/upload/v1617328839/w-city/kimwmoaof5twajxxytby.jpg'
        );
      }
    } else {
      if (product.palletImagesP1.length === 1) {
        setImage(cuteString(product.palletImagesP1[0], product.p1MaxHeight));
      } else {
        setImage(
          'https://res.cloudinary.com/dujqdfwzi/image/upload/v1617328839/w-city/kimwmoaof5twajxxytby.jpg'
        );
      }
    }
  }

  useEffect(() => {
    getActivePalletsImages(stationProduct);
  }, [stationProduct, setImage]);

  function calculateImageHeigh(topHeight) {
    let topHeightPlus = topHeight * 1.3;
    topHeightPlus = Math.floor(topHeightPlus);
    let height = 290 + topHeightPlus;
    let y = 250 - topHeightPlus;
    return { height, y };
  }
  function cuteString(str, topHeight) {
    const { height, y } = calculateImageHeigh(topHeight);
    let newString = str;
    let endString = str.length;
    newString = str.slice(49, endString);
    newString = `https://res.cloudinary.com/dujqdfwzi/image/upload/c_crop,h_${height},q_23,r_0,w_302,x_775,y_${y}/a_0${newString}`;
    return newString;
  }
  return (
    <Paper style={{ width: 302 }}>
      <img src={image} key={stationProduct.palletStatues} />
    </Paper>
  );
}
