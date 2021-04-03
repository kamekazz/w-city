import classes from './starting-page.module.css';
import { Button } from '@material-ui/core';
function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <Button color="secondary">Hello World</Button>
    </section>
  );
}

export default StartingPageContent;
