import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../utils/auth"; // This will handle storing the token

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Handle form input change (email or password)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Form submission handler with logging
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    setValidated(true); // Set the form to be validated on submission

    // Validate form before proceeding
    if (form.checkValidity() === false) {
      return;
    }

    try {
      if (userFormData.email && userFormData.password) {
        // Construct GraphQL mutation
        const mutation = `
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
              developer {
                _id
                email
              }
            }
          }
        `;

        // Log user input before sending the request
        console.log('Submitting login data:', userFormData);

        // Send the login request to the server
        const response = await fetch("http://localhost:3001/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: mutation,
            variables: {
              email: userFormData.email,
              password: userFormData.password,
            },
          }),
        });

        // Handle the response
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const { data, errors } = await response.json();

        // Log GraphQL response for debugging
        console.log('GraphQL response data:', data);
        console.log('GraphQL response errors:', errors);

        // Check if there are any errors in the response
        if (errors) {
          throw new Error(errors[0].message);
        }

        // If login is successful, get the token and save it using Auth utility
        const { token } = data.login;
        Auth.login(token); // Save token to localStorage or context

        // Log successful login
        console.log('Login successful, token stored:', token);

        // Close the modal after successful login
        handleModalClose();

        // Clear form data after successful login
        setUserFormData({ email: "", password: "" });
      } else {
        setShowAlert(true); // Show alert if email or password is missing
      }
    } catch (err) {
      // Log and show error if login fails
      console.error('Error during login:', err);
      setShowAlert(true); // Display alert for login failure
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
        Something went wrong with your login credentials!
      </Alert>

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
        disabled={!(userFormData.email && userFormData.password)} // Disable button if no input
        type="submit"
        variant="success"
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;