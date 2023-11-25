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
      <div className="col-span-1 border-r pr-2">
        {items.map((item) => (
          <Link href={item.href} key={item.name}>
            <p className="text-lg font-semibold border-b p-2">{item.name}</p>
          </Link>
        ))}
      </div>
      <div className="col-span-5">{children}</div>
    </div>
  );
}
