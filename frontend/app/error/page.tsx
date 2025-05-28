import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6 gold-text-bold">
        Shit! Something went wrong!
      </h1>
      <Link href="/" className="gold-text-bold-underline">
        Go back to home
      </Link>
    </div>
  );
}
