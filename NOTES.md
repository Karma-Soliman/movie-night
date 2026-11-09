#### In which file are the `<html>` and `<body>` tags?
* `app/layout.tsx`.

#### Which file renders the page at /?
* `app/page.tsx`.

#### Which folder is for images and other static files, and how do you reference them?

* The `public` folder. It is referenced as the file's name.

#### What is  tsconfig.json  doing in your project?
* It sets the TypeScript options for the project.

#### What does @/* mean in tsconfig.json? Write an import that uses it.
* It lets you import from the project root. Example: `import "@/app/globals.css";`

#### What does app/layout.tsx import from next/font/google, and what does Next.js do with it at build time?
* It imports `Geist` and `Geist_Mono`. Next.js downloads the fonts at build time and serves them with the app.

#### What’s the difference between layout.tsx and page.tsx?
* `layout.tsx` is the shared structure. `page.tsx` is the content for a specific page.

#### Where would you put a navbar that appears on every page?
* In `app/layout.tsx`, before `{children}` inside the body.

#### What is globals.css for, and where is it imported?
* It contains styles for the whole app. It is imported in `app/layout.tsx`.

#### What is AGENTS.md, and does your app need it to run?
* It gives instructions to AI coding assistants. No, the app does not need it to run.
