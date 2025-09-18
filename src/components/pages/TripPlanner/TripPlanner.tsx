import React, { useState } from 'react';
import { Stepper } from '@progress/kendo-react-layout';
import type { StepperChangeEvent } from '@progress/kendo-react-stepper';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import type { DateRangePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { Scheduler } from '@progress/kendo-react-scheduler';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';

// TODO: Replace with real CRUD hooks or connect to backend
// Example: useTrips(), useCreateTrip(), useUpdateTrip(), useDeleteTrip()
// For now, use local state and sample data
const TripPlanner: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  // Sample itinerary data (replace with CRUD logic)
  const [itinerary, setItinerary] = useState([
    {
      id: 1,
      title: 'Breakfast',
      start: new Date(2023, 10, 1, 8, 0),
      end: new Date(2023, 10, 1, 9, 0),
    },
    {
      id: 2,
      title: 'Sightseeing',
      start: new Date(2023, 10, 1, 10, 0),
      end: new Date(2023, 10, 1, 12, 0),
    },
  ]);

  const steps = [
    { label: 'Select Dates' },
    { label: 'Plan Itinerary' },
  ];

  const handleStepChange = (event: StepperChangeEvent) => {
    setCurrentStep(event.value);
  };

  const handleDateChange = (event: DateRangePickerChangeEvent) => {
    setDateRange(event.value);
  };

  // Example: Show notification on step complete
  const handleNext = () => {
    if (!dateRange.start || !dateRange.end) {
      setNotification({ type: 'error', message: 'Please select a valid date range.' });
      return;
    }
    setCurrentStep(1);
    setNotification({ type: 'success', message: 'Trip dates selected!' });
  };

  // Example: Add itinerary item (replace with real CRUD)
  const addItineraryItem = () => {
    setItinerary([
      ...itinerary,
      {
        id: itinerary.length + 1,
        title: 'New Activity',
        start: new Date(),
        end: new Date(),
      },
    ]);
    setNotification({ type: 'success', message: 'Itinerary item added!' });
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
      <h2 style={{ textAlign: 'left', marginBottom: 24 }}>Trip Planner</h2>
      <Stepper value={currentStep} onChange={handleStepChange} items={steps} style={{ marginBottom: 32 }} />
      {notification && (
        <NotificationGroup style={{ position: 'fixed', top: 100, right: 24, zIndex: 2000 }}>
          <Notification
            type={{ style: notification.type, icon: true }}
            closable
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        </NotificationGroup>
      )}
      {currentStep === 0 && (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <h3>Select Trip Dates</h3>
          <div>
            <Tooltip anchorElement="target" position="top" content="Pick your trip start and end dates">
              <span style={{ display: 'block', width: '100%' }}>
                <DateRangePicker 
                  value={dateRange} 
                  onChange={handleDateChange} 
                  style={{ width: '100%', marginBottom: 16 }} 
                />
              </span>
            </Tooltip>
          </div>
          <Button themeColor="primary" onClick={handleNext} style={{ marginTop: 8 }}>Next</Button>
        </div>
      )}
      {currentStep === 1 && (
        <div>
          <h3>Plan Daily Itinerary</h3>
          <div>
            <Tooltip anchorElement="target" position="top" content="Add activities to your trip schedule">
              <span>
                <Button onClick={addItineraryItem} style={{ marginBottom: 12 }}>Add Activity</Button>
              </span>
            </Tooltip>
          </div>
          <Scheduler data={itinerary} defaultView="day" style={{ background: '#f9f9f9', borderRadius: 8 }} />
          <Button onClick={() => setCurrentStep(0)} style={{ marginTop: 16 }}>Back</Button>
        </div>
      )}
      {/*
        To connect to a backend, replace local state with CRUD hooks:
        - useTrips() to fetch trips
        - useCreateTrip(), useUpdateTrip(), useDeleteTrip() for actions
        See /src/hooks/ for examples or add your own.
      */}
    </div>
  );
};

export default TripPlanner;
