import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // New state to store submitted data

  // Validate form on submit
  const validateForm = () => {
    const errors = {};

    // Username validation
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (validateForm()) {
    alert("submitted suscesfully")
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Save formData to submittedData before clearing
      setSubmittedData(formData);

      // Optionally reset form data
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFormErrors({});
    } else {
      setIsSubmitting(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="Form">
      <h2>Simple Form Validation</h2>
      <form onSubmit={handleSubmit}>
        {/* Username field */}
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          {formErrors.username && <p className="error">{formErrors.username}</p>}
        </div>

        {/* Email field */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        {/* Password field */}
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        {/* Confirm Password field */}
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {formErrors.confirmPassword && (
            <p className="error">{formErrors.confirmPassword}</p>
          )}
        </div>

        {/* Submit button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Display submitted data only if the form is successfully submitted */}
      {isSubmitted && submittedData && (
        <div className="form-data">
          <h3>Submitted Data:</h3>
          <p><strong>Username:</strong> {submittedData.username}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
          <p><strong>Confirm Password:</strong> {submittedData.confirmPassword}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
