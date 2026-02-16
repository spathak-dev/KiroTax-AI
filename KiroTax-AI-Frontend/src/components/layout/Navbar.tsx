'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-govtech-orange to-govtech-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KiroTax AI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-700 hover:text-primary-600 transition">
              Services
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-primary-600 transition">
              Portfolio
            </Link>
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="text-gray-700 hover:text-primary-600 transition">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 transition">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/services"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Portfolio
            </Link>
            {user ? (
              <>
                <Link
                  href={`/dashboard/${user.role}`}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
