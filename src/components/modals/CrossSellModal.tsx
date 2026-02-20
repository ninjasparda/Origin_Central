import { motion } from 'framer-motion'
import { Check, Tag, ArrowRight } from 'lucide-react'
import { Heading, Text, Button, Stack } from '@origin-digital/ods-core'
import type { Product } from '../../types'
import { useDashboardStore } from '../../store/useDashboardStore'

interface CrossSellModalProps {
  product: Product
}

export function CrossSellModal({ product }: CrossSellModalProps) {
  const clearSelection = useDashboardStore((s) => s.clearSelection)
  const { crossSellOffer, colors, name, icon } = product

  return (
    <div className="px-5 pb-8">
      {/* Header */}
      <div className="flex items-center py-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 mr-3"
          style={{ backgroundColor: `${colors.active}20` }}
        >
          {icon}
        </div>
        <div>
          <Heading variant="h3" component="h2">{name}</Heading>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
            Not connected
          </span>
        </div>
      </div>

      {/* Saving tag */}
      {crossSellOffer.saving && (
        <motion.div
          className="flex items-center gap-2 rounded-xl px-4 py-3 mb-5 border"
          style={{
            backgroundColor: `${colors.active}10`,
            borderColor: `${colors.active}40`,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Tag size={14} style={{ color: colors.active }} className="shrink-0" />
          <Text variant="body" tone="neutral">
            <span style={{ color: colors.active, fontWeight: 700 }}>{crossSellOffer.saving}</span>
          </Text>
        </motion.div>
      )}

      {/* Hero section */}
      <motion.div
        className="rounded-2xl p-5 mb-5"
        style={{ background: `linear-gradient(135deg, ${colors.active}15, ${colors.active}05)` }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Text variant="body-small" tone="neutral">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: colors.active }}
          >
            {crossSellOffer.tagline}
          </span>
        </Text>
        <Heading variant="h3" component="h3">{crossSellOffer.headline}</Heading>
      </motion.div>

      {/* Bullet points */}
      <div className="space-y-3 mb-6">
        {crossSellOffer.bullets.map((bullet, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: `${colors.active}20` }}
            >
              <Check size={11} style={{ color: colors.active }} />
            </div>
            <Text variant="body">{bullet}</Text>
          </motion.div>
        ))}
      </div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Stack space="xsmall">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              if (crossSellOffer.ctaUrl) {
                window.open(crossSellOffer.ctaUrl, '_blank', 'noopener,noreferrer')
              }
              clearSelection()
            }}
            data-id="cross-sell-cta-btn"
          >
            {crossSellOffer.ctaLabel}
            <ArrowRight size={16} style={{ marginLeft: 8 }} />
          </Button>
          <Button
            variant="text"
            color="primary"
            fullWidth
            onClick={clearSelection}
            data-id="cross-sell-dismiss-btn"
          >
            Maybe later
          </Button>
        </Stack>
      </motion.div>
    </div>
  )
}
