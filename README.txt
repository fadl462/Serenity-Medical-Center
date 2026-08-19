SERENITY MEDICAL CENTER — ACTUAL MAP PREVIEW FIX

You were correct: the previous map area was only a decorative placeholder.
The intended design should show a real, interactive Google Maps preview.

I have NOT committed anything to GitHub.

Apply these two changes to contact.html:

1. Replace the existing:
   <section class="map-section contact-map-section"> ... </section>
   with contact-map-section.html from this package.

2. In the page-specific <style> block, add/replace the map styling with:
   contact-map-css.txt

The result:
- Real Google Maps preview visible directly inside the map card.
- Existing Serenity location information remains over the map.
- "Open in Google Maps" still opens the full Google Maps location.
- Responsive on desktop and mobile.
- No API key is required for this standard Google Maps embed URL.
