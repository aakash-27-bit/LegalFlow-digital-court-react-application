import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const userId = useSelector((state) => state.userAccount.userId);
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('Access-token');
            const baseUrl = process.env.REACT_APP_BASE_URL || '';
            const response = await axios.get(
                `${baseUrl}/ccms/notifications/${userId}`,
                {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            setNotifications(response.data);
            setUnreadCount(response.data.filter((notif) => !notif.read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Mark notifications as read
    const markAsRead = () => {
        setNotifications((prev) =>
            prev.map((notif) => ({ ...notif, read: true }))
        );
        setUnreadCount(0);
    };

    useEffect(() => fetchNotifications());
    return (
        <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, fetchNotifications }}>
            {children}
        </NotificationsContext.Provider>
    );
};
