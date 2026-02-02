import { motion } from 'framer-motion';

interface TimeSlotPickerProps {
  slots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  spotsLeft: number;
}

export const TimeSlotPicker = ({ 
  slots, 
  selectedSlot, 
  onSelectSlot,
  spotsLeft 
}: TimeSlotPickerProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Select Time Slot</h4>
        <span className="text-sm text-secondary font-medium">
          {spotsLeft} spots left
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {slots.map((slot) => (
          <motion.button
            key={slot}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectSlot(slot)}
            className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
          >
            <span className="text-sm font-medium">{slot}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
