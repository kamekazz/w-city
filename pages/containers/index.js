import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import withAuthorization from '../../components/higherOrderComponents/withAuthorization';
import AutoAddTitle from '../../utils/AutoAddTitle';
import UseNavBar from '../../utils/useNavBar';
import AdminControl from '../../components/Container/AdminControl';

const useStyles = makeStyles((theme) => ({
  constrainer: {},
}));
function ContainersPage() {
  const classes = useStyles();
  return (
    <>
      <AutoAddTitle title="Containers" />
      <UseNavBar hideNavbar={false} />
      <div className={classes.constrainer}>
        <AdminControl />
      </div>
    </>
  );
}
export default withAuthorization(ContainersPage);
