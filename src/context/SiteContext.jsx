import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGlobalData = async () => {
    try {
      const [settingsData, servicesData] = await Promise.all([
        api.get('/settings'),
        api.get('/services')
      ]);
      setSettings(settingsData);
      setServices(servicesData.filter(s => s.is_active));
    } catch (err) {
      console.error('Error fetching global site data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalData();
  }, []);

  useEffect(() => {
    if (settings && settings.primary_color) {
      document.documentElement.style.setProperty('--primary', settings.primary_color);
      // Optional: Generate a secondary or lighter shade if needed
      // For now, just the primary
    }
  }, [settings]);

  return (
    <SiteContext.Provider value={{ settings, services, loading, refreshData: fetchGlobalData }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
