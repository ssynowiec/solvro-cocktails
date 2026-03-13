import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-4 text-center text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link
          href="https://ssynowiec.dev"
          className="font-medium underline underline-offset-2"
        >
          {" "}
          Stanisław Synowiec
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}
