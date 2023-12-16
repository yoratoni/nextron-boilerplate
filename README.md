# Nextron Boilerplate
A Nextron & EsLint boilerplate entirely configured to suit my standards.

Summary
-------
You can find here a list of the main features of this boilerplate:
- [TypeScript](https://www.typescriptlang.org/) support.
- [Nextron](https://github.com/saltyshiomix/nextron) support.
- [Webpack](https://webpack.js.org/) support.
- [EsLint](https://eslint.org/) support (already configured).
- [DotEnv](https://github.com/motdotla/dotenv) support (allow sharing between main & renderer).
- [TailwindCSS](https://tailwindcss.com/) support.
- [Next.js Electron Server](https://www.npmjs.com/package/next-electron-server) support.

Here's the list of the main EsLint rules:
- **[ERROR]** UNIX linebreaks.
- **[ERROR]** Required semi-colons.
- **[ERROR]** No comma dangle.
- **[WARN]** Recommended double quotes.
- **[WARN]** Two new lines after imports.
- **[WARN]** No unused variables.
- **[WARN]** EsLint sorted imports (auto-sorted with VSCode).

Notes
-----
- [Next.js Electron Server](https://www.npmjs.com/package/next-electron-server) allows better
mounting of Next.js in Electron as described [here](https://github.com/saltyshiomix/nextron/issues/247#issue-1176892986).
- The `.env` file is shared between the main & renderer processes. All variables declared in the `.env` file
are also exposed to Next.js through `process.env`.
- You can use `types/env.d.ts` to declare your environment variable types in both the main & renderer processes.