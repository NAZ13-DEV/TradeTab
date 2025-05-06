const setLoader = function (element) {
  element.style.setProperty("--before-content", "");
  element.style.setProperty("--before-background", "none");
  element.innerText = "";
  const div = document.createElement("div");
  div.className = "load1";
  element.appendChild(div);
  element.setAttribute("disabled", "disabled");
};

const unSetLoader = function (element, innerHTML) {
  element.style.removeProperty("--before-content");
  element.style.removeProperty("--before-background");
  // const loader = document.querySelector(".load");
  // loader.remove();
  element.textContent = innerHTML;
  element.removeAttribute("disabled", "disabled");
};
