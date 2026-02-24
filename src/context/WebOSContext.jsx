import React, { createContext, useContext, useEffect, useState } from 'react';

const WebOSContext = createContext();

export const useWebOS = () => {
  const context = useContext(WebOSContext);
  if (!context) {
    throw new Error('useWebOS must be used within WebOSProvider');
  }
  return context;
};

export const WebOSProvider = ({ children, isWebOS }) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    if (isWebOS && window.webOS) {
      // Fetch device information
      window.webOS.deviceInfo((info) => {
        setDeviceInfo(info);
        console.log('Device Info:', info);
      });

      // Fetch system information
      window.webOS.systemInfo((info) => {
        setSystemInfo(info);
        console.log('System Info:', info);
      });
    }
  }, [isWebOS]);

  const callService = (service, method, parameters = {}) => {
    return new Promise((resolve, reject) => {
      if (!isWebOS || !window.webOS) {
        reject(new Error('webOS not available'));
        return;
      }

      window.webOS.service.request(service, {
        method,
        parameters,
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  };

  const value = {
    isWebOS,
    deviceInfo,
    systemInfo,
    callService,
  };

  return (
    <WebOSContext.Provider value={value}>
      {children}
    </WebOSContext.Provider>
  );
};
