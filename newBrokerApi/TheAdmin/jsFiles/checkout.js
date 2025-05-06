document.addEventListener('DOMContentLoaded', function () {
  const loginstatus = localStorage.getItem('Login');
  const sessionGet = localStorage.getItem('userdetails');
  const getUserdetails = JSON.parse(sessionGet);
  let userId;
  if (getUserdetails) {
    userId = getUserdetails.id ? getUserdetails.id : null;
  }

  const sessionGetUserID = userId;
  const cart = document.querySelector('#dtable');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const postalCode = document.getElementById('postalCode');
  const phoneNumber = document.getElementById('phoneNumber');
  const emailAddress = document.getElementById('emailAddress');
  const streetAddress1 = document.getElementById('streetAddress1');
  const streetAddress2 = document.getElementById('streetAddress2');
  const state = document.getElementById('state');

  const total = document.querySelector('.s2 h2 span');
  const submitbutton = document.querySelector('#button');
  const subtotal = document.querySelector('.s1 h2 span');
  let GetUserID, totalPrice, cartDetails;
  if (localStorage.getItem('cartDetails') !== null) {
    cartDetails = JSON.parse(localStorage.getItem('cartDetails'));

    totalPrice = cartDetails.totalPrice;
  }

  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="payment"]',
  );
  let selectedOption = '';
  const disable = function () {
    submitbutton.setAttribute('disabled', 'disabled');
    submitbutton.style.background = '#4e8bff';
  };

  const enable = function () {
    submitbutton.removeAttribute('disabled');
    submitbutton.style.background = '#0b4fc9';
  };
  disable();
  let html;

  if (sessionGetUserID) {
    try {
      const data = {
        sessionGetUserID: sessionGetUserID,
      };

      axios
        .post('newApi/api/task/checkSession', data)
        .then(function (respons) {
          if (respons.data.message.message === 'true') {
            const UserStatus = respons.data.message.Logstatus;
            if (UserStatus === 'true') {
              axios
                .get(`newApi/api/task/allCart/${sessionGetUserID}`)
                .then(function (response) {
                  if (response.status === 201) {
                    const userData = respons.data.message;
                    const cartData = response.data.message;

                    if (userData.fname) {
                      firstName.value = userData.fname;
                      firstName.readOnly = true;
                    }
                    if (userData.lname) {
                      lastName.value = userData.lname;
                      lastName.readOnly = true;
                    }
                    if (userData.Zip) {
                      postalCode.value = userData.Zip; // Assuming Zip is the correct field name
                      postalCode.readOnly = true;
                    }
                    if (userData.pnum) {
                      phoneNumber.value = userData.pnum;
                      phoneNumber.readOnly = true;
                    }
                    if (userData.email) {
                      emailAddress.value = userData.email;
                      emailAddress.readOnly = true;
                    }
                    if (userData.street1) {
                      streetAddress1.value = userData.street1;
                      streetAddress1.readOnly = true;
                    }
                    if (userData.street2) {
                      streetAddress2.value = userData.street2; // Assuming street2 is the correct field name
                      streetAddress2.readOnly = true;
                    }

                    if (userData.state) {
                      state.innerHTML = '';

                      // Create a new option element
                      const option = document.createElement('option');

                      option.text = userData.state;
                      state.appendChild(option);
                      // state.value = userData.state;
                      state.readOnly = true;
                    }
                    total.textContent = `$${totalPrice}`;
                    subtotal.textContent = `$${totalPrice}`;
                    cartData.forEach((element, index) => {
                      html = `  <td class="price"> <div class="images">
                    <span id>
                      <img src="${element.imageUrl}"  height='30' width ='30' alt="">
                    </span>
                    <small>${element.productName}</small>
                  </div></td>
                   
                    <td class="price">$${element.price}</td>
                    <td class="price">${element.quantity}</td>`;

                      cart.insertAdjacentHTML('beforeend', html);
                    });

                    // Add event listener to each radio button
                    radioButtons.forEach(function (radioButton) {
                      radioButton.addEventListener('change', function () {
                        if (this.checked) {
                          selectedOption = this.value;
                          const valuesToUpdate = {
                            firstName: firstName.value,
                            lastName: lastName.value,
                            postalCode: postalCode.value,
                            phoneNumber: phoneNumber.value,
                            emailAddress: emailAddress.value,
                            streetAddress1: streetAddress1.value,
                            streetAddress2: streetAddress2.value,
                            state: state.value,
                          };
                          let hasEmptyValue = Object.values(
                            valuesToUpdate,
                          ).some((value) => value.trim() === '');

                          if (hasEmptyValue) {
                            // Display error message using toastr
                            toastr.error(
                              'all fields for billing address are required ',
                            );
                          } else {
                            axios
                              .put(
                                `newApi/api/task/updateUser/${userData.id}`,
                                valuesToUpdate,
                              )
                              .then(function (response) {
                                if (response.status === 201) {
                                  const updateData = response.data.message;
                                  // console.log(updateData);
                                  if (updateData === 'true') {
                                    enable();
                                  }
                                }
                              })
                              .catch(function (error) {
                                if (
                                  error.response &&
                                  error.response.status === 422
                                ) {
                                  const message = error.response.data.errors[0];
                                  toastr['error'](message);
                                } else {
                                  console.error(error);
                                }
                              });
                          }
                        }
                      });
                    });
                    submitbutton.addEventListener('click', function (e) {
                      e.preventDefault();
                      const valuesToinsert = {
                        paymentMethod: selectedOption,
                        products: [cartData],
                        amount: cartDetails,
                      };
                      // console.log(cartData);
                      axios
                        .post(`newApi/api/task/createOrder`, valuesToinsert)
                        .then(function (response) {
                          disable();
                          if (response.status === 201) {
                            const updateData = response.data.message;
                            const updatid = response.data.message.orderid;

                            axios
                              .delete(
                                `newApi/api/task/deleteAllUserCart/${sessionGetUserID}`,
                              )
                              .then(function (response) {
                                const result = response.data.message;

                                if (response.status === 201) {
                                  if (result === 'true') {
                                    localStorage.removeItem('cartDetails');
                                    console.log(selectedOption);
                                    if (selectedOption === 'Bank Transfer') {
                                      Swal.fire({
                                        position: 'center',
                                        icon: 'info',
                                        title: `Huntington`,
                                        html: `<br> MARILOUZ ENTERPRISES LLC<br>
                                        Business<br>
                                        account:01060317994<br>
                                        Routing:044000024<br>
                                        SwiftHUNTUS33<br>
                                         Amount $${totalPrice}`,
                                        showConfirmButton: false,
                                        allowOutsideClick: false,
                                        // timer: 5000,
                                      });
                                    } else {
                                      Swal.fire({
                                        position: 'center',
                                        icon: 'info',
                                        title: `payment method ${selectedOption}`,
                                        html: `contact our support system <a href='mailto:'>here</a> or the lifechat for instruction on how to make payment for $${totalPrice}`,
                                        showConfirmButton: false,
                                        allowOutsideClick: false,
                                        // timer: 5000,
                                      });
                                    }
                                  }
                                }
                              })
                              .catch(function (error) {
                                if (
                                  error.response &&
                                  error.response.status === 422
                                ) {
                                  const message = error.response.data.errors[0];
                                  toastr['error'](message);
                                } else {
                                  console.error(error);
                                }
                              });
                          }
                        })
                        .catch(function (error) {
                          if (error.response && error.response.status === 422) {
                            const message = error.response.data.errors[0];
                            toastr['error'](message);
                          } else {
                            console.error(error);
                          }
                        });
                    });
                  }
                })
                .catch(function (error) {
                  if (error.response && error.response.status === 422) {
                    const message = error.response.data.errors[0];
                    toastr['error'](message);
                  } else {
                    console.error(error);
                  }
                });
            } else {
              localStorage.setItem('Login', 'false');
              siginEmail.textContent = 'Hello, Sign in';
              window.location.href = 'login';
            }
          }
        })
        .catch(function (error) {
          if (error.response && error.response.status === 422) {
            const message = error.response.data.errors[0];
            toastr['error'](message);
          } else {
            console.error(error);
          }
        });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const message = error.response.data.errors[0];
        toastr['error'](message);
      } else {
        console.error(error);
      }
    }
  } else {
    // siginEmail.textContent = "Hello, Sign in";
    // window.location.href = "cart";
  }
  function deleteCartItem(cartId) {}
});
