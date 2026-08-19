SERENITY MEDICAL CENTER — LANGUAGE SWITCH TOPBAR

Requested change:
Move the EN / FR language switch from the main navigation into the dark utility/top menu bar.

IMPORTANT:
- Nothing has been committed to GitHub.
- You will push the change yourself.
- This is designed as a site-wide change because all pages already use assets/app.js and assets/styles.css.

Apply:

1. Add app-js-addition.txt to the END of:
   assets/app.js

2. Add styles-css-addition.txt to the END of:
   assets/styles.css

The JavaScript automatically relocates the existing .language-switch into
the .topbar on every page, so you do NOT need to edit each HTML page.

Result:
- EN / FR sits in the top dark utility bar.
- Main navigation becomes cleaner and less crowded.
- The switch retains its active-pill styling.
- Desktop and mobile layouts are handled.
- Existing language-switch click behaviour remains intact because the
  existing app.js listener runs before/after the move without changing the
  element itself.
