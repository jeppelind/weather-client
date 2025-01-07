import Search from "./Search";

export type Location = {
  id: string,
  name: string,
  region: string,
  country: string,
  lat: number,
  lon: number,
  url: string,
}

const getLocations = async (location: string) => {
  const URL = `${process.env.API_URL}/search?query=${location}`;
  const res = await fetch(URL, {
    next: {
      revalidate: 86400, // Cache age in seconds
    },
  });
  if (!res.ok) {
    throw new Error(`Error fetching data. ${res.statusText}`);
  }
  const data: Location[] = await res.json();
  return data;
}

export default function Page() {
  const search = async (location: string) => {
    'use server'
    const locations = await getLocations(location);
    return locations;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Search onSubmit={search} />
      </div>
    </main>
  );
}