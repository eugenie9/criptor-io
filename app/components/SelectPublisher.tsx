"use client";

import { useRouter } from "next/navigation";
import sources from "@/sources.json";

export default function Select() {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/publisher/${event.target.value}`);
  };

  return (
    <div className="border-b border-t border-black px-4 py-2 lg:hidden">
      <select className="text-lg font-bold py-2" onChange={handleChange}>
        {sources.map((source) => (
          <option key={source.id} value={source.id}>
            {source.name}
          </option>
        ))}
      </select>
    </div>
  );
}
