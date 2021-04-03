import AuthForm from '../components/auth/auth-form';
import onlyGuest from '../components/higherOrderComponents/onlyGuest';
import AutoAddTitle from '../utils/AutoAddTitle';
import UseNavBar from '../utils/useNavBar';

function AuthPage() {
  return (
    <>
      <AutoAddTitle title="Auth" />
      <UseNavBar hideNavbar={true} />
      <AuthForm />
    </>
  );
}

export default onlyGuest(AuthPage);
