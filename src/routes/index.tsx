import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from "../hooks/auth";
import { TabRoutes } from './tabRoutes';
import { AuthRoutes } from './authRoutes';

export function Routes() {
  const { user, loadingUser } = useAuth();
  
  return (
    <NavigationContainer>
      {user?.email ? <TabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
