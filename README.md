# React + Vite

## Demo request email

The demo form sends email through Resend from the Cloudflare Worker. Verify a sender domain in Resend, then configure `DEMO_FROM_EMAIL` (a verified sender address) and the secret `RESEND_API_KEY` in the Worker environment. Requests are delivered to `support@pathwise.systems` with the visitor's email as the reply-to address. Without these settings, the form reports that delivery is unavailable.

To test the endpoint locally, build the app and run `npx wrangler dev` with `RESEND_API_KEY` and `DEMO_FROM_EMAIL` configured in a local `.dev.vars` file. The Vite-only dev server does not run the Worker. Run validation tests with `node --test tests/demo-request.test.js`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
