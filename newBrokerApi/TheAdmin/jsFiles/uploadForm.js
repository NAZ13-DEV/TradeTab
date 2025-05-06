document.addEventListener('DOMContentLoaded', function () { 
    const uploadForm = document.getElementById('uploadForm');
        const img = document.querySelector('.dropify-render');
        uploadForm.addEventListener('submit', function (e) {
          e.preventDefault();
        const photo = img.querySelector('img');
       const formDocument = new FormData(this);
       formDocument.append('id', sessionGetUserID); 
       formDocument.append('photo', photo.src); 
  
          axios
         .post('../newApi/api/task/uploadDocument', formDocument)
         .then(function (response) {
           if (response.status === 201) {
             const readResultAsJson = response.data.message;
               Toasty.showToast('success', readResultAsJson);
        setTimeout(() => {
          location.reload();
        }, 4000);
           }
         })
         .catch(function (error) {
           console.log(error);
           if (error.response && error.response.status === 422) {
             const message = error.response.data;
             const messag = JSON.parse(message);
             Toasty.showToast('danger', messag);
           }
         })
     });
     });
   