/**
 * Handles the redirection to the new Google Fonts, including preserving the
 * specimen you are currently viewing.
 *
 * Old URL: https://www.google.com/fonts/specimen/Open+Sans
 * New URL: https://fonts.google.com/specimen/Open+Sans
 */

const OLD_HOSTNAME = 'www.google.com';
const OLD_PATHNAME = '/fonts';

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // By default we'll just redirect to the new Google Fonts home page.
    let redirectUrl = 'https://fonts.google.com/';

    // Parse the current URL.
    let activeTab = new URL(details.url);
    let pathnameParts = activeTab.pathname.split('/');

    // Make sure we're actually on a page we know how to handle.
    if (activeTab.hostname === OLD_HOSTNAME && activeTab.pathname.indexOf(OLD_PATHNAME) === 0) {
      let specimen = pathnameParts[2] === 'specimen' && pathnameParts[3];

      // If we have a specimen, redirect to that instead.
      if (specimen) {
        redirectUrl += 'specimen/' + specimen;
      }

      return {
        redirectUrl
      };
    }
  },
  {
    urls: [
      "*://www.google.com/fonts*",
    ],
    types: [
      "main_frame"
    ]
  },
  [
    "blocking"
  ]
);
