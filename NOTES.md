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

## Lab 4, part 2

| Page | Fetch option | Expected build output | Actual build output |
|---|---|---|---|
| `/movies` | `next: { revalidate: 10 }` | ○ with 10s (ISR) | ○ with 10s revalidate and 1y expire |
| `/movies/[id]` | `cache: "force-cache"` | ● (SSG) | ● for all six movie pages |

### Part F: home page timing

| Step | First byte (seconds) | Total (seconds) |
|---|---|---|
| 1. Sequential requests, without Suspense | 2.641763 | 2.642621 |
| 2. Sequential requests, with Suspense | 0.081710 | 2.592234 |
| 3. Parallel requests with Promise.all and Suspense | 0.058992 | 1.564175 |

* In Step 1, the requests ran one after the other with `no-store`, without Suspense.
* The production page returned HTTP 200. Both timings are about 2.5 seconds because the page waits for both requests before sending its HTML.
* In Step 3, Suspense sends the heading and fallback quickly. Promise.all runs both requests together, reducing the total to about 1.5 seconds.

### Part H: when the API is down

| Page | What I saw | Why, with the strategy of the page |
|---|---|---|
| `/movies` | The movie list still appears. | ISR keeps serving the last good page when regeneration fails. |
| `/movies/2` | Inception's details and the shortlist button still appear. | SSG serves the page generated during the build, without calling the API. |
| `/` | An error screen saying "This page couldn't load". | SSR needs fresh movies and votes on each request. With the API stopped, the uncached requests fail. |
| `/movies-client` | "The movies could not be loaded. Is the Movie API running?" | CSR fetches in the browser, and the failed request triggers the error message. |

* With the API stopped, the app terminal showed `TypeError: fetch failed`, caused by `connect ECONNREFUSED 127.0.0.1:4001`.
* Building with the API stopped also failed: `Failed to collect page data for /movies`. The build still needs API data to generate pages; previously generated pages can continue working under `npm start`.

### Questions

#### 1. What strategy does each page use, and why?

| Page | Strategy | Actual build output | Why it fits |
|---|---|---|---|
| `/` | SSR with streaming | ƒ | Shows fresh votes on each request, while the heading loads quickly. |
| `/movies` | ISR | ○ with 10s | Keeps the list fast while updating it in the background. |
| `/movies/[id]` | SSG | ● | Movie details rarely change and can be generated at build time. |
| `/movies-client` | CSR for the list | ○ | The page shell is prerendered, but the browser loads the movie list after opening it. |
| `/about` | SSG | ○ | Static information needs no fresh API data. |

#### 2. Which eight API calls happen after clearing the build cache?
* Two calls to `/api/movies`: one for `generateStaticParams` with `force-cache`, and one for `/movies` with `revalidate: 10`. Then six calls to `/api/movies/1` through `/api/movies/6`. Each movie's metadata and page share the same GET request.

#### 3. What do Suspense and Promise.all improve?
* Suspense improves the first byte: the heading and fallback arrive before the data. The total stays around 2.5 seconds with sequential requests. Promise.all improves the total to around 1.5 seconds by starting both requests together; the first byte stays fast.

#### 4. What happens when the API is down?
* The observations and reasons are in the Part H table above.
