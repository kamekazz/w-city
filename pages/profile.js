import UserProfile from '../components/profile/user-profile';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';

function ProfilePage() {
  return <UserProfile />;
}

export default withAuthorization(ProfilePage);
