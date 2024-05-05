import Link from "next/link";
import SelectPublisher from "@/app/components/SelectPublisher";
import sources from "@/sources.json";

export default function Header() {
  return (
    <header className="w-full">
      <Link href="/" className="flex flex-col justify-center items-center py-4">
        <p className="text-3xl font-bold">Criptor</p>
        <p className="text-base mt-2">An RSS reader for cryptocurrency news</p>
      </Link>
      <div className="border-b border-t border-black py-2 hidden lg:flex justify-center">
        {sources.map((source, index) => (
          <>
            <Link
              key={source.id}
              prefetch={false}
              href={`/publisher/${source.id}`}
              className="xl:text-lg font-semibold py-2"
            >
              {source.name}
            </Link>
            {index < sources.length - 1 && (
              <div className="border-r mx-1 xl:mx-2"></div>
            )}
          </>
        ))}
      </div>
      <SelectPublisher />
    </header>
  );
}
