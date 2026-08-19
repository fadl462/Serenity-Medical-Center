SERENITY MEDICAL CENTER — FINAL HEADER + MAP FIX

This is a NON-COMMIT patch. Nothing has been pushed to GitHub.

Two problems are being fixed:

1. EN / FR language switch
   - The existing switch is physically moved from the white main navigation
     into the dark utility/topbar.
   - No duplicate language switch is created.
   - Existing EN/FR active-state behaviour is preserved.

2. Contact-page map
   - The decorative diagonal-line placeholder is removed automatically.
   - A real Google Maps preview is inserted into the existing map card.
   - The existing Serenity location information card remains on top of the map.
   - No Google Maps API key is required for this preview.

APPLY:

A) Open:
   assets/app.js

   Paste the complete contents of:
   app.js-addition.txt
   at the END of the existing file.

B) Open:
   assets/styles.css

   Paste the complete contents of:
   styles.css-addition.txt
   at the END of the existing file.

IMPORTANT:
- Do not replace the existing app.js or styles.css.
- Do not delete existing code.
- Do not commit.
- After pushing, hard-refresh the site with Ctrl + F5.

EXPECTED RESULT:

TOP BAR:
YAOUNDÉ · CAMEROON   Care · Innovation · Quality   +237 683 539 388                 EN  FR

MAIN NAV:
About · Services · Digital Health · Foundation · Community · Gallery · Partner · Book a Visit

CONTACT MAP:
The diagonal decorative placeholder is gone and a real interactive Google Maps
preview occupies the map area, with the Serenity location card overlaid.
