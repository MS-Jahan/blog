---
---

/*!
 * Basically Basic Jekyll Theme 1.4.4
 * Copyright 2017-2018 Michael Rose - mademistakes | @mmistakes
 * Free for personal and commercial use under the MIT license
 * https://github.com/mmistakes/jekyll-theme-basically-basic/blob/master/LICENSE
*/

var menuItems = document.querySelectorAll('#sidebar li');

// Get vendor transition property
var docElemStyle = document.documentElement.style;
var transitionProp = typeof docElemStyle.transition == 'string' ?
  'transition' : 'WebkitTransition';

// Animate sidebar menu items
function animateMenuItems() {
  for (var i = 0; i < menuItems.length; i++) {
    var item = menuItems[i];
    // Stagger transition with transitionDelay
    item.style[transitionProp + 'Delay'] = (i * 75) + 'ms';
    item.classList.toggle('is--moved');
  }
};

var myWrapper = document.querySelector('.wrapper');
var myMenu = document.querySelector('.sidebar');
var myToggle = document.querySelector('.toggle');
var myInitialContent = document.querySelector('.initial-content');
var mySearchContent = document.querySelector('.search-content');
var mySearchToggle = document.querySelector('.search-toggle');

// Toggle sidebar visibility
function toggleClassMenu() {
  myMenu.classList.add('is--animatable');
  if (!myMenu.classList.contains('is--visible')) {
    myMenu.classList.add('is--visible');
    myToggle.classList.add('open');
    myWrapper.classList.add('is--pushed');
  } else {
    myMenu.classList.remove('is--visible');
    myToggle.classList.remove('open');
    myWrapper.classList.remove('is--pushed');
  }
}

// Animation smoother
function OnTransitionEnd() {
  myMenu.classList.remove('is--animatable');
}

myMenu.addEventListener('transitionend', OnTransitionEnd, false);
myToggle.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
myMenu.addEventListener('click', function () {
  toggleClassMenu();
  animateMenuItems();
}, false);
if (mySearchToggle) {
  mySearchToggle.addEventListener('click', function () {
    toggleClassSearch();
  }, false);
}

// Toggle search input and content visibility
function toggleClassSearch() {
  mySearchContent.classList.toggle('is--visible');
  myInitialContent.classList.toggle('is--hidden');
  setTimeout(function () {
    document.querySelector('.search-content input').focus();
  }, 400);
}

// Copy Code Button
(function() {
  function initCopyButtons() {
    // Add copy buttons to all code blocks
    var codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(function(codeBlock) {
      // Skip if button already exists
      if (codeBlock.querySelector('.copy-code-button')) {
        return;
      }

      var copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.innerHTML = 'Copy';
      copyButton.setAttribute('aria-label', 'Copy code to clipboard');

      codeBlock.style.position = 'relative';
      codeBlock.appendChild(copyButton);

      copyButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Get the code element and extract only the code text (not the button)
        var code = codeBlock.querySelector('code');
        var text = '';

        if (code) {
          // Clone the code element to avoid modifying the original
          var codeClone = code.cloneNode(true);
          // Remove any button elements from the clone
          var buttons = codeClone.querySelectorAll('button');
          buttons.forEach(function(btn) { btn.remove(); });
          text = codeClone.innerText || codeClone.textContent;
        } else {
          // If no code element, get text from pre but exclude button
          var preClone = codeBlock.cloneNode(true);
          var buttons = preClone.querySelectorAll('button');
          buttons.forEach(function(btn) { btn.remove(); });
          text = preClone.innerText || preClone.textContent;
        }

        navigator.clipboard.writeText(text).then(function() {
          copyButton.innerHTML = '✓ Copied';
          copyButton.classList.add('copied');

          setTimeout(function() {
            copyButton.innerHTML = 'Copy';
            copyButton.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
          copyButton.innerHTML = '✗ Failed';
          setTimeout(function() {
            copyButton.innerHTML = 'Copy';
          }, 2000);
        });
      });
    });
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyButtons);
  } else {
    // DOM already loaded, run immediately
    initCopyButtons();
  }
})();

// Reading Progress Bar
document.addEventListener('DOMContentLoaded', function() {
  // Only show on post pages
  if (document.querySelector('.entry-content')) {
    // Create progress bar
    var progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    function updateProgress() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
  }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
  // Create back to top button
  var backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '↑';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  backToTopButton.style.display = 'none';
  document.body.appendChild(backToTopButton);

  // Show/hide button on scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'flex';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  // Scroll to top on click
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Table of Contents
document.addEventListener('DOMContentLoaded', function() {
  var content = document.querySelector('.entry-content');
  if (!content) return;

  var headings = content.querySelectorAll('h2, h3');
  if (headings.length < 3) return; // Only show TOC if there are 3+ headings

  // Create TOC container
  var toc = document.createElement('div');
  toc.className = 'table-of-contents';
  toc.innerHTML = '<h4>Table of Contents</h4><ul class="toc-list"></ul>';

  var tocList = toc.querySelector('.toc-list');

  // Generate TOC items
  headings.forEach(function(heading, index) {
    // Add ID to heading if it doesn't have one
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }

    var li = document.createElement('li');
    li.className = 'toc-' + heading.tagName.toLowerCase();

    var a = document.createElement('a');
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, null, '#' + heading.id);
    });

    li.appendChild(a);
    tocList.appendChild(li);
  });

  // Insert TOC after first paragraph or at the beginning
  var firstParagraph = content.querySelector('p');
  if (firstParagraph) {
    firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
  } else {
    content.insertBefore(toc, content.firstChild);
  }
});
