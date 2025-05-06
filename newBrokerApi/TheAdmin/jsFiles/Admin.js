document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('createCat');
  const adminMail = document.getElementById('adminMail');
  const adminpassword = document.getElementById('adminpassword');
  const userid = document.getElementById('userid');

  axios
    .get(`../newApi/api/task/fetchAdminDetails`)
    .then(function (response) {
      if (response.status === 201) {
        const result = response.data.message;
        const { adminMal, Password, id } = result;
        console.log(id);
        adminMail.value = adminMal;
        adminpassword.value = Password;
        userid.value = id;
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        Toasty.showToast('danger', message);
      } else {
        console.error(error);
      }
    });

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Check if fields are empty
    if (adminMail.value.trim() === '' || adminpassword.value.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare data to send
    const jsonData = {
      adminMail: adminMail.value.trim(),
      adminpassword: adminpassword.value.trim(),
      userid: userid.value.trim(),
    };
    axios
      .patch('../newApi/api/task/editAdminDetails', jsonData)
      .then((response) => {
        const message = response.data.message;
        Toasty.showToast('success', message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});
