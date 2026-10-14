import { Link } from "wouter";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 pt-24">
      <div className="text-center max-w-md">
        <Compass className="w-12 h-12 text-primary mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Looks like this trail doesn't exist.</h1>
        <p className="font-sans text-muted-foreground mb-8">The page you're looking for couldn't be found.</p>
        <Link
          href="/"
          className="inline-flex items-center px-7 py-3.5 rounded-xl font-semibold font-sans text-sm bg-primary text-primary-foreground shadow-md shadow-primary/20"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
