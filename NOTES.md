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

#### In the page source, are the movie titles present for `/movies`? For `/movies-client`? Why?
* Yes for `/movies`, because the server renders the movies. No for `/movies-client`, because it loads them in the browser after the page loads.

#### Without the `force-dynamic` line of Part E, you run `npm run build` again tomorrow, then `npm start`, without changing anything else. What does the "Rendered at" timestamp of `/movies` show, and why?
* It shows tomorrow's build time, because the page is generated during the build. It stays the same when you refresh.

#### Part E made every request to `/movies` about one second slower. Give one situation where `force-dynamic` is still the right choice, and explain why.
* When showing live ticket availability, because each request needs the latest data.

#### A classmate sees `[movies] rendered 6 movies` in the browser console and says: "So this code runs in the browser." What do you answer, and how can you prove it?
* It runs on the server. Next.js can forward server logs to the browser during development. Check the terminal log, or disable JavaScript and reload `/movies`.

#### Which version would you choose for a public movie catalogue that changes once a week, and why?
* The static server-rendered version, without `force-dynamic`. It loads quickly, includes the titles for search engines, and can be rebuilt when the catalogue changes.
