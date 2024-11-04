import { useState } from "react";
import { Search, Calendar as CalendarIcon, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const occupancyData = [
  { time: "4/4", value: 400 },
  { time: "5/4", value: 300 },
  { time: "6/4", value: 200 },
  { time: "7/4", value: 278 },
];

const durationData = [
  { name: "8-9", value: 15 },
  { name: "9-10", value: 20 },
  { name: "10-11", value: 25 },
  { name: "11-12", value: 30 },
  { name: "12-1", value: 22 },
  { name: "1-2", value: 18 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

const mockCarData = [
  {
    no: 1,
    type: "Sedan",
    noPlate: "ABC123",
    timeIn: "09:00",
    timeOut: "11:30",
    duration: "2h 30m",
    blockId: "0x1234...5678",
  },
  {
    no: 2,
    type: "SUV",
    noPlate: "XYZ789",
    timeIn: "10:15",
    timeOut: "13:45",
    duration: "3h 30m",
    blockId: "0x9876...5432",
  },
  {
    no: 3,
    type: "Hatchback",
    noPlate: "DEF456",
    timeIn: "11:30",
    timeOut: "14:00",
    duration: "2h 30m",
    blockId: "0xABCD...EFGH",
  },
];

export default function ParkingDashboardComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState(mockCarData);
  const [date, setDate] = useState<Date>();

  const handleSearch = () => {
    const filtered = mockCarData.filter((car) =>
      car.noPlate.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  return (
    <div className="h-screen w-full overflow-auto p-4 bg-gray-100">
      <div className="container mx-auto p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by Number Plate"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-2 w-full"
              />
            </div>
          </div>
          <Button onClick={handleSearch}>Search</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>

        <Card className="w-full">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>No Plate</TableHead>
                  <TableHead>Time-In</TableHead>
                  <TableHead>Time-Out</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>BlockID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <TableRow key={car.no}>
                    <TableCell>{car.no}</TableCell>
                    <TableCell>{car.type}</TableCell>
                    <TableCell>{car.noPlate}</TableCell>
                    <TableCell>{car.timeIn}</TableCell>
                    <TableCell>{car.timeOut}</TableCell>
                    <TableCell>{car.duration}</TableCell>
                    <TableCell>{car.blockId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Parking Space Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-red-500 text-2xl font-bold">
                    Occupied: 150
                  </span>
                </div>
                <div>
                  <span className="text-green-500 text-2xl font-bold">
                    Vacant: 43
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">No of Cars in Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">588</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Avg No of cars this Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">343.2</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Occupancy</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={occupancyData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parking Duration Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={durationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {durationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
