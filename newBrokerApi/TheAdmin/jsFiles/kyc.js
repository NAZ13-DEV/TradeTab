document.addEventListener('DOMContentLoaded', function () {
  const uploadButton = document.getElementById('uploadButton');
  const fileSelect = document.getElementById('fileSelect');
  const userId = localStorage.getItem('uId');

  if (userId) {
    axios
      .get(`../newApi/api/task/checkKyc/${userId}`)
      .then((response) => {
        if (response.status === 201) {
          const readResult = response.data.message;
          if (readResult === 'true') {       
            setTimeout(() => {
              window.location = 'welcome-page';
            }, 2000);
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        }
      });
  }

  fileSelect.addEventListener('change', function () {
    if (fileSelect.value) {
      uploadButton.disabled = false;

      if (fileSelect.value === 'Passport') {
        uploadButton.setAttribute('data-bs-target', '#passportModal');
      } else if (fileSelect.value === 'Driving License') {
        uploadButton.setAttribute('data-bs-target', '#drivingLicenseModal');
      }
    } else {
      uploadButton.disabled = true;
      uploadButton.removeAttribute('data-bs-target');
    }
  });

  uploadButton.addEventListener('click', function () {
    const targetModal = uploadButton.getAttribute('data-bs-target');
    if (targetModal) {
      const modal = new bootstrap.Modal(document.querySelector(targetModal));
      modal.show();
    }
  });

  HSCore.components.HSDropzone.init('.js-dropzone');

  // Handle Dropzone for Passport
  const passportDropzone = HSCore.components.HSDropzone.getItem(
    'attachFilesPassportLabel',
  );
  passportDropzone.on('success', function (file) {
    sendFileToServer(file, 'passport');
  });

  function sendFileToServer(file, type) {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append(type, file);
    axios
      .post(`../newApi/api/task/uploadKyc`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          const readResult = response.data.message;
          Toasty.showToast('success', readResult);
          setTimeout(() => {
            window.location = 'welcome-page';
          }, 4000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        }
      });
  }
  // Initialize Dropzone for Driving License Front
  const drivingLicenseFrontDropzone = HSCore.components.HSDropzone.getItem(
    'attachFilesDrivingLicenseFrontLabel',
  );

  // Initialize Dropzone for Driving License Back
  const drivingLicenseBackDropzone = HSCore.components.HSDropzone.getItem(
    'attachFilesDrivingLicenseBackLabel',
  );

  // Array to store uploaded files
  let uploadedFiles = {
    drivingLicenseFront: null,
    drivingLicenseBack: null,
  };

  // Event handler for file upload success
  drivingLicenseFrontDropzone.on('success', function (file) {
    uploadedFiles.drivingLicenseFront = file;
    tryUploadFiles();
  });

  drivingLicenseBackDropzone.on('success', function (file) {
    uploadedFiles.drivingLicenseBack = file;
    tryUploadFiles();
  });

  // Function to attempt upload when both front and back files are available
  function tryUploadFiles() {
    if (uploadedFiles.drivingLicenseFront && uploadedFiles.drivingLicenseBack) {
      const formData = new FormData();
      formData.append('drivingLicenseFront', uploadedFiles.drivingLicenseFront);
      formData.append('userId', userId);
      formData.append('drivingLicenseBack', uploadedFiles.drivingLicenseBack);

      axios
        .post(`../newApi/api/task/uploadriverKyc`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.status === 201) {
            const readResult = response.data.message;
            Toasty.showToast('success', readResult);
            setTimeout(() => {
              window.location = 'welcome-page';
            }, 4000);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            Toasty.showToast('danger', message);
          }
        });
    }
  }
});
// 62192D11-16C2-48F3-BB1C-B52E1D43AB48
