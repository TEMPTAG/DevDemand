const validateProfileForm = (formData) => {
    const errors = {};

    // Trim whitespace from form data
    const trimmedData = {
        ...formData,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        location: formData.location.trim(),
        hourlyRate: formData.hourlyRate.trim(),
        skillset: formData.skillset.trim(),
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

    // Validate location
    if (!trimmedData.location) {
        errors.location = 'Location is required';
    } else if (trimmedData.location.length < 2 || trimmedData.location.length > 50) {
        errors.location = 'Location must be between 2 and 50 characters';
    }

    // Validate hourly rate
    const hourlyRate = trimmedData.hourlyRate;
    if (!trimmedData.hourlyRate) {
        errors.hourlyRate = 'Hourly rate is required';
    } else if (isNaN(hourlyRate) || hourlyRate < 0) {
        errors.hourlyRate = 'Hourly rate must be a positive number';
    } else if (!/^\d+(\.\d{1,2})?$/.test(hourlyRate)) {
        errors.hourlyRate = 'Hourly rate must be a number with up to 2 decimal places';
    }

    // Validate skillset
    if (!trimmedData.skillset) {
        errors.skillset = 'Skillset is required';
    } else if (trimmedData.skillset.length < 2 || trimmedData.skillset.length > 50) {
        errors.skillset = 'Skillset must be between 2 and 50 characters';
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