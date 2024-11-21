import React, { useEffect, ChangeEvent, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import { useQuery, useMutation } from '@apollo/client';
import validateProfileForm from './ValidateProfileForm.tsx';
import { Errors } from '../../models/Errors';
import { states } from './States.ts';
import Auth from '../../utils/auth.ts';
import { GET_ME } from '../../utils/queries.ts';
import { UPDATE_DEV, DELETE_DEV } from '../../utils/mutations.ts';
import { Form, InputGroup, Button, Container, Spinner, Modal } from 'react-bootstrap';
import './ProfileForm.css';

export default function ProfileForm() {
    // State to track if the profile is created or updated
    const [isProfileCreated, setIsProfileCreated] = useState(false);

    const { loading, error, data, refetch } = useQuery(GET_ME);

    // State to hold form data
    const [formData, setFormData] = useState(data.me ?? {
        _id: '',
        imageUrl: '',
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

    // State to hold errors
    const [errors, setErrors] = useState<Errors>({});

    // State to hold delete confirmation modal
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleDelete = () => {
        handleShowModal();
    };
    
    const handleDeleteConfirmed = async () => {
        try {
            await deleteDev({ variables: { id: formData._id } });
            console.log('Profile deleted successfully');
            Auth.logout();
        } catch (err) {
            console.error('Error deleting profile:', err);
        } finally {
            handleCloseModal();
        }
    };

    // Apollo hooks
    const [updateDev] = useMutation(UPDATE_DEV, {
        refetchQueries: [{ query: GET_ME }],
    });
    const [deleteDev] = useMutation(DELETE_DEV, {
        onCompleted: () => {
            refetch();
        }
    })

    // Handle input field validation when user leaves the field
    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        const newErrors: { [key: string]: string } = validateProfileForm({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: newErrors[name] });
    };

    // Handle change in form inputs
    const handleChange = (e: ChangeEvent<HTMLElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Perform form validation
        const validationErrors = validateProfileForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        }

        try {
            await updateDev({
                variables: { input: formData },
            });
            setIsProfileCreated(true);
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading your profile...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <p>Error loading your profile. Please try again later.</p>
            </Container>
        );
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [developerPicture, setDeveloperPicture] = useState<File | undefined>(undefined);
    const previewURL = developerPicture?URL.createObjectURL(developerPicture): "/assets/images/profile-placeholder.png"

    function convertFileToBase64 (file: File | undefined): Promise<string> {
        if (!file) {
          return Promise.resolve('');
        }
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target?.files?.[0];
        setDeveloperPicture(file);
        convertFileToBase64(file).then((base64) => {
            console.log(base64);
            setFormData({ ...formData, imageUrl: base64 });
        });
    }
    console.log(formData);

    function handleClick() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <Container className="profile-form-container">
            
            <Form onSubmit={handleSubmit} className="profile-form">
                <div className="form-instructions text-center">
                    <p>{isProfileCreated ? "Please update the fields below to update your profile." : "Please complete the fields below to create your profile."}</p>
                </div>

                <Form.Group className="mb-4 text-center">
                    <Card.Img 
                        onClick={handleClick} 
                        variant="top" 
                        src={formData.imageUrl || previewURL }
                        className='profile-picture'
                        alt="Profile Picture"
                        style={{ maxWidth: '250px', cursor: 'pointer' }}
                    />
                    <input 
                        type="file" 
                        accept=".jpeg,.jpeg,.png"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <Form.Text className="text-muted">
                        <p> Click on the image to upload a new profile picture.</p>
                    </Form.Text>
                </Form.Group>

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
                        
                {/* <Button variant="primary" type="submit">
                    Submit
                </Button> */}
                <Button variant="primary" type="submit">
                    {data?.me ? 'Update Profile' : 'Create Profile'}
                </Button>
                {data?.me && (
                    <>
                        <Button variant="danger" type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                            Delete Profile
                        </Button>
                        <Modal show={showModal} onHide={handleCloseModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete your profile? This action cannot be undone.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleDeleteConfirmed}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
            )}
            </Form>
        </Container>
    );
}