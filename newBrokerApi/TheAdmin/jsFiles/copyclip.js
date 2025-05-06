document.addEventListener('DOMContentLoaded', function () {
  function initializeClipboard() {
    const clipboardElements = document.querySelectorAll('.js-clipboard');
    const clipboardCollection = [];

    clipboardElements.forEach((el) => {
      const options = JSON.parse(el.getAttribute('data-hs-clipboard-options'));
      clipboardCollection.push({
        $el: el,
        options: options,
      });
    });

    function _iffnit(collection) {
      collection.forEach((item) => {
        const { $el, options } = item;

        // if ($el.hasOwnProperty('$initializedEl')) return;

        let container = $el.closest('.modal');
        if (container) {
          options.container = container;
        }

        item.$initializedEl = new ClipboardJS($el, {
          target: function () {
            return document.querySelector(options.contentTarget);
          },
        });

        if (options.type === 'tooltip') {
          options.instanceTooltip = bootstrap.Tooltip.getOrCreateInstance($el);
        } else if (options.type === 'popover') {
          options.instancePopover = new bootstrap.Popover($el);
        }

        const hideTooltip = function () {
          options.instanceTooltip.tip.style.display = 'none';
          $el.setAttribute('data-bs-original-title', options.title);
          options.instanceTooltip.setContent();
          setTimeout(() => {
            options.instanceTooltip.tip.style.display = 'block';
          }, 100);
          $el.removeEventListener('mouseleave', hideTooltip);
        };

        item.$initializedEl.on('success', () => {
          if (options.successText || options.successClass) {
            if (options.successText) {
              if (options.type === 'tooltip') {
                $el.setAttribute('data-bs-original-title', options.successText);
                options.instanceTooltip.setContent();
                $el.addEventListener('mouseleave', hideTooltip);
              } else if (options.type === 'popover') {
                $el.setAttribute('data-bs-original-title', options.successText);
                options.instancePopover.show();
                $el.addEventListener('mouseleave', () => {
                  $el.setAttribute('data-bs-original-title', options.title);
                  options.instancePopover.hide();
                });
              } else {
                $el.lastChild.nodeValue = ' ' + options.successText + ' ';
                setTimeout(() => {
                  $el.lastChild.nodeValue = options.defaultText;
                }, 800);
              }
            }

            if (options.successClass) {
              const classTarget = options.classChangeTarget
                ? document.querySelector(options.classChangeTarget)
                : $el;
              if (classTarget) {
                classTarget.classList.remove(options.defaultClass);
                classTarget.classList.add(options.successClass);
                setTimeout(() => {
                  classTarget.classList.remove(options.successClass);
                  classTarget.classList.add(options.defaultClass);
                }, 800);
              }
            }

            if (options.action === 'cut') {
              const contentTarget = document.querySelector(
                options.contentTarget,
              );
              if (contentTarget && contentTarget.nodeName === 'TEXTAREA') {
                contentTarget.value = '';
              }
            }
          }
        });
      });
    }

    _iffnit(clipboardCollection);
  }

  initializeClipboard();
});
