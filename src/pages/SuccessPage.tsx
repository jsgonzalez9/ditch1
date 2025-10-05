import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useSubscription } from '../hooks/useSubscription'

export function SuccessPage() {
  const { refetch } = useSubscription()

  useEffect(() => {
    // Refetch subscription data after successful payment
    const timer = setTimeout(() => {
      refetch()
    }, 2000)

    return () => clearTimeout(timer)
  }, [refetch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Welcome to Ditch Plus! Your premium features are now active.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Access advanced craving tracking</li>
              <li>• View detailed health insights</li>
              <li>• Set personalized goals</li>
              <li>• Get priority support</li>
            </ul>
          </div>

          <Link
            to="/"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-colors"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}