import { useState } from React;
import ValidateContactForm from './ValidateContactForm.tsx';
import './ContactForm.css';

export default function ContactForm() {
    const [contactForm, setContactForm] = useState({
        developerID: '',
        firstName: '',
        lastName: '',
        telephone: '',
        email: '',
        descriptionOfWork: ''
    });

    // State to hold errors
    const [errors, setErrors] = useState({});

     // Handle input field validation when user leaves the field
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const newErrors = ValidateContactForm({ ...contactForm, [name]: value });
        setErrors({ ...errors, [name]: newErrors[name] });
    };

    // Handle change in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactForm({ ...contactForm, [name]: value })
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = ValidateContactForm(contactForm);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setContactForm({
                developerID: '',
                firstName: '',
                lastName: '',
                telephone: '',
                email: '',
                descriptionOfWork: ''
            });
        }
    };

    return (
     <div className="contact-form-container">
        <form
            onSubmit={handleSubmit}
            className="contact-form"
        >
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={contactForm.firstName}
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
                    value={contactForm.lastName}
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
                    value={contactForm.email}
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
                    value={contactForm.telephone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label htmlFor="descriptionOfWork">Description of Work:</label>
                <textarea
                    id="descriptionOfWork"
                    name="descriptionOfWork"
                    placeholder="Enter a description of your work"
                    value={contactForm.descriptionOfWork}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>

            {/* Display form errors if any */}
            <div className="form-errors">
                {errors.firstName && <p className="form-error">{errors.firstName}</p>}
                {errors.lastName && <p className="form-error">{errors.lastName}</p>}
                {errors.email && <p className="form-error">{errors.email}</p>}
                {errors.telephone && <p className="form-error">{errors.telephone}</p>}
                {errors.descriptionOfWork && <p className="form-error">{errors.descriptionOfWork}</p>}
            </div>
        </form>
     </div>   
    );
}

