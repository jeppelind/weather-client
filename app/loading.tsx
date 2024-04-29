import { LuLoader2 } from "react-icons/lu";

export default function Loading() {
    return (
        <main className="flex items-center flex-col">
          <div className="flex min-h-screen flex-col justify-center items-center">
            <LuLoader2 className="animate-spin text-9xl" />
            <p className="text-lg">Loading weather...</p>
          </div>
        </main>
    );
}