document.addEventListener('DOMContentLoaded', function () {
  const siteNameElements = document.querySelectorAll('#test');
  axios
    .post(`../newApi/api/task/test`)
    .then((response) => {
      if (response.status === 201) {
        const readResult = response.data.message;
        // readResult.map((e) => console.log(e.fullname.split(' ')));
        let value = '';
        const array = [];
        const usersnames = readResult
          .map((e, i) => {
            const fullnameArray = e.fullname.split(' ');
            const lengths = fullnameArray.length;

            if (lengths < 2 || lengths === 2) {
              value = fullnameArray;
            }
            if (lengths > 2) {
              value = [fullnameArray[0], fullnameArray[1]];
            }
            if (lengths === 3) {
              value = [
                `${fullnameArray[0]} ${fullnameArray[1]}`,
                fullnameArray[2],
              ];
            }
            if (lengths === 4) {
              value = [
                `${fullnameArray[0]} ${fullnameArray[1]}`,
                `${fullnameArray[2]} ${fullnameArray[3]}`,
              ];
            }
            return { ...e, value };
          })
          .filter((e) => e.balance > 0);
          console.log(usersnames);
        usersnames.forEach((e) => {
          const {
            Referral,
            answer,
            balance,
            country,
            cron,
            dateoc,
            email,
            fullname,
            id,
            img,
            ip,
            pass,
            password,
            plan,
            pnum,
            que,
            roi,
            state,
            status,
            username,
            usernumber,
            value,
            verify,
          } = e;

          const fname = value[0];
          const lname = value[1];
          array.push({
            fname,
            lname,
            email,
            dob: '',
            gender: '',
            pnum,
            houseadd: '',
            username,
            que,
            answer,
            country,
            state,
            password,
            Referral,
            pass,
            dateoc,
            userid: '',
            login: '',
          });
          // Initialize a new FormData object
          const formData = new FormData();

          // Append each key-value pair to the FormData object
          formData.append('fname', fname);
          formData.append('lname', lname);
          formData.append('email', email);
          formData.append('dob', '');
          formData.append('gender', '');
          formData.append('pnum', pnum);
          formData.append('houseadd', '');
          formData.append('username', username);
          formData.append('que', que);
          formData.append('answer', answer);
          formData.append('country', country);
          formData.append('state', state);
          formData.append('password', password);
          formData.append('pass', pass);
          formData.append('dateoc', dateoc);
          formData.append('referral', null);

          // Now formData contains all the fields as key-value pairs
          // registerUser(formData);
        });
        // console.log(usersnames);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        Toasty.showToast('danger', message);
      }
    });

  function registerUser(user) {
    axios
      .post('../newApi/api/task/regUser', user)
      .then((response) => {
        const result = response.data;
        if (response.status === 201) {
          const message = result.message;
          toastr.success(message);
          setTimeout(() => {
            window.location.href = 'login';
          }, 5000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const message = error.response.data.errors[0];
          toastr['error'](message);
        } else {
          console.error(error);
        }
      });
  }
});
