"use client";

import { useState, type FormEvent } from "react";
import Brand from "./Brand";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

// Web3Forms (free): get a public access key at https://web3forms.com (sent to your email)
// and set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local and in the Vercel project settings.
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accessKey) {
      setStatus("error");
      setError("The form isn't configured yet. Please email me directly.");
      return;
    }
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: new FormData(form) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message ?? "Something went wrong. Please email me directly.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please email me directly.");
    }
  }

  return (
    <section id="contact" className="sec" style={{ paddingBottom: "clamp(24px, 4vw, 56px)" }}>
      <div className="contact rv">
        <div className="intro">
          <div className="eyebrow"><b>Contact</b></div>
          <h2 className="disp grad">Let&apos;s connect.</h2>
          <p className="lead">Write to me here, or find me on the links below.</p>
          <div className="icons">
            <a className="ib" href={`mailto:${site.email}`} title="Email" aria-label="Email">
              <svg className="st" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7.5 8.5 6 8.5-6" /></svg>
            </a>
            <a className="ib" href={site.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"><Brand name="github" mono /></a>
            <a className="ib" href={site.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"><Brand name="linkedin" mono /></a>
            <a className="ib" href={site.resume} download title="Download résumé" aria-label="Download résumé">
              <svg className="st" viewBox="0 0 24 24"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" /></svg>
            </a>
          </div>
          <a className="mono" href={`mailto:${site.email}`} style={{ fontSize: 14, color: "var(--mut)" }}>{site.email}</a>
        </div>

        <form className="cfp" onSubmit={onSubmit}>
          <div className="eyebrow"><b>Send a message</b> · lands straight in my inbox</div>
          <input type="hidden" name="access_key" value={accessKey ?? ""} />
          <input type="hidden" name="subject" value="New message from your portfolio" />
          <input type="hidden" name="from_name" value="Portfolio contact form" />
          <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label><span>Your name</span><input className="fld" type="text" name="name" required maxLength={120} placeholder="Ada Lovelace" /></label>
          <label><span>Your email</span><input className="fld" type="email" name="email" required maxLength={200} placeholder="ada@company.com" /></label>
          <label><span>Message</span><textarea className="fld" name="message" required maxLength={4000} placeholder="Tell me about the role or the project…" /></label>
          <button className="btn solid" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>
          <span className={`status ${status === "success" ? "ok" : status === "error" ? "err" : ""}`} role="status" aria-live="polite">
            {status === "success" ? "Thanks, your message is on its way." : status === "error" ? error : ""}
          </span>
        </form>
      </div>
    </section>
  );
}
