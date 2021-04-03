import AuthForm from '../components/auth/auth-form';
import onlyGuest from '../components/higherOrderComponents/onlyGuest';
import AutoAddTitle from '../utils/AutoAddTitle';

function AuthPage() {
  return (
    <>
      <AutoAddTitle title="Auth" />
      <AuthForm />
    </>
  );
}

export default onlyGuest(AuthPage);
