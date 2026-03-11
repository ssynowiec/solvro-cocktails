import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-center text-sm text-gray-500 py-4">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <Link
          href="https://ssynowiec.dev"
          className="underline underline-offset-2 font-medium"
        >
          {" "}
          Stanisław Synowiec
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
};