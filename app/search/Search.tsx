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
  const [error, setError] = useState("");

  const checkInput = async(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setError("");
      setLoading(true);
      setLocations([]);
      try {
        const searchResult = await onSubmit(location);
        setLocations(searchResult);
      } catch (error: any) {
        console.error(error);
        setError(`Problem fetching data for "${location}".`);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 min-w-full sm:min-w-96">
      <h1 className="text-2xl font-bold">Simple Forecast</h1>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">Search for a location and hit <b>enter</b></p>
      {error && <p className="text-red-500">{error}</p>}
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
      {loading && <LuLoader2 className="animate-spin text-6xl" />}
      {locations.length > 0 &&
        <div className="flex flex-row items-center justify-between min-w-full px-2 mt-4">
          <p className="text-xs tracking-wider uppercase text-slate-400 dark:text-slate-500">Results:</p>
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
        </div>
      }
      {locations.map((location) => (
        <Link key={location.id} href={`/?l=${location.lat},${location.lon}&t=${temperature}`} className="group w-full">
          <div className="bg-slate-200 dark:bg-slate-800 rounded-lg p-3 hover:bg-blue-500">
            <p className="text-lg text-slate-600 dark:text-slate-300 group-hover:text-slate-100">{location.name}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-slate-200">{location.region}, {location.country}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Search;