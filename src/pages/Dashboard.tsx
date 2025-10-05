import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { SubscriptionStatus } from '../components/subscription/SubscriptionStatus'
import { Link } from 'react-router-dom'
import { Cloud, LogOut, Crown } from 'lucide-react'

export function Dashboard() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg mr-3">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Ditch</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <SubscriptionStatus />
              <button
                onClick={signOut}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.user_metadata?.full_name || 'there'}!
            </h2>
            <p className="text-xl text-gray-600">
              Your journey to becoming vape-free starts here
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Today's Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Puffs Today</span>
                  <span className="text-2xl font-bold text-teal-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Daily Goal</span>
                  <span className="text-lg font-semibold text-gray-900">50</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full w-0"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Streak</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">0</div>
                <p className="text-gray-600">Days vape-free</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg p-8 text-white text-center">
            <Crown className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Unlock Premium Features</h3>
            <p className="text-teal-100 mb-6">
              Get advanced tracking, personalized insights, and priority support
            </p>
            <Link
              to="/pricing"
              className="inline-block bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}