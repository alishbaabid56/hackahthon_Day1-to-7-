
"use client";

import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    { id: number; text: string; isRead: boolean }[]
  >([]);

  // Fetch notifications from local storage on component mount
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    setNotifications(storedNotifications);
  }, []);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    // Update local storage
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    // Update local storage
    const updatedNotifications = notifications.filter((notification) => notification.id !== id);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
    // Update local storage
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    // Clear local storage
    localStorage.removeItem("notifications");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <h1 className="text-4xl text-center font-bold text-blue-900 mb-8">
        Your Notifications
      </h1>

      <div className="space-y-4 max-w-2xl mx-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`relative bg-white shadow-xl p-6 rounded-2xl border-l-4 ${
              notification.isRead ? "border-blue-500" : "border-blue-300"
            } transition-all duration-300 ease-in-out transform hover:scale-105`}
          >
            <p className="text-gray-800 text-lg">{notification.text}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleMarkAsRead(notification.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  notification.isRead
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={notification.isRead}
              >
                {notification.isRead ? "Marked as Read" : "Mark as Read"}
              </button>
              <button
                onClick={() => handleDelete(notification.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            {notification.isRead && (
              <div className="absolute top-4 right-4 text-blue-600 text-2xl">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>

      {notifications.length > 0 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={handleMarkAllAsRead}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Mark All as Read
          </button>
          <button
            onClick={handleDeleteAll}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Delete All
          </button>
        </div>
      )}

      {notifications.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-lg">No notifications available.</p>
      )}
    </div>
  );
}