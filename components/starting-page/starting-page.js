import classes from './starting-page.module.css';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

function StartingPageContent() {
  const router = useRouter();
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
      <Button color="secondary" onClick={() => router.push('/auth')}>
        click to Login
      </Button>
      <Button color="secondary" onClick={() => router.push('/dashboard')}>
        Dashboard
      </Button>
    </section>
  );
}

export default StartingPageContent;
