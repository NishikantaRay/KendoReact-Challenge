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
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Sample itinerary data (replace with CRUD logic)
  const [itinerary, setItinerary] = useState([
    {
      id: 1,
      title: 'Morning Breakfast',
      start: new Date(2024, 11, 15, 8, 0),
      end: new Date(2024, 11, 15, 9, 0),
      description: 'Local cafe breakfast'
    },
    {
      id: 2,
      title: 'City Sightseeing',
      start: new Date(2024, 11, 15, 10, 0),
      end: new Date(2024, 11, 15, 14, 0),
      description: 'Walking tour of historic district'
    },
    {
      id: 3,
      title: 'Museum Visit',
      start: new Date(2024, 11, 15, 15, 0),
      end: new Date(2024, 11, 15, 17, 0),
      description: 'Art museum exploration'
    },
  ]);

  const steps = [
    { label: 'Trip Details', text: 'Basic Information' },
    { label: 'Select Dates', text: 'Choose Your Dates' },
    { label: 'Plan Activities', text: 'Build Your Itinerary' },
    { label: 'Review & Save', text: 'Finalize Your Trip' }
  ];

  const handleStepChange = (event: StepperChangeEvent) => {
    setCurrentStep(event.value);
  };

  const handleDateChange = (event: DateRangePickerChangeEvent) => {
    setDateRange(event.value);
  };

  const handleNext = () => {
    if (currentStep === 0 && (!tripName || !destination)) {
      setNotification({ type: 'error', message: 'Please enter trip name and destination.' });
      return;
    }
    if (currentStep === 1 && (!dateRange.start || !dateRange.end)) {
      setNotification({ type: 'error', message: 'Please select a valid date range.' });
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setNotification({ type: 'success', message: `Step ${currentStep + 1} completed!` });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addActivity = () => {
    const newActivity = {
      id: itinerary.length + 1,
      title: 'New Activity',
      start: dateRange.start || new Date(),
      end: new Date((dateRange.start || new Date()).getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      description: 'Click to edit this activity'
    };
    setItinerary([...itinerary, newActivity]);
    setNotification({ type: 'success', message: 'Activity added to your itinerary!' });
  };

  const saveTripPlan = () => {
    // TODO: Implement save logic with backend
    setNotification({ type: 'success', message: 'Trip plan saved successfully!' });
  };

  return (
    <div style={{ 
      maxWidth: 1200, 
      margin: '0 auto', 
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '40px',
        color: 'white',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '8px'
        }}>
          Trip Planner
        </h1>
        <p style={{
          margin: 0,
          fontSize: '18px',
          opacity: 0.9
        }}>
          Plan your perfect getaway with our step-by-step guide
        </p>
      </div>

      {/* Notifications */}
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

      {/* Progress Stepper */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '32px',
        marginBottom: '24px'
      }}>
        <Stepper 
          value={currentStep} 
          onChange={handleStepChange} 
          items={steps} 
          style={{ marginBottom: 0 }}
        />
      </div>

      {/* Step Content */}
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '40px',
        minHeight: '500px'
      }}>
        
        {/* Step 0: Trip Details */}
        {currentStep === 0 && (
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#2d3748',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Tell us about your trip
            </h2>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Trip Name
              </label>
              <Input
                value={tripName}
                onChange={(e) => setTripName(e.value)}
                placeholder="e.g., Summer Vacation 2024"
                style={{ width: '100%', padding: '12px' }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 500,
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Destination
              </label>
              <Input
                value={destination}
                onChange={(e) => setDestination(e.value)}
                placeholder="e.g., Paris, France"
                style={{ width: '100%', padding: '12px' }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={handleNext}
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 500,
                  borderRadius: '8px'
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Date Selection */}
        {currentStep === 1 && (
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#2d3748',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              When are you traveling?
            </h2>
            
            <div style={{
              background: '#f7fafc',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#718096',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                Select your trip start and end dates
              </p>
              <DateRangePicker 
                value={dateRange} 
                onChange={handleDateChange} 
                style={{ 
                  width: '100%',
                  maxWidth: '350px'
                }} 
              />
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center' 
            }}>
              <Button 
                onClick={handleBack}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px'
                }}
              >
                Back
              </Button>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={handleNext}
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 500,
                  borderRadius: '8px'
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Activity Planning */}
        {currentStep === 2 && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#2d3748',
                margin: 0
              }}>
                Plan Your Activities
              </h2>
              <Button 
                themeColor="primary"
                onClick={addActivity}
                style={{
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '6px'
                }}
              >
                + Add Activity
              </Button>
            </div>

            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <Scheduler 
                data={itinerary} 
                defaultView="week"
                style={{ 
                  minHeight: '400px',
                  border: 'none'
                }} 
              />
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center' 
            }}>
              <Button 
                onClick={handleBack}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px'
                }}
              >
                Back
              </Button>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={handleNext}
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 500,
                  borderRadius: '8px'
                }}
              >
                Review Trip
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Save */}
        {currentStep === 3 && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#2d3748',
              marginBottom: '32px',
              textAlign: 'center'
            }}>
              Review Your Trip Plan
            </h2>

            <div style={{
              background: '#f7fafc',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#2d3748',
                marginBottom: '16px'
              }}>
                Trip Summary
              </h3>
              
              <div style={{ marginBottom: '12px' }}>
                <strong>Trip Name:</strong> {tripName || 'Unnamed Trip'}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Destination:</strong> {destination || 'Not specified'}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Dates:</strong> {
                  dateRange.start && dateRange.end 
                    ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
                    : 'Not selected'
                }
              </div>
              <div>
                <strong>Activities:</strong> {itinerary.length} planned activities
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center' 
            }}>
              <Button 
                onClick={handleBack}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px'
                }}
              >
                Back
              </Button>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={saveTripPlan}
                style={{
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: 500,
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #48bb78, #38a169)',
                  border: 'none'
                }}
              >
                Save Trip Plan
              </Button>
            </div>
          </div>
        )}
      </div>

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
