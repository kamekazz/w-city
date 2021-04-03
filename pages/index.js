import onlyGuest from '../components/higherOrderComponents/onlyGuest';
import StartingPageContent from '../components/starting-page/starting-page';
import AutoAddTitle from '../utils/AutoAddTitle';
import UseNavBar from '../utils/useNavBar';
function HomePage() {
  return (
    <>
      <AutoAddTitle title="Home" />
      <UseNavBar hideNavbar={true} />
      <StartingPageContent />
    </>
  );
}

export default onlyGuest(HomePage);
