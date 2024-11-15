import { ChangeEvent, useState } from 'react';
import validateProfileForm from './ValidateProfileForm.tsx';
import { states } from './States.ts';
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
        const newErrors: { [key: string]: string} = validateProfileForm({ ...formData, [name]: value });
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
                    <label htmlFor="telephone">Telephone:</label>
                    <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        placeholder="Enter your telephone number"
                        value={formData.telephone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    >
                        <option value="">Select your state</option>
                        {states.map((state) => (
                            <option key={state.abbreviation} value={state.abbreviation}>{state.abbreviation}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="portfolioLink">Portfolio Link:</label>
                    <input
                        type="text"
                        id="portfolioLink"
                        name="portfolioLink"
                        placeholder="Enter your portfolio link"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="githubLink">GitHub Link:</label>
                    <input
                        type="text"
                        id="githubLink"
                        name="githubLink"
                        placeholder="Enter your GitHub link"
                        value={formData.githubLink}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="hourlyRate">Hourly Rate ($):</label>
                    <input
                        type="number"
                        id="hourlyRate"
                        name="hourlyRate"
                        placeholder="Enter your hourly rate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        step="0.01"
                        min="0"
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
                    {errors.telephone && <p className="form-error">{errors.telephone}</p>}
                    {errors.email && <p className="form-error">{errors.email}</p>}
                    {errors.city && <p className="form-error">{errors.city}</p>}
                    {errors.state && <p className="form-error">{errors.state}</p>}
                    {errors.portfolioLink && <p className="form-error">{errors.portfolioLink}</p>}
                    {errors.githubLink && <p className="form-error">{errors.githubLink}</p>}
                    {errors.hourlyRate && <p className="form-error">{errors.hourlyRate}</p>}
                    {errors.bio && <p className="form-error">{errors.bio}</p>}
                </div>
            </form>
        </div>
    );
}