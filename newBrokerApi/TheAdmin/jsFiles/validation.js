function validateAnyField(fieldName, pattern = '', error = '') {
  const selectedElement = fieldName;
  let message = selectedElement.nextElementSibling;

  if (!message || !message.classList.contains('errorMessage')) {
    message = document.createElement('p');
    message.classList.add('errorMessage');
    selectedElement.parentNode.insertBefore(
      message,
      selectedElement.nextSibling,
    );
  }

  const value = selectedElement.value;

  if (selectedElement.tagName.toLowerCase() === 'input') {
    if (new RegExp(pattern).test(value) && value !== '') {
      selectedElement.id = 'successOccurred';
      message.remove();
      //document\.getElementById\('btn'\)\.disabled = false;
    } else {
      selectedElement.id = 'errorOccurred';
      message.textContent = error;
    }
  } else if (selectedElement.tagName.toLowerCase() === 'select') {
    if (value !== '') {
      selectedElement.id = 'successOccurred';
    } else {
      selectedElement.id = 'errorOccurred';
    }
  } else {
    console.log('This is neither an input nor a select.');
  }
}

function validateEmpty(selector) {
  const selectedElement = selector;
  if (selectedElement.value !== '') {
    selectedElement.id = 'successOccurred';
  } else {
    selectedElement.id = 'errorOccurred';
    document.getElementById('btn').disabled = true;
  }
}

function CheckLength(selectedElement, error) {
  const dob = selectedElement.value;
  const message = selectedElement.nextElementSibling;

  if (dob.length >= 8 && dob.length <= 16) {
    selectedElement.id = 'successOccurred';

    if (message && message.classList.contains('errorMessage')) {
      message.remove();
    }
  } else {
    selectedElement.id = 'errorOccurred';
    document.getElementById('btn').disabled = true;
    if (message && message.classList.contains('errorMessage')) {
      message.textContent = error;
    }
  }
}

function displayError(selectedElement, error) {
  const message = selectedElement.nextElementSibling;

  if (selectedElement.value === '') {
    selectedElement.id = 'errorOccurred';
    document.getElementById('btn').disabled = true;
    if (message && message.classList.contains('errorMessage')) {
      message.textContent = error;
    }
  } else {
    selectedElement.id = 'successOccurred';

    if (message && message.classList.contains('errorMessage')) {
      message.remove();
    }
  }
}

function displayAnyError(selectedElement, error) {
  const message = selectedElement.nextElementSibling;

  if (selectedElement.value) {
    selectedElement.id = 'errorOccurred';
    document.getElementById('btn').disabled = true;
    if (message && message.classList.contains('errorMessage')) {
      message.textContent = error;
    }
  } else {
    selectedElement.id = 'successOccurred';

    if (message && message.classList.contains('errorMessage')) {
      message.remove();
    }
  }
}

function CheckTrue(value1, value2, error) {
  const message1 = value1.nextElementSibling;
  const message2 = value2.nextElementSibling;
  if (value1.value === value2.value) {
    value1.id = 'successOccurred';
    value2.id = 'successOccurred';

    if (message2 && message2.classList.contains('errorMessage')) {
      message2.remove();
    }
    //document\.getElementById\('btn'\)\.disabled = false;
  } else {
    value1.id = 'errorOccurred';
    value2.id = 'errorOccurred';
    document.getElementById('btn').disabled = true;
    if (message2 && message2.classList.contains('errorMessage')) {
      message2.textContent = error;
    }
  }
}

function implementValidationOnInput(name, pattern, errorMessage) {
  name.addEventListener('input', function () {
    validateAnyField(this, pattern, errorMessage);
  });
}

function implementValidationChange(name) {
  name.addEventListener('change', function () {
    if (this !== '') {
      this.id = 'successOccurred';
    } else {
      this.id = 'errorOccurred';
    }
  });
}

function implementdateValidation(name) {
  name.addEventListener('input', function () {
    validateEmpty(name);
  });
}
function implementlengthValidation(name, error) {
  name.addEventListener('input', function () {
    CheckLength(this, error);
  });
}

function confirmPassword(name1, name2, error) {
  name1.addEventListener('input', function () {
    CheckTrue(this, name2, error);
  });
  name2.addEventListener('input', function () {
    CheckTrue(name1, this, error);
  });
}

function getParamDetailsFromLinks() {
  const query = window.location.search;
  const obj = {};
  const slice = query.slice(1);
  const split = slice.split('&');
  split.forEach(function (item) {
    const pair = item.split('=');
    obj[pair[0]] = pair[1];
  });
  return obj;
}
function convertDateFormat(dateStr) {
  // Split date and time
  const [datePart, timePart, period] = dateStr.split(/\s+/);

  // Split date part
  const [day, month, year] = datePart.split('-');

  // Split time part
  let [hours, minutes, seconds] = timePart.split(':');

  // Convert 12-hour clock to 24-hour clock
  if (period.toLowerCase() === 'pm' && hours !== '12') {
    hours = String(Number(hours) + 12);
  } else if (period.toLowerCase() === 'am' && hours === '12') {
    hours = '00';
  }

  // Create a new Date object
  const dateObj = new Date(
    `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
  );

  // Options for toLocaleDateString
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Convert to the desired format
  return dateObj.toLocaleDateString('en-US', options);
}

function convertStringToJson(result) {
  try {
    const responseString = result;
    const startIndex = responseString.indexOf('{');
    const validJsonString = responseString.slice(startIndex);
    const resultObj = JSON.parse(validJsonString);
    return resultObj;
  } catch (error) {
    return null;
  }
}

function startCountdown(time) {
  formattedMinutes = '00';
  formattedSeconds = '00';

  if (time === 0) {
    clearInterval(tickIntervalId);
  }

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  formattedMinutes = String(minutes).padStart(2, '0');
  formattedSeconds = String(seconds).padStart(2, '0');

  time--;
}
function resetCountdown(time) {
  startCountdown();
  clearInterval(tickIntervalId);
  tickIntervalId = setInterval(startCountdown, 1000);
}

function formatNumberWithCommasAndDecimal(
  number,
  decimalPlaces = 2,
  locale = 'en-US',
) {
  return number.toLocaleString(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
}
function formatDateYear(dateTimeString) {
  const [datePart] = dateTimeString.split(' ');
  const [day, , year] = datePart.split('-');
  return `${day}-${year}`;
}
function formatToDayMonthYear(dateTimeString) {
  const [datePart] = dateTimeString.split(' ');
  const [day, month, year] = datePart.split('-');

  const date = new Date(`${year}-${month}-${day}`);
  const options = { weekday: 'short', month: 'short', year: 'numeric' };

  return date.toLocaleDateString('en-US', options);
}

