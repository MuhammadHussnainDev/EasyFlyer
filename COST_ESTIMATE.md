# EasyFlyer — Production-Readiness Work Estimate

> **Client Message**
> Below is a detailed breakdown of the work that needs to be carried out on the
> EasyFlyer codebase to bring it to a production-ready state. Each task includes a
> time estimate and the corresponding cost at our agreed rate of **PKR 500 / hour**.

---

## Rate

| | |
|---|---|
| Developer level | Associate Software Engineer, Lahore, Pakistan |
| Hourly rate | **PKR 500 / hour** |

---

## Section 1 — Development Tasks

### 1.1 Codebase Audit & Understanding

Before any fixes can be applied, the entire codebase needs to be read and understood
— navigation structure, Redux/state setup, Firebase integration, and all existing
screens.

| | |
|---|---|
| Estimated time | **3.0 hours** |
| Cost | **PKR 1,500** |

---

### 1.2 Fix Startup Infinite Loop in `AuthContext.js`

The authentication context has a `useEffect` whose dependency array includes the
same state variable that the effect itself updates (`userData`). This causes the app
to enter an infinite re-render loop every time it launches. The dependency array
needs to be corrected so the effect runs only once on mount.

| | |
|---|---|
| File | `lib/AuthContext.js` |
| Estimated time | **1.5 hours** |
| Cost | **PKR 750** |

---

### 1.3 Fix Startup Infinite Loop in `App.tsx`

`App.tsx` contains the same infinite-loop pattern — a `useEffect` that reads and
sets `user` state while listing `user` in its dependency array. This needs to be
corrected alongside the fix in `AuthContext.js`.

| | |
|---|---|
| File | `App.tsx` |
| Estimated time | **0.5 hours** |
| Cost | **PKR 250** |

---

### 1.4 Sign-In Screen — Controlled Inputs, Validation & Loading State

The sign-in screen currently uses uncontrolled inputs and performs no validation
before calling Firebase. The following work needs to be done:

- Wire up controlled `email` and `password` state.
- Validate email format with a regex before submission.
- Enforce a minimum password length (6 characters).
- Show a loading spinner while the sign-in request is in flight.
- Disable the LOGIN button during loading to prevent duplicate requests.
- Apply a visually distinct disabled style to the button.

| | |
|---|---|
| File | `App/Screens/sign-in/index.tsx` |
| Estimated time | **2.5 hours** |
| Cost | **PKR 1,250** |

---

### 1.5 Sign-Up Screen — Typo Fix, Type Safety & Dead-Code Cleanup

Three small but important corrections need to be made to the sign-up screen:

- Fix the app title typo (`"EasyFllyer"` → `"EasyFlyer"`).
- Replace an unsafe type cast that suppresses a TypeScript error with a proper
  `error instanceof Error` guard.
- Remove commented-out dead code that is no longer used.

| | |
|---|---|
| File | `App/Screens/sign-up/index.tsx` |
| Estimated time | **0.5 hours** |
| Cost | **PKR 250** |

---

### 1.6 Home Screen — Error State, Performance & Type Safety

The Home screen currently shows a blank white screen whenever a network request
fails, with no way for the user to recover. The following improvements need to be
made:

- Add an error state with a user-facing message and a **Retry** button.
- Wrap `loadStores` in `useCallback` with correct dependencies to avoid unnecessary
  re-fetches.
- Wrap `renderStoreItem` in `useCallback` to prevent unnecessary re-renders of the
  list.
- Replace all `any` type annotations with proper `Entity` and `RootState` types.
- Replace the hard-coded external placeholder image URL with a local asset so the
  app works offline.

| | |
|---|---|
| File | `App/Screens/home/index.tsx` |
| Estimated time | **3.0 hours** |
| Cost | **PKR 1,500** |

---

### 1.7 `Flyers.tsx` — Error State, Unmount Guard & Type Cleanup

The Flyers component has the same blank-screen-on-error problem, plus a potential
state-update-after-unmount crash. The following work needs to be done:

- Add an error state with a **Retry** button.
- Add an `isMountedRef` guard so that asynchronous callbacks do not attempt to
  update state after the component has been unmounted (prevents a common React
  Native crash).
- Remove the unused `mediaLink` prop that is the source of a suppressed TypeScript
  error.
- Remove a `console.log` debug statement that was left in production code.

| | |
|---|---|
| File | `App/components/Flyers.tsx` |
| Estimated time | **2.5 hours** |
| Cost | **PKR 1,250** |

---

### 1.8 `store-flyers.tsx` — Error State, Null-Image Guard & Type Safety

The Store Flyers component has multiple issues that need to be resolved:

- Add an error state with a **Retry** button.
- Guard against `item.image` and `item.storeImage` being `null` or `undefined` —
  passing `undefined` as an `<Image>` `uri` crashes on Android.
- Introduce a `StoreFlyer` TypeScript interface to replace the current `any` types
  throughout the component.
- Wrap `loadFlyers` in `useCallback` and add an `isMountedRef` unmount guard (same
  reasons as `Flyers.tsx` above).

| | |
|---|---|
| File | `App/components/store-flyers.tsx` |
| Estimated time | **3.0 hours** |
| Cost | **PKR 1,500** |

---

### 1.9 Redux — State Reset on Logout

Currently, when a user logs out, the Redux store retains all of their data
(favourites, brands, events). If a second user logs in on the same device they will
see the first user's data until the app is fully restarted. The fix requires:

- Adding a `resettableRootReducer` wrapper in `store.ts` that resets all slices to
  their initial state when a `RESET_STATE` action is dispatched.
- Dispatching `RESET_STATE` and calling `persistor.purge()` inside the logout flow
  in `AuthContext.js` so AsyncStorage is also cleared.

| | |
|---|---|
| Files | `store/store.ts`, `lib/AuthContext.js` |
| Estimated time | **1.5 hours** |
| Cost | **PKR 750** |

---

### 1.10 Remove Debug Logging from Redux Slices

Both `brandSlice.js` and `eventSlice.js` contain `console.log(JSON.stringify(state))`
calls that fire on every Redux state change. These need to be removed before the app
goes to production as they degrade performance and leak state data to the console.

| | |
|---|---|
| Files | `store/slices/brandSlice.js`, `store/slices/eventSlice.js` |
| Estimated time | **0.25 hours** |
| Cost | **PKR 125** |

---

### 1.11 Security — Environment Variables & Credential Hardening

Firebase configuration keys are currently committed directly to source control. If
the repository is ever made public (or accessed by an unauthorised party), those
credentials could be used to access or abuse the Firebase project. The following
security work needs to be done:

- Add `.env`, `.env.local`, and `.env.production` to `.gitignore` so secret files
  can never be accidentally committed.
- Create a `.env.example` file that documents every required environment variable
  without containing any real values, making it safe to commit.
- Remove the hard-coded credentials from `firebase.js` and add a comment directing
  the team to load them from environment variables before going to production.

| | |
|---|---|
| Files | `.gitignore`, `.env.example`, `lib/firebase.js` |
| Estimated time | **1.25 hours** |
| Cost | **PKR 625** |

---

## Section 2 — PR Review Rounds

Each pull request needs to go through at least **two review rounds** before it can
be merged. Each round includes reading the diff, leaving comments, and
addressing/re-reviewing the feedback.

| Round | Description | Estimated Time | Cost |
|-------|-------------|---------------|------|
| Round 1 | Initial review of all changes, raise comments | 1.0 h | PKR 500 |
| Round 2 | Re-review after feedback is addressed, final approval | 0.5 h | PKR 250 |
| **PR Review Total** | | **1.5 hours** | **PKR 750** |

---

## Section 3 — QA Sign-Off

After the changes are merged, a QA pass needs to be performed on a real device (or
emulator) to verify every affected screen and flow.

| Test area | What needs to be verified | Estimated Time | Cost |
|-----------|--------------------------|---------------|------|
| App startup | No crash, no infinite loop, auth state loads correctly | 0.5 h | PKR 250 |
| Sign-in & Sign-up | Validation messages, loading spinner, error handling, navigation | 0.75 h | PKR 375 |
| Home screen | Stores load correctly; error state + Retry works when offline | 0.5 h | PKR 250 |
| Flyers & Store Flyers | Images load; null-image fallback renders; error state + Retry works | 0.75 h | PKR 375 |
| Logout & re-login | Redux store is cleared; second user does not see first user's data | 0.5 h | PKR 250 |
| Security check | Firebase credentials are no longer visible in committed files | 0.25 h | PKR 125 |
| **QA Total** | | **3.25 hours** | **PKR 1,625** |

---

## Section 4 — Deployment

Once QA is signed off, the changes need to be deployed to the relevant environments.

| Step | Description | Estimated Time | Cost |
|------|-------------|---------------|------|
| Staging deployment | Build and push the app to the staging / internal-test track | 0.5 h | PKR 250 |
| Smoke test on staging | Verify key flows on the deployed staging build | 0.5 h | PKR 250 |
| Production deployment | Build and submit the production release (App Store / Play Store) | 0.75 h | PKR 375 |
| **Deployment Total** | | **1.75 hours** | **PKR 875** |

---

## Grand Total Summary

| Section | Hours | Cost (PKR) |
|---------|-------|-----------|
| **1.1** Codebase audit & understanding | 3.00 h | 1,500 |
| **1.2** Fix infinite loop — `AuthContext.js` | 1.50 h | 750 |
| **1.3** Fix infinite loop — `App.tsx` | 0.50 h | 250 |
| **1.4** Sign-in: inputs, validation, loading state | 2.50 h | 1,250 |
| **1.5** Sign-up: typo, type safety, dead code | 0.50 h | 250 |
| **1.6** Home screen: error state, performance, types | 3.00 h | 1,500 |
| **1.7** `Flyers.tsx`: error state, unmount guard, cleanup | 2.50 h | 1,250 |
| **1.8** `store-flyers.tsx`: error state, null guard, types | 3.00 h | 1,500 |
| **1.9** Redux state reset on logout | 1.50 h | 750 |
| **1.10** Remove debug logging from Redux slices | 0.25 h | 125 |
| **1.11** Security: env vars & credential hardening | 1.25 h | 625 |
| **2** PR review rounds (×2) | 1.50 h | 750 |
| **3** QA sign-off | 3.25 h | 1,625 |
| **4** Deployment (staging + production) | 1.75 h | 875 |
| | | |
| **GRAND TOTAL** | **26.0 hours** | **PKR 13,000** |

---

> Please feel free to reach out if you have any questions about any of the items
> listed above. All estimates assume a single developer working independently at
> the agreed rate of PKR 500 / hour.
