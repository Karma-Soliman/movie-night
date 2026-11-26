import type { NextRequest } from "next/server"
import { jsonError, serverError } from "@/lib/http"
import { getMovies } from "@/lib/movies"

// GET /api/movies, GET /api/movies?genre=Sci-Fi
export async function GET(request: NextRequest) {
  // A string, or null when the parameter is missing
  const genre = request.nextUrl.searchParams.get("genre")
  if (genre !== null && genre.trim() === "")
    return jsonError(400, "genre cannot be empty")

  try {
    const movies = await getMovies()
    // Case-insensitive: ?genre=sci-fi works too
    const result = genre
      ? movies.filter(
          (movie) => movie.genre.toLowerCase() === genre.toLowerCase(),
        )
      : movies
    return Response.json(result)
  } catch (err) {
    return serverError(err)
  }
}
