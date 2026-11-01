import { ArrowRight } from "./icons";

export function Newsletter() {
  return (
    <section id="subscribe" className="container-page scroll-mt-24">
      <div className="reveal relative overflow-hidden rounded-3xl bg-bg-dark px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(80% 80% at 50% 0%, #000 30%, transparent 80%)",
          }}
        />
        <div
          className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-brand blur-[100px]"
          style={{ opacity: 0.35 }}
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            Newsletter · join the list
          </span>
          <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
            Level up every week.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/60">
            Practical tutorials, tool breakdowns, and career tips for developers.
            No spam. Unsubscribe anytime.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 font-semibold text-white transition-all hover:bg-brand-700"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
