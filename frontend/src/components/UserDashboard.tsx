import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { LineChart, Line } from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// TypeScript interfaces
interface ParkingData {
  _id: string;
  no: number;
  type: string;
  noPlate: string;
  timeIn: string;
  timeOut: string;
  duration: string;
  blockId: string;
  createdAt: string;
  updatedAt: string;
}

interface OccupancyData {
  _id: string;
  time: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

interface WeeklyEntry {
  day: string;
  entries: number;
}

interface OccupancyState {
  occupied: number;
  vacant: number;
}

export default function UserDashboard() {
  const [parkingData, setParkingData] = useState<ParkingData[]>([]);
  const [occupancyData, setOccupancyData] = useState<OccupancyData[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [todayOccupancy, setTodayOccupancy] = useState<OccupancyState>({
    occupied: 0,
    vacant: 0,
  });
  const [weeklyEntryData, setWeeklyEntryData] = useState<WeeklyEntry[]>([]);
  const [occupancyOverTimeData, setOccupancyOverTimeData] = useState<
    { day: string; occupancy: number }[]
  >([]);
  const totalSpots = 600;

  useEffect(() => {
    // Fetch parking and occupancy data
    async function fetchData() {
      try {
        const parkingResponse = await fetch(
          "http://localhost:5000/api/parkingData"
        );
        const parkingData = await parkingResponse.json();
        setParkingData(parkingData);

        const occupancyResponse = await fetch(
          "http://localhost:5000/api/occupancy"
        );
        const occupancyData = await occupancyResponse.json();
        setOccupancyData(occupancyData);

        // Process the data
        calculateTodayOccupancy(occupancyData);
        calculateWeeklyEntryTimes(parkingData);
        processOccupancyOverTime(occupancyData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  // Calculate today's occupancy
  const calculateTodayOccupancy = (data: OccupancyData[]) => {
    const today = new Date();
    const todayString = `${today.getMonth() + 1}/${today.getDate()}`;

    const todayData = data.find((entry) => entry.time === todayString);
    const occupied = todayData ? todayData.value : 0;
    const vacant = totalSpots - occupied;

    setTodayOccupancy({ occupied, vacant });
  };

  // Calculate weekly entry times based on timeIn from parking data
  const calculateWeeklyEntryTimes = (data: ParkingData[]) => {
    // Initialize counts for each day
    const weekDays = [
      { day: "Sun", entries: 0 },
      { day: "Mon", entries: 0 },
      { day: "Tue", entries: 0 },
      { day: "Wed", entries: 0 },
      { day: "Thu", entries: 0 },
      { day: "Fri", entries: 0 },
      { day: "Sat", entries: 0 },
    ];

    data.forEach((entry) => {
      const entryDate = new Date(entry.createdAt);
      const dayIndex = entryDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
      weekDays[dayIndex].entries++;
    });

    setWeeklyEntryData(weekDays);
  };

  // Process occupancy data for the line chart
  const processOccupancyOverTime = (data: OccupancyData[]) => {
    const sortedData = [...data]
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .map((entry) => ({
        day: entry.time,
        occupancy: entry.value,
      }));

    setOccupancyOverTimeData(sortedData);
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    if (!timeString) return "--:--";

    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="h-screen w-full overflow-auto p-4 bg-gray-100">
      <div className="container mx-auto p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        {/* First Row: Parking Space Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-none">
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                Parking Space Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-red-500 text-2xl font-bold">
                    Occupied: {todayOccupancy.occupied}
                  </span>
                </div>
                <div>
                  <span className="text-green-500 text-2xl font-bold">
                    Vacant: {todayOccupancy.vacant}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-red-500 h-4 rounded-full"
                  style={{
                    width: `${(todayOccupancy.occupied / totalSpots) * 100}%`,
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            {/* Calendar */}
            <Card className="flex-grow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-bold"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? date.toDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate: Date | undefined) =>
                        newDate && setDate(newDate)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Time In / Time Out */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Latest Time In
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex items-center justify-center text-xl font-bold">
                    {parkingData.length > 0
                      ? formatTime(parkingData[parkingData.length - 1]?.timeIn)
                      : "--:--"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Latest Time Out
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex items-center justify-center text-xl font-bold">
                    {parkingData.length > 0
                      ? formatTime(parkingData[parkingData.length - 1]?.timeOut)
                      : "--:--"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Second Row: Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          {/* Weekly Entry Data */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                Weekly Entry Times
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 flex-grow">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyEntryData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="entries" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Occupancy Over Time */}
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                Occupancy Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2 flex-grow">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={occupancyOverTimeData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="occupancy" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
