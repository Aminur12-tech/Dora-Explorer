import React from 'react';

interface Props {
  slots: string[];
  selectedSlot: string | null;
  onSelectSlot: (s: string) => void;
  spotsLeft?: number;
}

export const TimeSlotPicker: React.FC<Props> = ({ slots = [], selectedSlot, onSelectSlot, spotsLeft = 10 }) => {
  if (!slots.length) return <div className="p-3 text-sm text-muted-foreground">No slots available</div>;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Choose a time</span>
        <span>{spotsLeft} spots</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {slots.map((s) => (
          <button
            key={s}
            onClick={() => onSelectSlot(s)}
            className={`px-3 py-2 rounded-lg text-sm border ${
              selectedSlot === s ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
