'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { LineChart, Line } from "recharts"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

const entryData = [
  { day: "Mon", entries: 120 },
  { day: "Tue", entries: 150 },
  { day: "Wed", entries: 180 },
  { day: "Thu", entries: 140 },
  { day: "Fri", entries: 200 },
  { day: "Sat", entries: 100 },
  { day: "Sun", entries: 80 },
]

const occupancyData = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  occupancy: Math.floor(Math.random() * 100) + 100, // Random occupancy between 100 and 200
}))

export default function UserDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="h-screen w-full overflow-auto p-4 bg-gray-100">
      <div className="container mx-auto p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-lg">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-none">
          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Parking Space Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-red-500 text-2xl font-bold">Occupied: 150</span>
                </div>
                <div>
                  <span className="text-green-500 text-2xl font-bold">Vacant: 43</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-red-500 h-4 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="flex-grow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-bold">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Select date
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
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Time In</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex items-center justify-center text-xl font-bold">
                    9:09 AM
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">Time Out</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex items-center justify-center text-xl font-bold">
                    5:12 PM
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Weekly Entry Times</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 flex-grow">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={entryData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="entries" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Occupancy Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 flex-grow">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={occupancyData}>
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
  )
}
