import { 
    WiCloud, WiDayCloudy, WiDayFog, WiDayHail, WiDayLightning, WiDayRain, WiDayRainMix, WiDayShowers,
    WiDaySleet, WiDaySnow, WiDaySnowThunderstorm, WiDaySprinkle, WiDayStormShowers, WiDaySunny,
    WiFog, WiHail, WiNightAltCloudy, WiNightAltHail, WiNightAltLightning, WiNightAltRain,
    WiNightAltRainMix,
    WiNightAltShowers, WiNightAltSleet, WiNightAltSnow, WiNightAltSnowThunderstorm, WiNightAltSprinkle,
    WiNightAltStormShowers, WiNightClear, WiNightFog, WiRain, WiRainMix, WiShowers, WiSleet, WiSnow, WiSnowWind,
    WiSprinkle, WiStormShowers, WiThunderstorm
} from "react-icons/wi";

type WeatherIconProps = {
    code: number,
    isDay: boolean,
}

const WeatherIcon = ({ code, isDay }: WeatherIconProps) => {
    switch (code) {
        case 1000:
            return (isDay) ? <WiDaySunny /> : <WiNightClear />;
        case 1003:
            return (isDay) ? <WiDayCloudy /> : <WiNightAltCloudy />;
        case 1006:
        case 1009:
            return <WiCloud />;
        case 1030:
            return (isDay) ? <WiDayFog /> : <WiNightFog />;
        case 1063:
        case 1240:
            return (isDay) ? <WiDayShowers /> : <WiNightAltShowers />;
        case 1066:
        case 1210:
        case 1213:
        case 1216:
        case 1222:
        case 1255:
            return (isDay) ? <WiDaySnow /> : <WiNightAltSnow />;
        case 1219:
        case 1225:
        case 1258:
            return <WiSnow />
        case 1069:
        case 1249:
        case 1252:
            return (isDay) ? <WiDaySleet /> : <WiNightAltSleet />;
        case 1072:
        case 1171:
            return <WiRainMix />;
        case 1087:
            return (isDay) ? <WiDayLightning /> : <WiNightAltLightning />;
        case 1114:
        case 1117:
            return <WiSnowWind />;
        case 1135:
        case 1147:
            return <WiFog />;
        case 1150:
            return (isDay) ? <WiDaySprinkle /> : <WiNightAltSprinkle />;
        case 1153:
            return <WiSprinkle />;
        case 1168:
        case 1183:
            return <WiShowers />;
        case 1180:
        case 1186:
        case 1192:
        case 1243:
        case 1246:
            return (isDay) ? <WiDayRain /> : <WiNightAltRain />;
        case 1189:
        case 1195:
            return <WiRain />
        case 1198:
        case 1201:
            return (isDay) ? <WiDayRainMix /> : <WiNightAltRainMix />
        case 1204:
        case 1207:
            return <WiSleet />;
        case 1237:
            return <WiHail />;
        case 1261:
        case 1264:
            return (isDay) ? <WiDayHail /> : <WiNightAltHail />;
        case 1273:
            return (isDay) ? <WiDayStormShowers /> : <WiNightAltStormShowers />;
        case 1276:
            return <WiThunderstorm />;
        case 1279:
            return (isDay) ? <WiDaySnowThunderstorm /> : <WiNightAltSnowThunderstorm />;
        case 1282:
            return <WiStormShowers />;
        default:
            return null;
    }
}

export default WeatherIcon;