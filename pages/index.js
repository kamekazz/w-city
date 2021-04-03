import onlyGuest from '../components/higherOrderComponents/onlyGuest';
import StartingPageContent from '../components/starting-page/starting-page';
import AutoAddTitle from '../utils/AutoAddTitle';
function HomePage() {
  return (
    <>
      <AutoAddTitle title="Home" /> <StartingPageContent />
    </>
  );
}

export default onlyGuest(HomePage);
