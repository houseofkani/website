import { Resend } from "resend";

/**
 * Read-only Resend domain status for the outreach operator.
 * Protected by the same key as the sender; returns no API credentials.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const expectedKey = process.env.OUTREACH_KEY;
  if (!expectedKey) {
    return Response.json({ error: "Outreach is not configured." }, { status: 503 });
  }
  if (request.headers.get("x-outreach-key") !== expectedKey) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Resend is not configured." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.domains.list();
  if (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }

  const domains = await Promise.all(
    (data?.data ?? []).map(async (domain) => {
      const detail = await resend.domains.get(domain.id);
      return {
        id: domain.id,
        name: domain.name,
        status: domain.status,
        region: domain.region,
        records: detail.data?.records ?? [],
      };
    }),
  );

  return Response.json({
    from: process.env.EMAIL_FROM || "House of Kani <onboarding@resend.dev>",
    domains,
  });
}
