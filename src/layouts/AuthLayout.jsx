
const AuthLayout = ({ children }) => {
  return (
    <>
      {/* Auth pages do not show the navbar */}
      {children}
    </>
  );
};

export default AuthLayout;
