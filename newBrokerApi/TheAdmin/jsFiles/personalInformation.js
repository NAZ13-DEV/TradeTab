document.addEventListener('DOMContentLoaded', function () {
    const userId = localStorage.getItem('uId'); // Get user ID from local storage
    const form = document.getElementById('personalInfo'); // Get the form element
    const submitBtn = document.querySelector('#updateBtn'); // Get the submit button
  
    // Ensure the form exists before attaching an event listener
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission behavior
  
        // Check if `userId` is available
        if (!userId) {
          console.error('User ID is not available in localStorage.');
          Toasty.showToast('danger', 'User ID is missing. Please log in again.');
          return;
        }
  
        // Create FormData from the form and append `userId`
        const userDet = new FormData(form);
        userDet.append('userid', userId);
  
        // Submit the form data using Axios
        axios
          .post('../newApi/api/task/personalInformation', userDet)
          .then((response) => {
            if (response.status === 201) {
              const successMessage = response.data.message; // Get the success message
              Toasty.showToast('success', successMessage); // Show success toast
              setTimeout(() => {
                // Redirect user after success if needed
                // location.href = 'user-profile-my-profile';
              }, 3000); // Adjust the timeout duration as needed
            }
          })
          .catch((error) => {
            // Handle validation errors
            if (error.response) {
              if (error.response.status === 422) {
                const errorMessage =
                  error.response.data.errors[0] || 'Validation error occurred.';
                Toasty.showToast('danger', errorMessage); // Show validation error toast
              } else {
                console.error('Error response:', error.response);
                Toasty.showToast(
                  'danger',
                  'An unexpected error occurred. Please try again.'
                ); // Show generic error toast
              }
            } else {
              console.error('Error:', error);
              Toasty.showToast('danger', 'Failed to connect to the server.');
            }
          });
      });
    } else {
      console.error('Form element not found.');
    }
  });
  