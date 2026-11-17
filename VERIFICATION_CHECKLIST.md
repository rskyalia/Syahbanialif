# Runtime Error Verification Checklist

## Testing Instructions

### 1. Clear Browser Cache
- Open Developer Tools (F12)
- Right-click the refresh button
- Select "Empty Cache and Hard Reload"

### 2. Check Console for Errors

#### Expected: NO inert warning
The following warning should NOT appear:
```
Received an empty string for a boolean attribute `inert`
```

**Fix Applied**: Changed from `inert={!isMobileOpen}` to `{...(!isMobileOpen ? { inert: true } : {})}`

This uses conditional spreading to only add the `inert` attribute when needed, which is the React 19 recommended pattern.

#### Expected: NO call error  
The following error should NOT appear:
```
Cannot read properties of undefined (reading 'call')
```

**Fix Applied**: 
1. Removed `dependencies` option from `useGSAP` in `section-background.jsx`
2. Added explicit `ScrollTrigger` import
3. Removed duplicate `ScrollTrigger` registration in `achievements-section.jsx`

### 3. Test Components

Navigate to each section and verify:

- [ ] Header loads without errors
- [ ] Mobile menu toggle works (click hamburger icon)
- [ ] Mobile menu is properly inert when closed (try tabbing - focus should skip it)
- [ ] Hero Section renders
- [ ] About Section renders
- [ ] Skills Section renders
- [ ] Projects Section renders
- [ ] Journey Section renders
- [ ] **Achievements Section renders** (this was the error source)
- [ ] Contact Section renders

### 4. Test Achievements Section Specifically

- [ ] Achievement cards display with images
- [ ] Hover effects work on cards
- [ ] Click a card to open lightbox
- [ ] Lightbox displays achievement details
- [ ] Close button works
- [ ] Click outside lightbox to close
- [ ] Press ESC to close lightbox
- [ ] GSAP animations trigger on scroll

### 5. Test GSAP Animations

Scroll through the page and verify:
- [ ] Parallax effects work in background
- [ ] Orbs move smoothly
- [ ] Achievement cards stagger in
- [ ] No console errors related to GSAP or ScrollTrigger

## Files Modified

### 1. components/layout/header.jsx
**Line 316**: Fixed inert attribute handling

```jsx
// Before:
inert={!isMobileOpen}

// After:
{...(!isMobileOpen ? { inert: true } : {})}
```

### 2. components/background/section-background.jsx
**Lines 1-8**: Added ScrollTrigger import
**Line 230**: Removed invalid dependencies option

```jsx
// Import added:
import { gsap, useGSAP, ScrollTrigger } from "@/animations/gsap-config";

// useGSAP fixed:
useGSAP(
  () => { /* ... */ },
  { scope: orbsRef }  // Removed dependencies option
);
```

### 3. components/sections/achievements/achievements-section.jsx
**Lines 1-8**: Cleaned up imports to use centralized config

```jsx
// Before:
import { gsap, useGSAP } from "@/animations/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// After:
import { gsap, useGSAP, ScrollTrigger } from "@/animations/gsap-config";
```

## Build Verification

✅ `npm run build` - Compiled successfully in 24.3s
✅ `npm run dev` - Ready in 3s
✅ No build errors
✅ No compilation warnings

## Common Issues & Solutions

### If inert warning persists:
1. Clear .next folder: `rm -rf .next`
2. Clear browser cache completely
3. Hard reload the page (Ctrl+Shift+R)

### If GSAP error persists:
1. Check that all GSAP imports come from `@/animations/gsap-config`
2. Ensure no duplicate plugin registrations
3. Verify `useGSAP` is only used with valid options: `scope` and `revertOnUpdate`
4. Note: `dependencies` is NOT a valid useGSAP option - use React's useEffect dependencies instead if needed

### If AchievementsSection doesn't render:
1. Check browser console for the actual error
2. Verify all image paths exist in `/public/images/experience/`
3. Check that `data/experience.js` exports `achievements` array
4. Ensure `SectionWrapper` and `SectionBackground` are working

## Next Steps After Verification

If errors persist:
1. Take screenshot of actual console error
2. Note the exact line number and file
3. Check if error happens on initial load or after interaction
4. Test in incognito mode to rule out extension conflicts
