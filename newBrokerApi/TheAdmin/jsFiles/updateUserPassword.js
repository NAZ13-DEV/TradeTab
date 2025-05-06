document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('passwordUpdateForm'); // Replace with your form's ID
    const submitBtn = document.querySelector('#updatePasswordBtn'); // Replace with your button's ID
    const userId = localStorage.getItem('uId'); // Retrieve user ID from local storage

    if (!form || !userId) {
        console.error('Form element or User ID not found.');
        return;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Collect input values
        const currentPassword = document.querySelector('#currentPassword').value.trim();
        const newPassword = document.querySelector('#newPassword').value.trim();
        const confirmPassword = document.querySelector('#confirmPassword').value.trim();

        // Validate inputs
        if (!currentPassword || !newPassword || !confirmPassword) {
            Toasty.showToast('danger', 'Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Toasty.showToast('danger', 'New password and confirmation do not match.');
            return;
        }

        // Prepare request payload
        const passwordDetails = {
            userid: userId,
            currentPassword: currentPassword,
            password: newPassword,
            cpw: confirmPassword
        };

        // Submit the request
        axios
            .post('../newApi/api/task/updateUserPasswordByUSer', passwordDetails)
            .then((response) => {
                if (response.status === 201) {
                    const successMessage = response.data.message || 'Password updated successfully.';
                    Toasty.showToast('success', successMessage); // Display success message
                    setTimeout(() => {
                        form.reset(); // Reset form after success
                    }, 2000);
                }
            })
            .catch((error) => {
                if (error.response) {
                    // Handle specific error messages from the server
                    const errorMessage =
                        error.response.data.error ||
                        error.response.data.errors[0] ||
                        'An error occurred. Please try again.';
                    Toasty.showToast('danger', errorMessage);
                } else {
                    console.error('Error:', error);
                    Toasty.showToast('danger', 'Failed to connect to the server.');
                }
            });
    });
});
