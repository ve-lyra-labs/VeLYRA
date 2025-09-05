import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! This page could not be found.</p>
        <Link href="/" className="text-primary hover:text-primary/80 transition-colors underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};