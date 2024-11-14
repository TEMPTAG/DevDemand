import { useState } from 'react';
import validateProfileForm from './ValidateProfileForm.tsx';
import './ProfileForm.css';

export default function ProfileForm() {
    // State to hold form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: '',
        hourlyRate: 0,
        skillset: [],
        bio: ''
    });

    // State to hold errors
    const [errors, setErrors] = useState({});

    // Handle input field validation when user leaves the field
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const newErrors = validateProfileForm({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: newErrors[name] });
    };

    // Handle change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'hourlyRate') {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else if (name === 'skillset') {
        // For the 'skillset' field, split the input into an array of skill names
        // Test this for edge cases (including spaces) 
        // Create a new function or create dropdown if necessary
            const skillsArray = value.split(',') // Split by comma
                                        .map(skill => skill.trim()) // Trim whitespace
                                        .filter(skill => skill.length > 0); // Remove empty strings
            setFormData({ ...formData, [name]: skillsArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
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
                location: '',
                hourlyRate: 0,
                skillset: [],
                bio: ''
            });
        }
    };

    return (
        <div className="profile-form-container">
            <form
                onSubmit={handleSubmit}
                className="profile-form"
            >
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter your location"
                        value={formData.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate:</label>
                    <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        placeholder="Enter your hourly rate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skillset">Skillset:</label>
                    <input
                        type="text"
                        id="skillset"
                        name="skillset"
                        placeholder="Enter your skillset (i.e. HTML, CSS, Javascript)"
                        value={formData.skillset.join(', ')} // Join array into a comma-separated string for display in the input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Enter your bio"
                        value={formData.bio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    {/* Update to dynamically load button */}
                    <button type="submit" className="btn btn-primary">Submit</button> 
                </div>

                {/* Display form errors if any */}
                <div className="form-errors">
                    {errors.firstName && <p className="form-error">{errors.firstName}</p>}
                    {errors.lastName && <p className="form-error">{errors.lastName}</p>}
                    {errors.location && <p className="form-error">{errors.location}</p>}
                    {errors.hourlyRate && <p className="form-error">{errors.hourlyRate}</p>}
                    {errors.skillset && <p className="form-error">{errors.skillset}</p>}
                    {errors.bio && <p className="form-error">{errors.bio}</p>}
                </div>
            </form>
        </div>
    );
}