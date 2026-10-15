import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../../api/contact";

const req = (body: unknown) =>
  new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) });

const valid = { nombre: "Ana Pérez", email: "ana@misiones.gob.ar", mensaje: "Queremos ver la demo." };

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects invalid data", async () => {
    const res = await POST(req({ ...valid, email: "no-es-un-mail" }));
    expect(res.status).toBe(400);
  });

  it("silently drops honeypot submissions", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(req({ ...valid, web: "spam" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends through Resend with reply_to set to the visitor", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    const sent = JSON.parse(init.body as string);
    expect(sent.to).toEqual(["hola@tacuara.com.ar"]);
    expect(sent.reply_to).toBe(valid.email);
  });

  it("fails clearly when the API key is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await POST(req(valid));
    expect(res.status).toBe(500);
  });
});
