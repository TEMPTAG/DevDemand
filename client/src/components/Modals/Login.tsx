import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_DEV } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Apollo Client mutation for logging in
  const [loginDeveloper, { loading, error }] = useMutation(LOGIN_DEV);

  // Handle form input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Form submission handler
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    try {
      // Call the login mutation
      const { data } = await loginDeveloper({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      // Extract the token and store it using the Auth utility
      const { token } = data.login;
      Auth.login(token);

      // Close the modal and reset the form
      handleModalClose();
      setUserFormData({ email: "", password: "" });
    } catch (err) {
      console.error("Login failed:", err);
      setShowAlert(true);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {showAlert && (
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
      )}
      {error && (
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={true}
          variant="danger"
        >
          {error.message}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Your email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          Email is required!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Your password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <Form.Control.Feedback type="invalid">
          Password is required!
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        disabled={loading || !(userFormData.email && userFormData.password)}
        type="submit"
        variant="success"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;
