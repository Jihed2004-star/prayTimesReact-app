import Prayer from "./component/Prayer";
import { useEffect,useState } from "react";

function App() {


  const [prayerTimes, setPrayerTimes] = useState({});
  const [todayDate, setTodayDate] = useState("");
  const [city, setCity] = useState("Gabes");
  const cities=[
    {name:"Msaken",value:"Msaken"},
    {name:"Gabes",value:"Gabes"},
    {name:"Sousse",value:"Sousse"}
  ]
  /**/useEffect(() => {
    const fetchPrayer=async()=>{
      try{
        const response=await fetch(`https://api.aladhan.com/v1/timingsByAddress/19-10-2025?address=${city}%2CTN&method=99&methodSettings=18.5%2Cnull%2C17.5`)
        const data_Prayer=await response.json()
        setPrayerTimes(data_Prayer.data.timings)
        setTodayDate(data_Prayer.data.date.gregorian.date)
        console.log(data_Prayer)
      }catch(err){
        console.error(err)
      }
    }
    fetchPrayer();
  },[city]);
  const formatTime=(time)=>{
    if(!time){
      return "00:00"
    }

    let [hours,minuts]=time.split(":").map(Number)
    const pord=hours >=12 ? "PM" : "AM";
    hours=hours%12||12;
    return `${hours}:${minuts<10? "0"+minuts : minuts} ${pord}`
  }
  return (
    <div className="App">
      <div className="container">
        <div className="top_sect">
          <div className="city">
            <h3>City</h3>
            <select name="" id="" onChange={(e)=>{
              setCity(e.target.value)
            }}>
              {cities.map((c)=>{
                return <option key={c.value} value={c.value}>{c.name}</option>
              })}
            </select>
          </div>
          <div className="date">
            <h3>Today Date</h3>
            <h4>{todayDate}</h4>
          </div>
        </div>
        <Prayer name="Fajr  " time={formatTime(prayerTimes.Fajr)}/>
        <Prayer name="Dhuhr   " time={formatTime(prayerTimes.Dhuhr)}/>
        <Prayer name="Asr   " time={formatTime(prayerTimes.Asr)}/>
        <Prayer name="Maghreb" time={formatTime(prayerTimes.Maghrib)}/>
        <Prayer name="Icha   " time={formatTime(prayerTimes.Isha)}/>
      </div>
    </div>
  );
}

export default App;
