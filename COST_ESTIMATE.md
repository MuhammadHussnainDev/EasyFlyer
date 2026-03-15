# Production-Readiness Fix — Time & Cost Estimate

This document estimates the time and cost an **Associate Software Engineer based in
Lahore, Pakistan** would have needed to research, implement, and verify all of the
production-readiness fixes that were applied to this codebase.

---

## Basis for the Estimate

All estimates are for an **associate-level** developer (1–2 years React Native /
TypeScript experience) working independently. The time includes:

- Reading and understanding the existing code before touching it.
- Researching the correct fix (docs, Stack Overflow, etc.).
- Writing and verifying the change locally.
- Light manual testing / sanity-check of the affected screen or flow.

It does **not** include PR review rounds, QA sign-off, or deployment.

---

## Task-by-Task Breakdown

| # | Task | Files Changed | Estimated Hours |
|---|------|--------------|-----------------|
| 1 | **Understand the codebase** — read navigation, Redux setup, Firebase wiring, existing screens before making any change | All | 3.0 h |
| 2 | **Fix `AuthContext.js` infinite loop** — identify that `[userData]` inside `useEffect` that sets `userData` causes an infinite re-render; change to `[]` | `lib/AuthContext.js` | 1.5 h |
| 3 | **Fix `App.tsx` infinite loop** — same `[user]` pattern; change to `[]` | `App.tsx` | 0.5 h |
| 4 | **Sign-in screen — controlled inputs, validation, loading state** — add `email`/`password` state, email regex, min-password check, spinner, disabled-button style | `App/Screens/sign-in/index.tsx` | 2.5 h |
| 5 | **Sign-up screen — typo & `@ts-expect-error` fix** — fix `"EasyFllyer"` typo, replace cast with `error instanceof Error`, remove dead commented code | `App/Screens/sign-up/index.tsx` | 0.5 h |
| 6 | **Home screen — error state, `useCallback`, proper types** — add error UI + Retry, extract `loadStores` into `useCallback`, wrap `renderStoreItem`, replace `any` with `Entity`/`RootState`, replace external placeholder URL with local asset | `App/Screens/home/index.tsx` | 3.0 h |
| 7 | **`Flyers.tsx` — error state, unmount guard, type cleanup** — add error UI + Retry, add `isMountedRef`, remove unused `mediaLink` prop (source of `@ts-expect-error`), remove debug `console.log` | `App/components/Flyers.tsx` | 2.5 h |
| 8 | **`store-flyers.tsx` — error state, null-image guard, types** — add error UI + Retry, add `StoreFlyer` interface, null-check `item.image`/`item.storeImage`, wrap `loadFlyers` in `useCallback`, add `isMountedRef` | `App/components/store-flyers.tsx` | 3.0 h |
| 9 | **Redux state reset on logout** — add `resettableRootReducer` with `AnyAction` typing in `store.ts`; dispatch `RESET_STATE` + call `persistor.purge()` on logout in `AuthContext.js` | `store/store.ts`, `lib/AuthContext.js` | 1.5 h |
| 10 | **Remove debug `console.log` in Redux slices** — remove state-dumping logs in `brandSlice.js` and `eventSlice.js` | `store/slices/brandSlice.js`, `store/slices/eventSlice.js` | 0.25 h |
| 11 | **Security — credentials & `.env`** — add `.env*` to `.gitignore`, create `.env.example`, remove committed developer credentials from `firebase.js` comments, add migration note | `.gitignore`, `.env.example`, `lib/firebase.js` | 1.25 h |

---

## Total Estimated Hours

| Category | Hours |
|----------|-------|
| Codebase familiarisation | 3.0 h |
| Bug fixes (infinite loops) | 2.0 h |
| UI / UX improvements | 6.0 h |
| Type safety & code quality | 5.5 h |
| Security | 1.25 h |
| Redux / state management | 1.75 h |
| **Grand Total** | **~20 hours** |

> **Range:** A faster associate might complete this in **16 hours**; a slower or
> less-experienced one might need up to **24 hours** — especially if they spend extra
> time on TypeScript generics or the Redux persist reset pattern.  The mid-point
> estimate of **20 hours** is used for the cost calculation below.

---

## Market Rate — Associate Software Engineer, Lahore, Pakistan

### Freelance / Client-Facing Rate

Pakistani associate-level React Native / TypeScript developers billing international
clients (e.g., via Upwork, direct contract) typically charge:

| Experience level | Typical hourly rate (USD) |
|------------------|--------------------------|
| Junior (< 1 yr) | $5 – $8 / hr |
| **Associate (1–2 yrs)** | **$10 – $15 / hr** |
| Mid-level (3–4 yrs) | $18 – $28 / hr |

A **$12/hr** rate (mid-point of the associate band) is used as the base.

### Cost Calculation

```
Estimated hours  : 20 h
Hourly rate      : $12 / hr
──────────────────────────────
Subtotal         : $240
Recommended buffer (15 % for  
  scope creep & revisions)  : + $36
──────────────────────────────
Total to charge  : ~$276  (≈ PKR 77,000 at ≈280 PKR/USD)
```

### Recommended Invoice to Client

| Line item | Hours | Rate | Amount |
|-----------|-------|------|--------|
| Codebase audit & code review | 3.0 h | $12 | $36 |
| Critical bug fixes (infinite loops) | 2.0 h | $12 | $24 |
| UI/UX improvements (validation, error states) | 6.0 h | $12 | $72 |
| Type safety & code quality | 5.5 h | $12 | $66 |
| Security hardening | 1.25 h | $12 | $15 |
| Redux / state management | 1.75 h | $12 | $21 |
| Contingency / revisions (15 %) | — | — | $36 |
| **Total** | **~20 h** | | **≈ $270** |

> **In Pakistani Rupees (PKR):** approximately **PKR 75,000 – 78,000**
> (rate fluctuates; verify the current USD/PKR rate before invoicing).

---

## Key Notes for the Client Conversation

1. **These were not cosmetic changes.** The infinite-loop bugs and the missing error
   states would have caused the app to crash or appear frozen for real users — not
   just edge cases.

2. **The missing sign-in validation** meant any user could tap LOGIN with an empty
   form and be navigated into the app with no authentication performed.

3. **The hard-coded Firebase credentials** in version control are a security issue;
   had this repo been public, those keys would have been exposed.

4. **The Redux stale-data bug** would have caused one user's watchlist and favourites
   to bleed over to the next user session on a shared device.

5. A flat-fee quote of **$270 (≈ PKR 76,000)** is fair and competitive for the
   Lahore market for this scope of work.
