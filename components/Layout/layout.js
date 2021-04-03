import { useSelector } from 'react-redux';
import Header from './Header';

function Layout(props) {
  const toolReducer = useSelector((state) => state.toolReducer);
  return (
    <>
      {!toolReducer.hideNavbar && <Header />}
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
