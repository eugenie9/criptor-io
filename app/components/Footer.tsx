import Link from "next/link";
import Section from "./Section";

export default async function Footer() {
  return (
    <Section className="!py-4">
      <footer>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-bold">Criptor</p>

          <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/info/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </footer>
    </Section>
  );
}
