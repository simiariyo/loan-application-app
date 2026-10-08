# VendorCredit Loan Application

A web app where a customer signs up or signs in with Firebase Authentication, applies for a loan, and sees the loans they have applied for. Built for the VendorCredit frontend assessment.

Stack: React 19, TypeScript, Vite, React Router, React Query, React Hook Form, Tailwind CSS, Firebase Authentication and Cloud Firestore.

## Repository layout

```
loan-application-app/
  vendor-credit-web/   React app
  firestore.rules      Firestore security rules
```

## Running it locally

Requirements: Node.js 22 or newer and a Firebase project.

1. Clone the repository and install dependencies:

   ```
   git clone https://github.com/simiariyo/loan-application-app.git
   cd loan-application-app/vendor-credit-web
   npm install
   ```

2. Set up Firebase:
   - In the Firebase console, open Authentication and enable the Email/Password sign-in method.
   - Create a Cloud Firestore database.
   - Open Firestore > Rules, replace the default rules with the contents of `firestore.rules`, and publish.
   - Register a web app in Project settings to get the config values.

3. Copy `.env.example` to `.env.local` in `vendor-credit-web` and fill in the values from the Firebase web app config.

4. Start the app:

   ```
   npm run dev
   ```

`npm run build` type-checks the project and builds it for production.

## Environment variables

All variables live in `vendor-credit-web/.env.local`, which is ignored by git. `.env.example` lists them without values.

| Variable                            | Firebase config field |
| ----------------------------------- | --------------------- |
| `VITE_FIREBASE_API_KEY`             | apiKey                |
| `VITE_FIREBASE_AUTH_DOMAIN`         | authDomain            |
| `VITE_FIREBASE_PROJECT_ID`          | projectId             |
| `VITE_FIREBASE_STORAGE_BUCKET`      | storageBucket         |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId     |
| `VITE_FIREBASE_APP_ID`              | appId                 |

The app stops with a clear error message if these are missing.

## What works

- Sign up with full name, email and password. The full name is saved as the Firebase user's display name.
- Sign in with email and password, with a show and hide toggle on the password field.
- Field validation messages, and Firebase error codes mapped to specific messages (email already in use, invalid email, weak password, incorrect email or password, too many attempts, network failure).
- Signed-out users cannot reach the loan pages, and signed-in users are sent past the sign-in and sign-up pages.
- Loan application with amount, purpose and term. The amount shows naira formatting while typing and is stored as a plain number. The term can be entered in months or years and is always stored as `termMonths`.
- Loading, success and error states on submission. A failed submission keeps what the user typed.
- Loan history for the signed-in customer, with loading, empty and error states and a retry button.
- Firestore rules that only let a user read and create their own loans, and that check the amount, term, purpose and status on the server.

## What does not work, and why

- **The .NET CRUD API was not built.** The brief asks for a .NET API to save, edit and fetch loan applications. With the time available I chose to finish and test the frontend instead of submitting an API that did not run reliably. All loan data calls go through `src/services/loanService.ts`, which currently talks to Firestore directly. Adding the API would mean changing that one file to call the API endpoints with the Firebase ID token; the pages and hooks would not change.
- **Editing a loan.** The brief lists editing as an API responsibility and does not include an edit screen. Without the API there is no edit flow, so the Firestore rules block updates and deletes.
- **Not included:** password reset, email verification, an approval workflow (every loan is stored as `pending`), interest or repayment calculations, Firebase Hosting and automated tests.

## Decisions and assumptions

- The brief mentions Vue in the objective and React in the stack and deliverables. I raised this with the recruiter and built it in React.
- Amount: required, whole naira, greater than zero. The brief sets no minimum or maximum, so none is enforced.
- Term: required, whole number greater than zero, in months or years. No upper limit, for the same reason.
- Loan purposes: Business, Education, Medical, Personal, Home improvement.
- A show-password toggle is used instead of a confirm-password field, which keeps sign up to the three fields in the brief.
- New Firebase projects have email enumeration protection on, so a wrong password and an unknown email return the same error and share one message.
- Loan history is sorted in the app rather than with a Firestore `orderBy`, which would need a composite index set up in every Firebase project that runs this code.

## AI assistance

I used Claude for planning, code review and help writing parts of the code, and Lovable to explore the visual direction. I reviewed and tested every file and can explain any part of it.

The VendorCredit logo and brand colours belong to VendorCredit and are used only for this assessment.
