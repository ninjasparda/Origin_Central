import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Settings } from 'lucide-react'
import { Heading, Text, Button, Stack } from '@origin-digital/ods-core'
import type { Product } from '../../types'
import { UsageChart } from './UsageChart'
import { useDashboardStore } from '../../store/useDashboardStore'

interface ProductDetailModalProps {
  product: Product
}

export function ProductDetailModal({ product }: ProductDetailModalProps) {
  const clearSelection = useDashboardStore((s) => s.clearSelection)
  const [smartExport, setSmartExport] = useState(false)
  const { stats, colors, name, icon } = product

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
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${colors.active}20`, color: colors.active }}
          >
            Active
          </span>
        </div>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <motion.div
          className="rounded-2xl p-4 border border-gray-100"
          style={{ backgroundColor: `${colors.active}10` }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Text variant="body" tone="neutralLight">{stats.primaryLabel}</Text>
          <p className="font-bold text-2xl mt-1" style={{ color: colors.active }}>
            {stats.primaryMetric}
          </p>
        </motion.div>

        {stats.secondaryMetric && (
          <motion.div
            className="rounded-2xl p-4 border border-gray-100"
            style={{ backgroundColor: `${colors.active}10` }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Text variant="body" tone="neutralLight">{stats.secondaryLabel}</Text>
            <p className="font-bold text-2xl mt-1" style={{ color: colors.active }}>
              {stats.secondaryMetric}
            </p>
          </motion.div>
        )}
      </div>

      {/* Savings banner */}
      {stats.savings && (
        <motion.div
          className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TrendingUp size={16} className="text-green-600 shrink-0" />
          <Text variant="body" tone="positive">{stats.savings}</Text>
        </motion.div>
      )}

      {/* Usage chart */}
      <motion.div
        className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Text variant="body-small" tone="neutralLight">7-Day Usage</Text>
        <UsageChart
          data={stats.usageData}
          unit={stats.chartUnit}
          activeColor={colors.active}
        />
      </motion.div>

      {/* Settings / toggles */}
      {product.id === 'solar' && (
        <motion.div
          className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={18} style={{ color: colors.active }} />
              <div>
                <Text variant="body">Smart Export</Text>
                <Text variant="body-small" tone="neutralLight">Sell excess power automatically</Text>
              </div>
            </div>
            <button
              onClick={() => setSmartExport(!smartExport)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: smartExport ? colors.active : '#D1D5DB' }}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow"
                animate={{ left: smartExport ? '26px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.div>
      )}

      {/* Manage button */}
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
            onClick={clearSelection}
            data-id="manage-product-btn"
          >
            <Settings size={16} style={{ marginRight: 8 }} />
            Manage {name}
          </Button>
        </Stack>
      </motion.div>
    </div>
  )
}
