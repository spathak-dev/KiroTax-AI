import { Bell, X } from 'lucide-react'

interface NotificationProps {
  title: string
  message: string
  time: string
  isRead: boolean
  onClose: () => void
}

export default function Notification({ title, message, time, isRead, onClose }: NotificationProps) {
  return (
    <div className={`p-4 rounded-lg border ${isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Bell className="text-primary-600" size={16} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
            <p className="text-xs text-gray-500 mt-2">{time}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition"
        >
          <X size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}
