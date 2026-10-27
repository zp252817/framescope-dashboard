import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { changeClass, formatChange } from '../lib/metrics';

export default function ChangeBadge({ value, compact = false }: { value: number | null; compact?: boolean }) {
  const tone = changeClass(value);
  const Icon = value === null || Math.abs(value) < 0.005 ? Minus : value > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={`change-badge ${tone} ${compact ? 'compact' : ''}`} title="正值表示优化，负值表示劣化">
      <Icon size={compact ? 12 : 14} strokeWidth={2.2} />
      {formatChange(value)}
    </span>
  );
}
