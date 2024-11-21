import ProfileForm from "../components/ProfileForm/ProfileForm.tsx";
import Auth from "../utils/auth";
import { Container } from "react-bootstrap";

const DeveloperProfile = () => {
  // Check if the user is logged in
  const isLoggedIn = Auth.loggedIn();

  if (!isLoggedIn) {
    return (
      <Container className="text-center mt-5">
        <p>Please log in to access this page.</p>
      </Container>
    );
  }

  return (
    <>
      <h2>Developer Profile</h2>
      <ProfileForm />
    </>
  );
};

export default DeveloperProfile;
