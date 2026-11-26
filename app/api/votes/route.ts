import { serverError } from "@/lib/http"
import { getVotes } from "@/lib/movies"

export async function GET() {
  try {
    return Response.json(await getVotes())
  } catch (err) {
    return serverError(err)
  }
}
