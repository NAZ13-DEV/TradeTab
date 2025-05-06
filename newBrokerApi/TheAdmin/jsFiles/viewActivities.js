document.addEventListener('DOMContentLoaded', function () {
  const activiti = document.getElementById('activ');

  const userid = localStorage.getItem('uId') ?? null;
  let html = '';
  const getUrl = getParamDetailsFromLinks();
  const gottenparam = getUrl.aId ?? null;

  if (gottenparam !== null) {
    axios
      .get(`../api/task/fetchOneUserActivity/${gottenparam}`)
      .then(function (response) {
        if (response.status === 201) {
          const result = response.data.message;
          const activity = result.activity;
          const user = result.userDetails;
          const { first_name, last_name, gender, userImg } = user;
          const { id, messageHeader, content, sent_at, read_at, status } =
            activity;
          if (userImg === null || userImg === '') {
            if (gender === 'Female') {
              image = `../dashboard/assets/svg/user-female-svgrepo-com.svg`;
            }
            if (gender === 'Male') {
              image = `../dashboard/assets/svg/male-person-svgrepo-com.svg`;
            }
          } else if (userImg) {
            image = userImg;
          }

          html = `   <div class="d-flex mb-2">
                    <div class="flex-shrink-0">
                      <!-- Avatar -->
                      <div class="avatar avatar-sm avatar-circle mb-2">
                        <img class="avatar-img" src="${image}" alt="Image Description">
                      </div>
                      <!-- End Avatar -->
                    </div>

                    <div class="flex-grow-1 ms-2">
                      <div class="row">
                        <div class="col">
                          <h5 class="mb-0">${first_name} ${last_name}</h5>

                          <ul class="list-inline fs-6">
                            
                              <!-- End Rating List -->
                            </li>

                            <li class="list-inline-item">${convertDateFormat(sent_at)}</li>
                          </ul>
                        </div>
                        <!-- End Col -->

                    
                      </div>
                      <!-- End Row -->
                    </div>
                  </div>
                  <!-- End Media -->

                  <h5 class="mb-1">${messageHeader}</h5>
                  <p>${content}</p>
                  <a>
                    <i class="bi bi-check-all text-primary" ></i>  Read  
                  </a>`;
          activiti.insertAdjacentHTML('beforeend', html);
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
