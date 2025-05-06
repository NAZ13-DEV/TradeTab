 document.addEventListener('DOMContentLoaded', function () {
   const currentPassword = document.getElementById('currentPasswordLabel');
   const newPassword = document.getElementById('newPassword');
   const confirmNewPassword = document.getElementById(
     'confirmNewPasswordLabel',
   );
   const submitButton = document.getElementById('btn');

   const passwordRequirements = {
     lengthRequirement: false,
     lowercaseRequirement: false,
     uppercaseRequirement: false,
     numberSymbolRequirement: false,
   };

   const lengthRequirement = document.getElementById('lengthRequirement');
   const lowercaseRequirement = document.getElementById('lowercaseRequirement');
   const uppercaseRequirement = document.getElementById('uppercaseRequirement');
   const numberSymbolRequirement = document.getElementById(
     'numberSymbolRequirement',
   );

   currentPassword.addEventListener('input', validatePassword);
   newPassword.addEventListener('input', validatePassword);
   confirmNewPassword.addEventListener('input', validatePassword);

   function validatePassword() {
     const password = newPassword.value;
     const confirmPassword = confirmNewPassword.value;

     passwordRequirements.lengthRequirement = password.length >= 8;
     passwordRequirements.lowercaseRequirement = /[a-z]/.test(password);
     passwordRequirements.uppercaseRequirement = /[A-Z]/.test(password);
     passwordRequirements.numberSymbolRequirement = /[0-9\W]/.test(password);

     updateRequirementStatus(
       lengthRequirement,
       passwordRequirements.lengthRequirement,
     );
     updateRequirementStatus(
       lowercaseRequirement,
       passwordRequirements.lowercaseRequirement,
     );
     updateRequirementStatus(
       uppercaseRequirement,
       passwordRequirements.uppercaseRequirement,
     );
     updateRequirementStatus(
       numberSymbolRequirement,
       passwordRequirements.numberSymbolRequirement,
     );

     const passwordsMatch = password === confirmPassword && password.length > 0;
     updateRequirementStatus(confirmNewPassword.parentNode, passwordsMatch);

     const isCurrentPasswordNotEmpty = currentPassword.value.trim() !== '';
     const areAllRequirementsMet =
       Object.values(passwordRequirements).every(Boolean) &&
       passwordsMatch &&
       isCurrentPasswordNotEmpty;

     submitButton.disabled = !areAllRequirementsMet;
   }

   function updateRequirementStatus(element, isValid) {
     if (isValid) {
       element.classList.remove('invalid');
       element.classList.add('valid');
     } else {
       element.classList.remove('valid');
       element.classList.add('invalid');
     }
   }

   // Initial validation to set the button state on page load
   validatePassword();
 });

