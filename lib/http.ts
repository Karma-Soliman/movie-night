// Helpers shared by the Route Handlers: one JSON shape for every error.
import "server-only"

export type ApiError = { error: string; fields?: Record<string, string> }

export function jsonError(
  status: number,
  error: string,
  fields?: Record<string, string>,
) {
  const body: ApiError = fields ? { error, fields } : { error }
  return Response.json(body, { status })
}

// Logs the real error on the server, sends a generic message to the client
export function serverError(err: unknown) {
  console.error(err)
  return jsonError(500, "Something went wrong on the server")
}
