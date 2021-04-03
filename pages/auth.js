import AuthForm from '../components/auth/auth-form';
import onlyGuest from '../components/higherOrderComponents/onlyGuest';

function AuthPage() {
  return <AuthForm />;
}

export default onlyGuest(AuthPage);
