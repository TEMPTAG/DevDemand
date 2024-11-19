const validateContactForm = (contactForm) => {
    const errors = {};

    // Trim whitespace from form data
    const trimmedData = {
        ...contactForm,
        firstName: contactForm.firstName.trim(),
        lastName: contactForm.lastName.trim(),
        telephone: contactForm.telephone.trim(),
        email: contactForm.email.trim(),
        descriptionOfWork: contactForm.descriptionOfWork.trim(),
    };

    // Validate first name
    if (!trimmedData.firstName) {
        errors.firstName = 'First name is required';
    } else if (trimmedData.firstName.length < 2 || trimmedData.firstName.length > 50) {
        errors.firstName = 'First name must be between 2 and 50 characters';
    }

    // Validate last name
    if (!trimmedData.lastName) {
        errors.lastName = 'Last name is required';
    } else if (trimmedData.lastName.length < 2 || trimmedData.lastName.length > 50) {
        errors.lastName = 'Last name must be between 2 and 50 characters';
    }

    // Validate telephone
    if (!trimmedData.telephone) {
        errors.telephone = 'Telephone is required';
    } else if (!/^\d{10}$/.test(trimmedData.telephone)) {
        errors.telephone = 'Telephone must be a 10-digit number';
    }

    // Validate email
    if (!trimmedData.email) {
        errors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedData.email)) {
        errors.email = 'Email must be a valid email address';
    }

    // Validate description of work
    if (!trimmedData.descriptionOfWork) {
        errors.descriptionOfWork = 'Description of work is required';
    } else if (trimmedData.descriptionOfWork.length < 10 || trimmedData.descriptionOfWork.length > 500) {
        errors.descriptionOfWork = 'Description of work must be between 10 and 500 characters';
    }

    return errors;
}

export default validateContactForm;