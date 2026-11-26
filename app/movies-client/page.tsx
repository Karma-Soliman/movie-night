"use client"

import { useEffect, useState } from "react"
import { MovieList } from "@/components/movie-list"
import type { Movie } from "@/lib/movies"

// "Horror" has no movie: it shows the empty state
const GENRES = ["Animation", "Comedy", "Horror", "Sci-Fi", "Thriller"]

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; movies: Movie[] }

export default function MoviesClientPage() {
  const [genre, setGenre] = useState("")
  const [state, setState] = useState<State>({ status: "loading" })

  useEffect(() => {
    // Ignore the answer of an older request if the genre changed meanwhile
    let ignore = false
    async function load() {
      setState({ status: "loading" })
      try {
        // Same origin as the page: a relative URL, no CORS, no NEXT_PUBLIC_ variable
        const query = genre ? `?genre=${encodeURIComponent(genre)}` : ""
        const res = await fetch(`/api/movies${query}`)
        // fetch only throws when the request fails: check the status yourself
        if (!res.ok) {
          const body: { error?: string } = await res.json().catch(() => ({}))
          throw new Error(body.error ?? `The API answered ${res.status}`)
        }
        const movies: Movie[] = await res.json()
        if (!ignore) setState({ status: "done", movies })
      } catch (err) {
        if (!ignore)
          setState({
            status: "error",
            message: err instanceof Error ? err.message : "Network error",
          })
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [genre])

  return (
    <main className="mx-auto w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Movies (client-rendered)</h1>

      <label htmlFor="genre" className="mt-6 block font-medium">
        Genre
      </label>
      <select
        id="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="mt-1 rounded border px-3 py-2"
      >
        <option value="">All genres</option>
        {GENRES.map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>

      {state.status === "loading" && (
        <p className="mt-6" role="status">
          Loading movies...
        </p>
      )}
      {state.status === "error" && (
        <p className="mt-6 text-red-700 dark:text-red-400" role="alert">
          The movies could not be loaded: {state.message}
        </p>
      )}
      {state.status === "done" &&
        (state.movies.length === 0 ? (
          <p className="mt-6">No movie in this genre.</p>
        ) : (
          <MovieList movies={state.movies} />
        ))}
    </main>
  )
}
