import { OriginLogo } from '@origin-digital/ods-core'

export function Header() {
  return (
    <header className="flex items-center justify-between px-5 pt-12 pb-3 border-b border-gray-100 bg-white">
      <OriginLogo variant="landscape" />
      <span className="bg-[#FF6024]/10 text-[#FF6024] text-xs font-semibold px-3 py-1 rounded-full border border-[#FF6024]/30">
        DEMO
      </span>
    </header>
  )
}
