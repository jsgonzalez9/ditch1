import React from 'react'
import { useSubscription } from '../../hooks/useSubscription'
import { Crown, Loader2 } from 'lucide-react'

export function SubscriptionStatus() {
  const { subscription, loading, getSubscriptionPlan, isPremium } = useSubscription()

  if (loading) {
    return (
      <div className="flex items-center text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Loading...
      </div>
    )
  }

  if (!subscription || !isPremium()) {
    return (
      <div className="flex items-center text-gray-600">
        <span className="text-sm">Free Plan</span>
      </div>
    )
  }

  return (
    <div className="flex items-center text-teal-600">
      <Crown className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">{getSubscriptionPlan()}</span>
    </div>
  )
}