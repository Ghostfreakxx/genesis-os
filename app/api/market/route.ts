export async function GET() {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,cardano&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true";

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return Response.json(data);
}