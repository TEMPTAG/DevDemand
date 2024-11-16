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

    if (!trimmedData.telephone) {
        errors.telephone = 'Telephone is required';
    } else if (!/^\d{10}$/.test(trimmedData.telephone)) {
        errors.telephone = 'Telephone must be a 10-digit number';
    }

    // Validate email
    if (!trimmedData.email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
        errors.email = 'Email must be a valid email address';
    }

    // Validate city
    if (!trimmedData.city) {
        errors.city = 'City is required';
    } else if (trimmedData.city.length < 2 || trimmedData.city.length > 50) {
        errors.city = 'City must be between 2 and 50 characters';
    }

    // Validate state
    if (!trimmedData.state) {
        errors.state = 'State is required';
    }

    // Validate portfolio link
    if (trimmedData.portfolioLink) {
        if (!/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(trimmedData.portfolioLink)) {
            errors.portfolioLink = 'Portfolio link must be a valid URL';
        }
    }

    // Validate GitHub link
    if (trimmedData.githubLink) {
        if (!/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(trimmedData.githubLink)) {
            errors.githubLink = 'GitHub link must be a valid URL';
        }
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