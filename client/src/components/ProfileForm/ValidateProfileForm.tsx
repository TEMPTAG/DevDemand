interface FormData {
    firstName: string;
    lastName: string;
    telephone: string;
    email: string;
    city: string;
    state: string;
    portfolioLink?: string;
    githubLink?: string;
    hourlyRate: number;
    bio: string;
  }

const validateProfileForm = (formData: FormData) => {
    const errors: { [key: string]: string } = {};

    // Trim whitespace from form data
    const trimmedData: FormData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        telephone: formData.telephone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        portfolioLink: formData.portfolioLink?.trim() ?? '',
        githubLink: formData.githubLink?.trim() ?? '',
        bio: formData.bio.trim()
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

    // Validate hourly rate
    const hourlyRate = trimmedData.hourlyRate;
    if (!trimmedData.hourlyRate) {
        errors.hourlyRate = 'Hourly rate is required';
    } else if (isNaN(hourlyRate) || hourlyRate < 0) {
        errors.hourlyRate = 'Hourly rate must be a positive number';
    } else if (!/^\d+(\.\d{1,2})?$/.test(hourlyRate.toString())) {
        errors.hourlyRate = 'Hourly rate must be a number with up to 2 decimal places';
    }
    
    // Validate bio
    if (!trimmedData.bio) {
        errors.bio = 'Bio is required';
    } else if (trimmedData.bio.length < 2 || trimmedData.bio.length > 300) {
        errors.bio = 'Bio must be between 2 and 300 characters';
    }

    return errors;
}

export default validateProfileForm;