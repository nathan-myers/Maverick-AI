import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageSquare,
  Settings, 
  LogOut, 
  Shield,
  BarChart,
  AlertCircle,
  Users
} from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Sidebar */}
      <div className="fixed left-0 top-20 bottom-0 w-64 bg-white/5 border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold">Chat Moderation</h2>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart },
            { id: 'live-chats', label: 'Live Chats', icon: MessageSquare },
            { id: 'flagged', label: 'Flagged Messages', icon: AlertCircle },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20' 
                  : 'text-neutral-400 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <h1 className="text-3xl font-bold mb-2">Chat Moderation Dashboard</h1>
            <p className="text-neutral-400">Monitor and moderate real-time chat conversations</p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Active Chats', value: '28', icon: MessageSquare, color: 'purple' },
              { label: 'Flagged Messages', value: '3', icon: AlertCircle, color: 'red' },
              { label: 'Active Users', value: '56', icon: Users, color: 'blue' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/5 backdrop-blur-xl border border-${stat.color}-500/20 rounded-xl p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Flagged Messages Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Flagged Messages</h2>
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="space-y-4">
              {[
                { user: 'Driver #1234', message: 'Message flagged for inappropriate content', time: '2m ago' },
                { user: 'Passenger #5678', message: 'Message flagged for potential harassment', time: '5m ago' },
                { user: 'Driver #9012', message: 'Message flagged for suspicious activity', time: '12m ago' },
              ].map((msg, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-neutral-200">{msg.user}</p>
                      <p className="text-sm text-neutral-400">{msg.message}</p>
                    </div>
                  </div>
                  <span className="text-sm text-neutral-500">{msg.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 