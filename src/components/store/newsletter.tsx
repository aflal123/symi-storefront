"use client";

import { useState } from "react";
import { BRAND } from "@/lib/site";
import { Shell } from "@/components/store/section";
import { BlurFade } from "@/components/ui/blur-fade";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  };

  return (
    <section className="dark bg-background py-20 text-center text-foreground sm:py-28 lg:py-32">
      <Shell>
        <BlurFade inView>
          <span className="eyebrow text-muted-foreground">
            {BRAND.season} · In the loop
          </span>
          <h2 className="display-tight mt-4 text-5xl text-white sm:text-6xl lg:text-[7.5rem]">
            Stay in the loop
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground">
            Get first access to new drops, exclusive collections and special
            offers delivered directly to your inbox.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              className="flex-1 border border-white/20 border-r-0 bg-transparent px-4 py-4 text-[13px] text-[#F8F5EE] outline-none placeholder:text-muted-foreground focus:border-[#8BA894] transition-colors"
            />
            <button
              type="submit"
              className="border border-[#F8F5EE] bg-[#F8F5EE] px-7 py-4 text-[10px] font-bold tracking-[0.2em] text-[#1A1714] uppercase transition-all duration-300 hover:border-[#52735B] hover:bg-[#52735B] hover:text-white"
            >
              Subscribe
            </button>
          </form>

          {done ? (
            <p className="mt-4 text-xs tracking-[0.06em] text-white">
              You are on the list — demo only, nothing was sent.
            </p>
          ) : (
            <p className="mt-4 text-[9px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </BlurFade>
      </Shell>
    </section>
  );
}
