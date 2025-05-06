const setLoader = function (element) {
  element.innerText = '';
  element.innerHTML = '<div id="loader"></div>';
  element.disabled = true;
};
const setLoaderWithCustom = function (element, custom) {
  element.innerText = custom;
  element.disabled = true;
};

const unSetLoader = function (element, innerHTML) {
  element.textContent = innerHTML;
  element.disabled = false;
};
