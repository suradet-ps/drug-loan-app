# Drug Loan Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Vue v3](https://img.shields.io/badge/Vue-v3-4FC08D.svg?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript v5](https://img.shields.io/badge/TypeScript-v5-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite v7](https://img.shields.io/badge/Vite-v7-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase v2](https://img.shields.io/badge/Supabase-v2-3FCF8E.svg?logo=supabase&logoColor=white)](https://supabase.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/suradet-ps/drug-loan-app/issues)

---

## ◆ PULSE

A loaned drug is a debt with a countdown. When one hospital borrows from
another, someone must know how much went out, how much came back, and
when the silence has gone on too long. This system tracks every drug loan
and return between partner hospitals - a real-time dashboard for
outstanding balances, a progress bar per loan, and a complete
transaction history for the audit. The debt is always visible; the
accountability is the point.

| Auth ▣ | Loans ▣ | Returns ▣ | History ▣ |
|---|---|---|---|

*The full loop - record, track, return, audit - is sealed.*

> Built with Vue 3 + TypeScript + Pinia, backed by Supabase Auth and a
> real-time database, written for the pharmacists of Sabot Hospital.
>
> **suradet-ps**, artifact keeper

---

## ◆ IGNITION

One package manager, four commands.

```
⟫ pnpm install
⟫ pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

```
⟫ pnpm build          # type-check, then production build
⟫ pnpm test:unit      # Vitest
⟫ pnpm lint           # ESLint + Oxc
⟫ pnpm format         # Prettier
```

<details>
<summary>Environment</summary>

A `.env` file with the Supabase credentials from Project Settings > API:

```
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

</details>

---

## ◆ ANATOMY

One SPA, one ledger, two directions of trust.

- **Authenticates** - Supabase Auth gates the door; a pharmacist who
  cannot sign in cannot see a single patient-adjacent quantity.
- **Loans** - a dedicated form records the loan as it happens: which
  drug, how much, to which partner hospital, on which date. The ledger
  entry is born complete.
- **Returns** - processing a return walks against the existing loans, so
  a quantity lands back where it belongs instead of floating in a
  comment.
- **Tracks** - the dashboard shows outstanding loans and the total
  quantity pending return; each active loan carries its return status and
  a progress bar. The overdue story tells itself.
- **Remembers** - every loan and every return is a row in the
  transaction history, timestamped and reviewable - the audit trail is
  the product's spine.
- **Speaks** - Pinia keeps the state consistent across components and
  TypeScript keeps the whole codebase type-safe, from store to screen.

---

## ◆ RITUALS

**The core ceremony** - the loan and its return:

1. Sign in. The dashboard answers first: what is outstanding, how much
   is pending return.
2. Record a loan: drug, quantity, partner hospital, date. The progress
   bar for that loan is born empty.
3. When the boxes come back, process the return against the loan. The
   quantity lands, the bar moves, the balance updates.
4. Audit anytime: the transaction history holds every entry, in order,
   for reference.

**The ceremony of the balance** - no number is trusted to memory. The
outstanding total is computed, the per-loan progress is rendered, and
the history is immutable to the eye: what went out and what came back,
side by side.

**The ceremony of the record** - every action is typed, stored, and
queryable. If a question is asked six months later, the answer is a
filter away.

---

## ◆ ECHOES

**Where this artifact is heading**

```
auth     ▸ Supabase Auth gate ─────────────────────────────────────── ▸ sealed
ledger   ▸ loan + return forms against real-time balances ─────────── ▸ sealed
audit    ▸ complete transaction history, per-loan progress ────────── ▸ sealed
```

**Raising the artifact** - the bar is local and explicit: `vue-tsc`
type-checking, Vitest unit tests, ESLint + Oxc linting, and Prettier
formatting all pass before a pull request earns a review. Open an issue
first to discuss a change.

**Status** - quality gates are run per-contributor (this repo carries no
CI workflow yet); contributions are welcome through the usual fork and
pull request path.

---

```
  ─────────────────────────────────────────
   A loan is only as honest
   as the ledger that remembers it.
  ─────────────────────────────────────────
```

Open source under the [MIT License](LICENSE).