import { WiThermometer } from "react-icons/wi";
import WeatherIcon from "./_components/weather-icon";

type Forecast = {
  location: {
    name: string,
    country: string,
  },
  current: {
    is_day: number,
    condition: {
      text: string,
      code: number,
    },
    temp_c: number,
    temp_f: number,
    feelslike_c: number,
    feelslike_f: number,
    maxtemp_c: number,
		maxtemp_f: number,
		mintemp_c: number,
	  mintemp_f: number,
    precip_mm: number,
    precip_in: number,
  },
  forecast: {
    days: {
      date: string,
      maxtemp_c: number,
      maxtemp_f: number,
      mintemp_c: number,
      mintemp_f: number,
      daily_chance_of_rain: number,
      code: number
    }[],
    hours: {
      time_epoch: number,
      time: string,
      is_day: number,
      temp_c: number,
      temp_f: number,
      chance_of_rain: number,
      code: number
    }[],
  },
}

type SearchParams = {
  location: string,
  temp: string,
}

const getForecast = async (location: string) => {
  const URL = `${process.env.API_URL}/forecast?location=${location}`;
  try {
    const res = await fetch(URL, {
      next: {
        revalidate: 3600, // Cache age in seconds
      }
    });
    if (!res.ok) {
      throw new Error(`Error fetching data. ${res.statusText}`);
    }
    const data: Forecast = await res.json();
    return data;
  } catch (err) {
    console.error(err)
    return null;
  }
}

const CurrentWeather = async ({ location, temp }: SearchParams) => {
  const data = await getForecast(location);
  if (!data) {
    return <p className="text-xl">{`Problem fethching data for "${location}"`}</p>;
  }

  return (
    <>
      <p>{data.location.name}, {data.location.country}</p>
      <div className="text-8xl font-bold text-slate-800 dark:text-slate-200 m-4 mb-1">
        {(temp === 'f') ? data.current.temp_f : data.current.temp_c}°
      </div>
      <div className="flex items-center text-lg text-slate-800 dark:text-slate-200">
        <span className="text-7xl">
          <WeatherIcon code={data.current.condition.code} isDay={data.current.is_day === 1} />
        </span>
        {data.current.condition.text}
      </div>
      <p>Feels like {(temp === 'f') ? data.current.feelslike_f : data.current.feelslike_c}°</p>
    </>
  )
}

const HourlyForecast = async ({ location, temp }: SearchParams) => {
  const data = await getForecast(location);
  if (!data) {
    return null;
  }

  const elementArr: JSX.Element[] = [];
  const timeNow = Date.now();
  const startIdx = data.forecast.hours.findIndex(hour => hour.time_epoch > timeNow);

  for (var i = startIdx; i < startIdx + 6; i++) { // Only show 6 upcoming hours
    const hour = data.forecast.hours[i];
    elementArr.push(
      <div className="flex items-center flex-col grow" key={hour.time_epoch}>
        <div className="text-slate-700 dark:text-slate-300 ">{(temp === 'f') ? hour.temp_f : hour.temp_c}°</div>
        <div className="text-slate-700 dark:text-slate-300 text-4xl">
          <WeatherIcon code={hour.code} isDay={hour.is_day === 1} />
        </div>
        <div className="text-xs">{hour.time.slice(-5)}</div>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-2 text-lg">Hourly forecast</h2>
      <div className="flex">
        {elementArr}
      </div>
    </>
  );
}

const DailyForecast = async ({ location, temp }: SearchParams) => {
  const data = await getForecast(location);
  if (!data) {
    return null;
  }
  
  const getDayLabel = (dateStr: string) => {
    const dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateStr);
    if (date.getTime() > Date.now()) {
      return dayLabels[date.getDay()];
    }
    return 'Today';
  }

  return (
    <>
      <h2 className="mb-1 text-lg">3-day forecast</h2>
      <table className="min-w-full">
        <tbody>
          {
            data.forecast.days.map((day, idx) => (
              <tr key={idx}>
                <td className="text-slate-700 dark:text-slate-300 ">{getDayLabel(day.date)}</td>
                <td className="flex flex-col items-end text-3xl py-2 text-slate-700 dark:text-slate-300 "><WeatherIcon code={day.code} isDay={true} /></td>
                <td className="text-right">
                  <span className="text-slate-700 dark:text-slate-300 ">{(temp === 'f') ? day.maxtemp_f : day.maxtemp_c}°</span>
                  <span>/{(temp === 'f') ? day.maxtemp_f : day.mintemp_c}°</span>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default async function Home({
  searchParams
}: { searchParams: { [key: string]: string | undefined } }) {
  const { l, t } = searchParams;
  const temp = t || 'c';
  const location = l;
  
  if (location) {
    try {
      return (
        <main className="flex min-h-screen flex-col items-center pt-16">
          <CurrentWeather location={location} temp={temp} />

          <div className="mt-16 px-10 min-w-full sm:min-w-128">
            <HourlyForecast location={location} temp={temp} />
          </div>

          <div className="mt-8 px-10 min-w-full sm:min-w-128">
            <DailyForecast location={location} temp={temp} />
          </div>
        </main>
      )
    } catch (err) {
      console.error(err)
      return (
        <main className="flex items-center flex-col">
          <div className="flex min-h-screen flex-col justify-center items-center">
            <WiThermometer className="text-7xl" />
            <p>Problem fetching data</p>
          </div>
        </main>
      )
    }
  }

  return (
    <main>
      <main className="flex items-center flex-col">
          <div className="flex min-h-screen flex-col justify-center items-center">
            <p className="text-lg">Simple Weather</p>
            <p>Please provide a location to show forecast.</p>
          </div>
        </main>
    </main>
  )
}
