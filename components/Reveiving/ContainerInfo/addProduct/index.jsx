import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import AddProductToContainerForm from './AddProductToContainerForm';
import ProductOnContainer from './ProductOnContainer';

const useStyles = makeStyles((theme) => ({}));

export default function AddProductContainer() {
  return (
    <div>
      <AddProductToContainerForm />
      <ProductOnContainer />
    </div>
  );
}
