import React from 'react'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative w-full max-w-[430px] min-h-screen bg-white overflow-hidden">
        {children}
      </div>
    </div>
  )
}
