@@ .. @@
 import React from 'react';
 import { Link, useNavigate } from 'react-router-dom';
 import { LogOut, User, Settings } from 'lucide-react';
 import { useAuth } from '../hooks/useAuth';
+import { SubscriptionStatus } from './SubscriptionStatus';
 
 export const Header: React.FC = () => {
 }
@@ .. @@
           <div className="flex items-center space-x-4">
+            <SubscriptionStatus />
             <div className="flex items-center space-x-2">
               <User className="w-5 h-5 text-gray-600" />
               <span className="text-sm text-gray-700">{user.email}</span>
             </div>