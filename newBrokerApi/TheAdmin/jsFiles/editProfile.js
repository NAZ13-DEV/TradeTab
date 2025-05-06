document.addEventListener('DOMContentLoaded', function () {
  const userId = localStorage.getItem('uId');
  const form = document.getElementById('formss');
  const submitBtn = document.querySelector('#editButton');

  // Ensure the form exists before attaching an event listener
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Ensure `userId` is available before proceeding
      if (!userId) {
        console.error('User ID is not available in localStorage.');
        Toasty.showToast('danger', 'User ID is missing. Please log in again.');
        return;
      }

      // Create FormData and append `userId`
      const userDet = new FormData(form);
      userDet.append('userid', userId);

      // Submit data using Axios
      axios
        .post('../newApi/api/task/updateuserDetails', userDet)
        .then((response) => {
          if (response.status === 201) {
            const readResult = response.data.message;
            Toasty.showToast('success', readResult);
            setTimeout(() => {
              // Uncomment and use the correct redirect URL if needed
              // location.href = 'user-profile-my-profile';
            }, 5000);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 422) {
              const message = error.response.data.errors[0] || 'Validation error occurred.';
              Toasty.showToast('danger', message);
            } else {
              console.error('Error response:', error.response);
              Toasty.showToast('danger', 'An unexpected error occurred. Please try again.');
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
