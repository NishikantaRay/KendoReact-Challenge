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
    { label: 'Trip Details' },
    { label: 'Select Dates' },
    { label: 'Plan Activities' },
    { label: 'Review & Save' }
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
      width: '100%',
      minWidth: '1400px',
      margin: '0 auto', 
      padding: '32px 48px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '60px 80px',
        color: 'white',
        marginBottom: '40px',
        textAlign: 'center',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '48px',
          fontWeight: 700,
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Trip Planner
        </h1>
        <p style={{
          margin: 0,
          fontSize: '24px',
          opacity: 0.95,
          fontWeight: 300
        }}>
          Plan your perfect getaway with our comprehensive step-by-step guide
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
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        padding: '50px 80px',
        marginBottom: '40px'
      }}>
        <div style={{
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#4a5568',
            fontSize: '22px',
            fontWeight: 600,
            margin: 0
          }}>
            Step {currentStep + 1} of {steps.length}
          </h3>
        </div>
        <Stepper 
          value={currentStep} 
          onChange={handleStepChange} 
          items={steps} 
          style={{ 
            marginBottom: 0,
            fontSize: '18px'
          }}
        />
        <div style={{
          marginTop: '32px',
          textAlign: 'center',
          color: '#718096',
          fontSize: '20px',
          fontWeight: 600
        }}>
          {steps[currentStep]?.label}
        </div>
      </div>

      {/* Step Content */}
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        padding: '60px 80px',
        minHeight: '700px'
      }}>
        
        {/* Step 0: Trip Details */}
        {currentStep === 0 && (
          <div style={{ width: '100%' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#2d3748',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              Tell us about your trip
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '60px',
              marginBottom: '60px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#2d3748',
                  marginBottom: '16px'
                }}>
                  Trip Name
                </label>
                <Input
                  value={tripName}
                  onChange={(e) => setTripName(e.value)}
                  placeholder="e.g., Summer Vacation 2024"
                  style={{ 
                    width: '100%', 
                    padding: '20px',
                    fontSize: '18px',
                    borderRadius: '12px',
                    minHeight: '60px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#2d3748',
                  marginBottom: '16px'
                }}>
                  Destination
                </label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.value)}
                  placeholder="e.g., Paris, France"
                  style={{ 
                    width: '100%', 
                    padding: '20px',
                    fontSize: '18px',
                    borderRadius: '12px',
                    minHeight: '60px'
                  }}
                />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={handleNext}
                style={{
                  padding: '20px 60px',
                  fontSize: '20px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  minHeight: '60px'
                }}
              >
                Continue to Dates →
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Date Selection */}
        {currentStep === 1 && (
          <div style={{ width: '100%' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#2d3748',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              When are you traveling?
            </h2>
            
            <div style={{
              background: '#f7fafc',
              borderRadius: '20px',
              padding: '60px',
              marginBottom: '60px',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 60px auto'
            }}>
              <p style={{
                color: '#4a5568',
                marginBottom: '32px',
                fontSize: '22px',
                fontWeight: 500
              }}>
                Select your trip start and end dates
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <DateRangePicker 
                  value={dateRange} 
                  onChange={handleDateChange} 
                  style={{ 
                    width: '100%',
                    maxWidth: '600px',
                    fontSize: '18px',
                    minHeight: '60px'
                  }} 
                />
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center' 
            }}>
              <Button 
                onClick={handleBack}
                style={{
                  padding: '18px 40px',
                  fontSize: '18px',
                  borderRadius: '12px',
                  minHeight: '60px'
                }}
              >
                ← Back to Details
              </Button>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={handleNext}
                style={{
                  padding: '20px 60px',
                  fontSize: '20px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  minHeight: '60px'
                }}
              >
                Plan Activities →
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Activity Planning */}
        {currentStep === 2 && (
          <div style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '48px'
            }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#2d3748',
                margin: 0
              }}>
                Plan Your Activities
              </h2>
              <Button 
                themeColor="primary"
                onClick={addActivity}
                style={{
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  minHeight: '60px'
                }}
              >
                + Add New Activity
              </Button>
            </div>

            <div style={{
              background: '#f8fafc',
              borderRadius: '20px',
              padding: '40px',
              marginBottom: '48px',
              width: '100%'
            }}>
              <Scheduler 
                data={itinerary} 
                defaultView="week"
                style={{ 
                  minHeight: '600px',
                  border: 'none',
                  width: '100%',
                  fontSize: '16px'
                }} 
              />
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              justifyContent: 'center' 
            }}>
              <Button 
                onClick={handleBack}
                style={{
                  padding: '18px 40px',
                  fontSize: '18px',
                  borderRadius: '12px',
                  minHeight: '60px'
                }}
              >
                ← Back to Dates
              </Button>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={handleNext}
                style={{
                  padding: '20px 60px',
                  fontSize: '20px',
                  fontWeight: 600,
                  borderRadius: '12px',
                  minHeight: '60px'
                }}
              >
                Review & Save →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Save */}
        {currentStep === 3 && (
          <div style={{ width: '100%' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #48bb78, #38a169)',
                borderRadius: '50px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                marginBottom: '24px'
              }}>
                STEP 4 OF 4 - FINAL REVIEW
              </div>
              <h2 style={{
                fontSize: '40px',
                fontWeight: 700,
                color: '#2d3748',
                margin: 0,
                marginBottom: '16px'
              }}>
                Review Your Trip Plan
              </h2>
              <p style={{
                fontSize: '22px',
                color: '#718096',
                margin: 0
              }}>
                Everything looks perfect? Let's save your amazing adventure!
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              marginBottom: '60px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ebf8ff, #bee3f8)',
                borderRadius: '24px',
                padding: '40px',
                border: '2px solid #90cdf4'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#3182ce',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px'
                  }}>
                    <span style={{
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>📍</span>
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#2d3748',
                    margin: 0
                  }}>
                    Trip Details
                  </h3>
                </div>
                
                <div style={{ 
                  marginBottom: '24px',
                  fontSize: '18px',
                  lineHeight: 1.8,
                  color: '#2d3748'
                }}>
                  <div style={{
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.3)'
                  }}>
                    <strong style={{ fontSize: '20px' }}>Trip Name:</strong>
                    <div style={{ marginTop: '8px', color: '#4a5568', fontSize: '18px' }}>
                      {tripName || 'Unnamed Trip'}
                    </div>
                  </div>
                  <div style={{
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.3)'
                  }}>
                    <strong style={{ fontSize: '20px' }}>Destination:</strong>
                    <div style={{ marginTop: '8px', color: '#4a5568', fontSize: '18px' }}>
                      {destination || 'Not specified'}
                    </div>
                  </div>
                  <div style={{
                    padding: '16px 0'
                  }}>
                    <strong style={{ fontSize: '20px' }}>Travel Dates:</strong>
                    <div style={{ marginTop: '8px', color: '#4a5568', fontSize: '18px' }}>
                      {dateRange.start && dateRange.end 
                        ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
                        : 'Not selected'
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f0fff4, #c6f6d5)',
                borderRadius: '24px',
                padding: '40px',
                border: '2px solid #9ae6b4'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#38a169',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '20px'
                  }}>
                    <span style={{
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>🗓️</span>
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#2d3748',
                    margin: 0
                  }}>
                    Activities Summary
                  </h3>
                </div>
                
                <div style={{ 
                  marginBottom: '20px',
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: '#2d3748'
                }}>
                  <div style={{
                    padding: '16px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.3)',
                    marginBottom: '20px'
                  }}>
                    <strong style={{ fontSize: '20px' }}>Total Activities: {itinerary.length}</strong>
                  </div>
                </div>
                
                <div style={{ 
                  maxHeight: '280px', 
                  overflowY: 'auto',
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: '16px',
                  padding: '20px'
                }}>
                  {itinerary.map((activity, index) => (
                    <div key={activity.id} style={{
                      padding: '16px 0',
                      borderBottom: index < itinerary.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                      fontSize: '17px'
                    }}>
                      <div style={{ 
                        fontWeight: 600,
                        color: '#2d3748',
                        marginBottom: '6px',
                        fontSize: '18px'
                      }}>
                        {activity.title}
                      </div>
                      <div style={{ 
                        color: '#718096',
                        fontSize: '15px'
                      }}>
                        {activity.start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {activity.end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '24px', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Button 
                onClick={handleBack}
                style={{
                  padding: '20px 40px',
                  fontSize: '18px',
                  borderRadius: '12px',
                  background: '#f7fafc',
                  border: '2px solid #e2e8f0',
                  color: '#4a5568',
                  minHeight: '60px'
                }}
              >
                ← Back to Activities
              </Button>
              <Button 
                themeColor="primary" 
                size="large"
                onClick={saveTripPlan}
                style={{
                  padding: '24px 60px',
                  fontSize: '20px',
                  fontWeight: 700,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  border: 'none',
                  boxShadow: '0 12px 32px rgba(72, 187, 120, 0.4)',
                  transform: 'translateY(0)',
                  transition: 'all 0.2s ease',
                  minHeight: '70px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(72, 187, 120, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(72, 187, 120, 0.4)';
                }}
              >
                🚀 Save Complete Trip Plan
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
