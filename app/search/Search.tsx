'use client'

import { useState } from "react";
import { Location } from "./page";
import Link from "next/link";
import { LuLoader2 } from "react-icons/lu";

const Search = ({ onSubmit }: { onSubmit: (location: string) => Promise<Location[]> }) => {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("c");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const checkInput = async(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);
      setLocations([]);
      const searchResult = await onSubmit(location);
      setLocations(searchResult);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="text"
        name="l"
        placeholder="Enter location..."
        className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        onKeyDown={checkInput}
      />
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="t" value="c" defaultChecked onChange={(e) => setTemperature(e.target.value)} />
          <span>°C</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="t" value="f" onChange={(e) => setTemperature(e.target.value)} />
          <span>°F</span>
        </label>
      </div>
      {loading && <LuLoader2 className="animate-spin text-6xl" />}
      {locations.map((location) => (
        <div key={location.id}>
          <Link href={`/?l=${location.url}&t=${temperature}`}>{location.name} | {location.region} | {location.country}</Link>
        </div>
      ))}
    </div>
  )
}

export default Search;