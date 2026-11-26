import type { NextRequest } from "next/server"
import { jsonError, serverError } from "@/lib/http"
import { getMovie, parseId } from "@/lib/movies"

// GET /api/movies/2. params is a Promise; RouteContext types it from the path.
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/movies/[id]">,
) {
  const id = parseId((await ctx.params).id)
  // 400: the request itself is wrong. 404: it is fine, but there is no such movie.
  if (id === null)
    return jsonError(400, "The id must be a positive whole number")

  try {
    const movie = await getMovie(id)
    if (!movie) return jsonError(404, "Movie not found")
    return Response.json(movie)
  } catch (err) {
    return serverError(err)
  }
}
