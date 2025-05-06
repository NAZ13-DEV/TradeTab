document.addEventListener('DOMContentLoaded', function () {
  const activities = document.getElementById('activities');
  const activiti = document.getElementById('activiti');
  const userid = localStorage.getItem('uId') ?? null;
  let html = '';

  if (userid !== null) {
    axios
      .get(`../newApi/api/task/fetchUserActivityLimit/${userid},14`)
      .then(function (response) {
        if (response.status === 201) {
          const result = response.data.message;
          const activity = result.activity;
          function truncateWithEllipsis(text, wordLimit) {
            let words = text.split(' ');
            if (words.length > wordLimit) {
              return words.slice(0, wordLimit).join(' ') + ' ...';
            }
            return text;
          }

          activity.forEach((e) => {
            const { id, messageHeader, content, sent_at, read_at, status } = e;
            let truncatedContent = truncateWithEllipsis(content, 5);
            const formattedDate = convertDateFormat(sent_at);
            let listItemClass =
              status === null
                ? 'list-group-item bg-act text-white'
                : 'list-group-item';
            html = `<li class="${listItemClass}" id="activity-${id}"> 
      <div class="mb-1">
      <h5 class="mb-0">${messageHeader}</h5>
      </div>
      <div class="d-flex justify-content-between">
      <span class="h6 text-primary">${truncatedContent}</span>
      <span class="small-size">${formattedDate}</span>
      </div> 
      </li>`;
            activiti.insertAdjacentHTML('beforeend', html);
            // Add click event listener to send Axios request
            document
              .getElementById(`activity-${id}`)
              .addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default link behavior
                axios
                  .patch(`../newApi/api/task/updateActivitystatus/${id}`)
                  .then((response) => {
                    if (response.status === 201) {
                      const result = response.data.message;
                      if (result === 'true') {
                        window.location.href = `viewActivities?aId=${id}`;
                      }
                    }
                  })
                  .catch((error) => {
                    console.error('Error updating read status:', error);
                  });
              });
          });
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        }
      });
    axios
      .get(`../newApi/api/task/fetchUserActivityLimit/${userid},6`)
      .then(function (response) {
        if (response.status === 201) {
          const result = response.data.message;
          const activity = result.activity;
          function truncateWithEllipsis(text, wordLimit) {
            let words = text.split(' ');
            if (words.length > wordLimit) {
              return words.slice(0, wordLimit).join(' ') + ' ...';
            }
            return text;
          }

          activity.forEach((e) => {
            const { id, messageHeader, content, sent_at, read_at, status } = e;
            let truncatedContent = truncateWithEllipsis(content, 5);
            const formattedDate = convertDateFormat(sent_at);
            let listItemClass =
              status === null
                ? 'list-group-item bg-act text-white'
                : 'list-group-item';
            html = `<li class="${listItemClass}" id="activity-${id}"> 
      <div class="mb-1">
      <h5 class="mb-0">${messageHeader}</h5>
      </div>
      <div class="d-flex justify-content-between">
      <span class="h6 text-primary">${truncatedContent}</span>
      <span class="small-size">${formattedDate}</span>
      </div> 
      </li>`;
            activities.insertAdjacentHTML('beforeend', html);
            // Add click event listener to send Axios request
            document
              .getElementById(`activity-${id}`)
              .addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default link behavior
                axios
                  .patch(`../newApi/api/task/updateActivitystatus/${id}`)
                  .then((response) => {
                    if (response.status === 201) {
                      const result = response.data.message;
                      if (result === 'true') {
                        window.location.href = `viewActivities?aId=${id}`;
                      }
                    }
                  })
                  .catch((error) => {
                    console.error('Error updating read status:', error);
                  });
              });
          });
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          Toasty.showToast('danger', message);
        }
      });



  }
});
