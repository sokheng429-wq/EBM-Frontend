import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      {/* Main pages show the navbar */}
      <Navbar />
      {children}
    </>
  );
};

export default MainLayout;
