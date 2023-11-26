import Link from "next/link";

const items = [
  {
    name: "Terms of Service",
    href: "/info/terms-of-service",
  },
  {
    name: "Privacy Policy",
    href: "/info/privacy-policy",
  },
  {
    name: "Cookie Policy",
    href: "/info/cookie-policy",
  },
  {
    name: "Disclaimer",
    href: "/info/disclaimer",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-6 gap-6 gap-y-2 py-4">
      <div className="col-span-6 md:col-span-1 border-r-0 md:border-r pr-2">
        {items.map((item) => (
          <Link href={item.href} key={item.name}>
            <p className="text-lg font-semibold border-b p-2">{item.name}</p>
          </Link>
        ))}
      </div>
      <div className="col-span-6 md:col-span-5">
        {children}

        <hr className="my-4" />

        <div className="font-medium text-base flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 mr-2 hidden md:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
            />
          </svg>

          <p>
            This page is created for UI purposes only. Criptor is a project for
            the purpose of learning and practicing the Next.js framework. All
            content on the site is taken from the Internet and is not the
            intellectual property of the author of the site. The author of the
            site is not responsible for the content of the site and its use.
          </p>
        </div>
      </div>
    </div>
  );
}
