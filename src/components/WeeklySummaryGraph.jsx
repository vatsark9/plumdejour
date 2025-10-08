import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';

function WeeklySummaryGraph({ logs }) {
  const { user } = useAuth();

  const getLastSevenDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]); 
    }
    return days;
  };

  
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  
  const processLogsData = () => {
    const lastSevenDays = getLastSevenDays();
    const logCountByDate = {};

    
    lastSevenDays.forEach(date => {
      logCountByDate[date] = 0;
    });

    
    logs.forEach(log => {
      if (log.timestamp && log.userId === user?.id) {
        const logDate = new Date(log.timestamp).toISOString().split('T')[0];
        if (logCountByDate.hasOwnProperty(logDate)) {
          logCountByDate[logDate]++;
        }
      }
    });

    
    return lastSevenDays.map(date => ({
      date,
      day: getDayName(date),
      logs: logCountByDate[date]
    }));
  };

  const data = processLogsData();
  const totalLogs = data.reduce((sum, day) => sum + day.logs, 0);

  // Show login prompt if no user is authenticated
  if (!user) {
    return (
      <div className="mt-6 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Weekly Summary</h2>
        <p className="text-gray-500 text-center py-8">Please login to view your weekly summary</p>
      </div>
    );
  }

  // Show no logs message if authenticated user has no logs
  if (logs.length === 0 || totalLogs === 0) {
    return (
      <div className="mt-6 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Weekly Summary</h2>
        <p className="text-gray-500 text-center py-8">No logs to display</p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Weekly Summary</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Total logs this week: <span className="font-semibold text-indigo-600">{totalLogs}</span>
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              allowDecimals={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [value, 'Logs']}
              labelFormatter={(label) => `${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="logs" 
              stroke="#4f46e5" 
              strokeWidth={3}
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-xs text-gray-500">
        Showing logs added over the past 7 days
      </div>
    </div>
  );
}

export default WeeklySummaryGraph;