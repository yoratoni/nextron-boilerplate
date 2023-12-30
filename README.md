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
- The `.env` file is shared between the main & renderer processes. To allow variables to be used in the renderer
process, you need to prefix them with `NEXT_PUBLIC_`.
- The default configuration of the window can be found in `main/configs/window.config.ts`.
- You can use `types/env.d.ts` to declare your environment variable types in both the main & renderer processes.
- `child` variants has been added to TailwindCSS.