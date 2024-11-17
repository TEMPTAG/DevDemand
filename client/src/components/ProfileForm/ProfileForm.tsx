import { ChangeEvent, useState } from 'react';
import validateProfileForm from './ValidateProfileForm.tsx';
import { states } from './States.ts';
import { Form, InputGroup, Row, Col, Button, Container } from 'react-bootstrap';
import './ProfileForm.css';

export default function ProfileForm() {
    // State to hold form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        telephone: '',
        email: '',
        city: '',
        state: '',
        portfolioLink: '',
        githubLink: '',
        hourlyRate: 0,
        bio: ''
    });

    interface Errors {
        firstName?: string;
        lastName?: string;
        telephone?: string;
        email?: string;
        city?: string;
        state?: string;
        portfolioLink?: string;
        githubLink?: string;
        hourlyRate?: number;
        bio?: string;
    }

    // State to hold errors
    const [errors, setErrors] = useState<Errors>({});

    // Handle input field validation when user leaves the field
    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        const newErrors: { [key: string]: string } = validateProfileForm({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: newErrors[name] });
    };

    // Handle change in form inputs
    const handleChange = (e: ChangeEvent<HTMLElement>) => {
        const { name, value } = e.target as HTMLInputElement;

        if (name === 'hourlyRate') {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Perform form validation
        const validationErrors = validateProfileForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setFormData({
                firstName: '',
                lastName: '',
                telephone: '',
                email: '',
                city: '',
                state: '',
                portfolioLink: '',
                githubLink: '',
                hourlyRate: 0,
                bio: ''
            });
        }
    };

    return (
        <Container className="profile-form-container">
            <Form onSubmit={handleSubmit} className="profile-form">
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="telephone">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control
                        type="tel"
                        name="telephone"
                        placeholder="Enter your telephone number"
                        value={formData.telephone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.telephone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.telephone}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.city}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.state}
                    >
                        <option value="">Select your state</option>
                        {states.map((state) => (
                            <option key={state.abbreviation} value={state.abbreviation}>
                                {state.abbreviation}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {errors.state}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="portfolioLink">
                    <Form.Label>Portfolio Link</Form.Label>
                    <Form.Control
                        type="text"
                        name="portfolioLink"
                        placeholder="Enter your portfolio link"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.portfolioLink}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.portfolioLink}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="githubLink">
                    <Form.Label>GitHub Link</Form.Label>
                    <Form.Control
                        type="text"
                        name="githubLink"
                        placeholder="Enter your GitHub link"
                        value={formData.githubLink}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.githubLink}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.githubLink}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="hourlyRate">
                    <Form.Label>Hourly Rate</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            name="hourlyRate"
                            placeholder="Enter your hourly rate"
                            className="no-spinner form-control"
                            value={formData.hourlyRate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.hourlyRate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.hourlyRate}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="bio"
                        placeholder="Enter your bio"
                        value={formData.bio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.bio}
                        style={{ height: '100px' }}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.bio}
                    </Form.Control.Feedback>
                </Form.Group>
    
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
    
}
