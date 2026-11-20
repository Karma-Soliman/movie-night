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

## Lab 3

#### 1. `NavLink` uses `usePathname`, a hook that only works in Client Components. Yet the page source of `/movies/2` already contains `aria-current="true"` on the Movies link. How is this possible?
* Client components also render HTML on the server for the first load. Next.js knows the pathname, so the active link is already marked before the browser adds interactivity.

#### 2. Why does `generateStaticParams` return `String(movie.id)` and not `movie.id`? And why does `/movies/42` give a 404 in Part C without running the code of the page?
* URL parameters must be strings. With `dynamicParams = false`, only the IDs returned by `generateStaticParams` are allowed, so Next.js rejects `42` before rendering the page.

#### 3. In Part D, why is the note kept between `/movies` and `/movies/2`, and lost when you go through `/about`?
* Both movie pages share the movies layout, so its input stays in place during navigation. Going to `/about` removes that layout, so the note is lost.

#### 4. In Part E, step 4, where is the real message of the error, and why does Next.js not send it to the browser?
* In production, the real message is in the server logs (the terminal). Next.js sends a generic message to the browser to avoid exposing sensitive information.

#### 5. Under `npm run dev`, "Loading the movies..." appears when you open `/movies/2`. Under `npm start` it does not, but it still appears on `/movies`. Why?
* In development, `/movies/2` is rendered on demand. In production, it is already generated at build time. `/movies` uses `force-dynamic`, so it still waits for the one-second data load on each request.

## Lab 4

#### 1. Which seven API calls happen during the build, and why is each movie fetched only once?
* One call to `/api/movies` gets the IDs, then six calls to `/api/movies/1` through `/api/movies/6` get the movies. Next.js shares identical GET requests between `generateMetadata` and the page during rendering.

#### 2. In break 3, where did `MOVIES_API_KEY` end up, who can read it, and where should it be used instead?
* It ended up in the generated HTML, so any visitor could read it. The key should only be used in server code, never rendered on the page.

#### 3. Why does Next.js refuse a function prop and a `server-only` import in a Client Component?
* A normal function cannot be serialized into the data sent from server to browser. A server-only import is blocked because that code must stay on the server.
