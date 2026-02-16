'use client'

import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartComponentProps {
  type: 'line' | 'pie'
}

const lineData = [
  { month: 'Jan', bills: 120 },
  { month: 'Feb', bills: 150 },
  { month: 'Mar', bills: 180 },
  { month: 'Apr', bills: 220 },
  { month: 'May', bills: 250 },
  { month: 'Jun', bills: 280 },
]

const pieData = [
  { name: 'CGST', value: 35 },
  { name: 'SGST', value: 35 },
  { name: 'IGST', value: 30 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']

export default function ChartComponent({ type }: ChartComponentProps) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bills" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}
