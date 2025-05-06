document.addEventListener('DOMContentLoaded', function () {
  const siteNameElements = document.querySelectorAll('#siteName');
  const siteAddressElements = document.querySelectorAll('#siteAddress');
  const siteLinkElements = document.querySelectorAll('#siteLink');
  const siteNumberElements = document.querySelectorAll('#siteNumber');
  const siteMailElements = document.querySelectorAll('#siteMail');
  const copmmail = document.querySelectorAll('#copmmail');
  const copmemail = document.querySelectorAll('#copmemail');



  function updateElements(elements, content) {
    if (elements) {
      elements.forEach((e) =>
        e.insertAdjacentHTML('afterbegin', `${content}  `),
      );
    }
  }

  axios
    .post(`newApi/api/task/fetchSiteDetails`)
    .then((response) => {
      if (response.status === 201) {
        const readResult = response.data.message;
        const { siteaddress, sitelink, sitemail, sitename, sitenumber } =
          readResult;
        copmmail.forEach(element => {
          element.addEventListener('click', (event) => {
            event.preventDefault();
            smartsupp('chat:open');
          });
        });


        copmemail.forEach(element => {
          element.href = `mailto:${sitemail}`;
        });
        updateElements(siteAddressElements, siteaddress);
        updateElements(siteLinkElements, sitelink);
        updateElements(siteMailElements, sitemail);
        updateElements(siteNameElements, sitename);
        updateElements(siteNumberElements, sitenumber);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        Toasty.showToast('danger', message);
      }
    });





  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('year');

  if (yearElement) {
    yearElement.textContent = currentYear;
  }


});
