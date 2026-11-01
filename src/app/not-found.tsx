import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-mono text-6xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold text-ink">Page not found</h1>
        <p className="mt-2 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t
          been published yet.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-700"
        >
          Back home <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
