import React, { useState } from 'react';
import { 
  X, Calendar as CalendarIcon, Clock, Users, MapPin, 
  Sparkles, CheckCircle2, QrCode, ArrowRight, Share2 
} from 'lucide-react';
import { SEATING_AREAS } from '../data/menuData';
import { SeatingAreaId, TableReservation } from '../types/cafe';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReservation: (reservation: TableReservation) => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  onConfirmReservation,
}) => {
  const [selectedAreaId, setSelectedAreaId] = useState<SeatingAreaId>('garden');
  const [date, setDate] = useState('2026-09-30');
  const [timeSlot, setTimeSlot] = useState('05:30 PM (Golden Hour Sunset)');
  const [guests, setGuests] = useState(2);
  const [customerName, setCustomerName] = useState('Samyuktha Y.');
  const [phone, setPhone] = useState('+91 98480 12345');
  const [email, setEmail] = useState('samyuktha@example.com');
  const [specialRequests, setSpecialRequests] = useState('Table near greenery, celebrating a special occasion');
  const [confirmedBooking, setConfirmedBooking] = useState<TableReservation | null>(null);

  if (!isOpen) return null;

  const timeSlots = [
    '09:30 AM (Morning Brew & Bakes)',
    '11:30 AM (Brunch & Slow Roasts)',
    '01:30 PM (Chef Gourmet Lunch)',
    '03:30 PM (Afternoon Tea & Pastries)',
    '05:30 PM (Golden Hour Sunset)',
    '07:30 PM (Candlelight Dinner)',
    '09:00 PM (Late Night Espresso & Slices)',
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const area = SEATING_AREAS.find((a) => a.id === selectedAreaId)!;
    const randomCode = `AR-TB-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReservation: TableReservation = {
      id: `res-${Date.now()}`,
      bookingCode: randomCode,
      customerName,
      phone,
      email,
      date,
      timeSlot,
      guests,
      areaId: selectedAreaId,
      areaName: area.name,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString(),
    };

    setConfirmedBooking(newReservation);
    onConfirmReservation(newReservation);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reservation-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-amber-900" />
            <h2 id="reservation-heading" className="font-serif-display text-xl font-bold text-stone-900">
              {confirmedBooking ? 'Reservation Confirmed' : 'Table Reservation · టేబుల్ రిజర్వేషన్'}
            </h2>
          </div>
          <button
            onClick={confirmedBooking ? handleReset : onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close table reservation modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Pass Screen */
          <div className="p-6 sm:p-8 space-y-6 text-stone-800">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-stone-900">
                Your Table is Reserved!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                We are thrilled to host you at Aura & Roast. A confirmation SMS with directions and host contact has been sent to {confirmedBooking.phone}.
              </p>
            </div>

            {/* Aesthetic Table Booking Pass */}
            <div className="bg-white rounded-2xl border border-stone-300 p-6 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-stone-200 pb-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-1">
                    Confirmed Guest Pass
                  </span>
                  <h4 className="font-serif-display text-xl font-bold text-stone-900">
                    {confirmedBooking.customerName}
                  </h4>
                  <p className="text-xs text-stone-500 font-mono mt-0.5">
                    Booking ID: <strong className="text-stone-800">{confirmedBooking.bookingCode}</strong>
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-stone-100 rounded-lg border border-stone-300 flex items-center justify-center p-1.5">
                    <QrCode className="w-16 h-16 text-stone-800" />
                  </div>
                  <span className="text-[9px] text-stone-400 mt-1 uppercase font-mono">Scan on Arrival</span>
                </div>
              </div>

              {/* Pass details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-medium">Date</span>
                  <span className="font-bold text-stone-900">{confirmedBooking.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-medium">Time Slot</span>
                  <span className="font-bold text-stone-900">{confirmedBooking.timeSlot.split(' ')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-medium">Party Size</span>
                  <span className="font-bold text-stone-900">{confirmedBooking.guests} Guests</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-medium">Seating Area</span>
                  <span className="font-bold text-amber-900">{confirmedBooking.areaName}</span>
                </div>
              </div>

              {confirmedBooking.specialRequests && (
                <div className="mt-4 pt-4 border-t border-stone-100 text-[11px] text-stone-500">
                  <strong className="text-stone-700">Special Notes: </strong>
                  {confirmedBooking.specialRequests}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Booking Form */
          <form onSubmit={handleBookingSubmit} className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6 text-stone-800">
            
            {/* Step 1: Area Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  1. Choose Your Ambiance
                </label>
                <span className="text-[11px] text-stone-500">
                  {SEATING_AREAS.find((a) => a.id === selectedAreaId)?.tag}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEATING_AREAS.map((area) => {
                  const isSelected = selectedAreaId === area.id;
                  return (
                    <div
                      key={area.id}
                      onClick={() => setSelectedAreaId(area.id)}
                      className={`rounded-xl border p-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-900 ring-2 ring-amber-900/10 shadow-xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs text-stone-900">{area.name}</h4>
                        <span className="text-[10px] text-emerald-700 font-semibold">
                          {area.availableTables} tables left
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mb-2">{area.description}</p>
                      <span className="text-[10px] text-amber-950 font-medium block">
                        {area.ambiance}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time & Guests */}
            <div className="space-y-4 pt-4 border-t border-stone-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                2. Select Date, Time Slot & Party Size
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-500 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 font-medium mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white font-medium"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 font-medium mb-1">Number of Guests</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white font-mono font-bold"
                    />
                    <Users className="w-4 h-4 text-stone-400 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Contact Details */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                3. Primary Guest Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-500 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 font-medium mb-1">
                  Special Requests / Occasion (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Anniversary celebration, birthday cake arrangement, wheelchair accessibility..."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-amber-900 hover:bg-amber-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Confirm & Reserve Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-stone-500 mt-2">
                No reservation fee required · Free cancellation up to 1 hour prior
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
