# FocusLock AI — Onboarding

An animated 5-screen onboarding flow for **FocusLock AI**, a screen-time / focus
app, built with **Expo (React Native + TypeScript)** to match the Figma design
pixel-for-pixel, screen-for-screen.

<!-- Screens: Lock Distracting Apps · Reduce Screen Addiction · Stay Focused Every Day · Set your daily screen-time goal · Enable Essential Permissions -->

## Screens

| # | Screen | Hero | Interaction / motion |
|---|--------|------|----------------------|
| 1 | **Lock Distracting Apps** | Social app icons orbiting a glowing lock | Constellation slowly revolves, icons stay upright, lock pulses |
| 2 | **Reduce Screen Addiction** | Floating phone + stat cards | Phone & cards drift, violet halo breathes, lock glows |
| 3 | **Stay Focused Every Day** | Pomodoro focus ring | Gradient progress arc sweeps in, play button pulses, streak/score badges float |
| 4 | **Set your daily screen-time goal** | Interactive goal ring | Drag the knob **or** tap 1h/2h/3h/4h — arc, knob and number spring to the value |
| 5 | **Enable Essential Permissions** | Shield badge | Shield breathes, green check springs in, permission rows stagger up |

Every slide shares a dark navy→black gradient backdrop, a violet radial hero
glow, a twinkling starfield, and a gradient CTA. Titles / subtitles / cards
**stagger in** each time a slide becomes active, and the pager dots morph as you
swipe.

## Tech stack

- **Expo SDK 57** · React Native 0.76-era new architecture · React 19 · TypeScript
- **react-native-svg** — orbit rings, progress rings, gradients
- **expo-linear-gradient** — backdrop, buttons, brand icons
- **@expo/vector-icons** (Ionicons) — all UI + brand glyphs
- **@expo-google-fonts/poppins** — the geometric-rounded type in the design
- Animations use React Native's built-in **Animated API + PanResponder** (no extra
  runtime deps, no worklets/babel setup).

## Run it

```bash
npm install
npx expo start        # then press i (iOS), a (Android), or w (web)
# or directly:
npm run ios
npm run android
npm run web
```

Requires the [Expo Go](https://expo.dev/go) app (or a simulator/emulator) to
preview on a device.

## Project structure

```
App.tsx                     # fonts + splash, onboarding <-> "all set" state
index.ts                    # Expo entry
src/
  theme/                    # colors, typography (Poppins), layout tokens
  components/               # GradientBackground, Starfield, PagerDots,
                            #   PrimaryButton, FeatureRow, StatCard, SlideLayout, …
  illustrations/            # OrbitIllustration, PhoneIllustration, PomodoroRing,
                            #   GoalRing, ShieldBadge  (SVG + Animated)
  screens/
    OnboardingScreen.tsx    # swipeable pager + pinned dots/CTA/footer
    slides/                 # Slide1…Slide5
```

## Notes on fidelity

- **Fonts:** the design's rounded-geometric display face is matched with
  **Poppins** (ExtraBold titles, Regular/SemiBold body).
- **Pager dots:** rendered as **5 progressing dots** in the design's exact pill
  style (the mockups showed a static 3-dot placeholder; 5 dots reflect the 5
  real steps).
- The **goal ring** is fully interactive — drag or tap to change the target; the
  ring, knob and number animate to the new value.
