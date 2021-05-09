import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import AddProductToContainerForm from './AddProductToContainerForm';

const useStyles = makeStyles((theme) => ({}));

export default function AddProductContainer() {
  return (
    <div>
      <AddProductToContainerForm />
    </div>
  );
}
