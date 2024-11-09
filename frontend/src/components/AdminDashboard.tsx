"use client";

import { useState, useEffect } from "react";
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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

export default function ParkingDashboard() {
  const [parkingData, setParkingData] = useState([]);
  const [occupancyData, setOccupancyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    async function fetchParkingData() {
      try {
        const response = await fetch("http://localhost:5000/api/parkingData");
        const data = await response.json();
        setParkingData(data);
        setFilteredCars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch parking data:", error);
        setIsLoading(false);
      }
    }

    async function fetchOccupancyData() {
      try {
        const response = await fetch("http://localhost:5000/api/occupancy");
        const data = await response.json();
        setOccupancyData(data);
      } catch (error) {
        console.error("Failed to fetch occupancy data:", error);
      }
    }

    fetchParkingData();
    fetchOccupancyData();
  }, []);

  const handleSearch = () => {
    const filtered = parkingData.filter((car: any) =>
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7}>Loading...</TableCell>
                  </TableRow>
                ) : (
                  filteredCars.map((car: any) => (
                    <TableRow key={car._id}>
                      <TableCell>{car.no}</TableCell>
                      <TableCell>{car.type}</TableCell>
                      <TableCell>{car.noPlate}</TableCell>
                      <TableCell>{car.timeIn}</TableCell>
                      <TableCell>{car.timeOut}</TableCell>
                      <TableCell>{car.duration}</TableCell>
                      <TableCell>{car.blockId}</TableCell>
                    </TableRow>
                  ))
                )}
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
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
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
