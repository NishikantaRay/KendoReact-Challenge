import React, { useState } from 'react';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { AppBar, AppBarSection } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import { Link, useLocation } from 'react-router-dom';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import '@progress/kendo-theme-default/dist/all.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [notification, setNotification] = useState<{type: 'success'|'error', message: string}|null>(null);
  const location = useLocation();

  const toggleDrawer = () => setDrawerExpanded(!drawerExpanded);

  // Example: Call setNotification({type: 'success', message: 'Action successful!'}) to show a notification

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fa' }}>
  <AppBar style={{ position: 'sticky', top: 0, zIndex: 1201 }}>
        <AppBarSection>
          <Button onClick={toggleDrawer} icon="menu" fillMode="flat" aria-label="Open navigation drawer" />
          <span style={{ fontWeight: 700, fontSize: 20, marginLeft: 16 }}>Knowledge-Base Travel Planner</span>
        </AppBarSection>
      </AppBar>
      <Drawer
        expanded={drawerExpanded}
        position="start"
        mode="push"
        width={220}
        onOverlayClick={toggleDrawer}
        items={[]}
        style={{ zIndex: 1200 }}
      >
        <DrawerContent>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Tooltip anchorElement="target" position="right" openDelay={300} content="Plan your trip step by step">
                  <Link
                    to="/trip-planner"
                    onClick={toggleDrawer}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: location.pathname === '/trip-planner' ? '#1976d2' : '#333',
                      fontWeight: location.pathname === '/trip-planner' ? 700 : 400,
                      background: location.pathname === '/trip-planner' ? '#e3f2fd' : 'transparent',
                      borderRadius: 6,
                      textDecoration: 'none',
                      marginBottom: 4
                    }}
                  >
                    Trip Planner
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip anchorElement="target" position="right" openDelay={300} content="Track your travel expenses">
                  <Link
                    to="/expense-tracker"
                    onClick={toggleDrawer}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: location.pathname === '/expense-tracker' ? '#1976d2' : '#333',
                      fontWeight: location.pathname === '/expense-tracker' ? 700 : 400,
                      background: location.pathname === '/expense-tracker' ? '#e3f2fd' : 'transparent',
                      borderRadius: 6,
                      textDecoration: 'none',
                      marginBottom: 4
                    }}
                  >
                    Expense Tracker
                  </Link>
                </Tooltip>
              </li>
              <li>
                <Tooltip anchorElement="target" position="right" openDelay={300} content="Ask travel questions">
                  <Link
                    to="/travel-faq"
                    onClick={toggleDrawer}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: location.pathname === '/travel-faq' ? '#1976d2' : '#333',
                      fontWeight: location.pathname === '/travel-faq' ? 700 : 400,
                      background: location.pathname === '/travel-faq' ? '#e3f2fd' : 'transparent',
                      borderRadius: 6,
                      textDecoration: 'none',
                      marginBottom: 4
                    }}
                  >
                    Travel FAQ
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
      <main style={{ padding: 24, marginTop: 64, minHeight: 'calc(100vh - 64px)' }}>
        {/* Notification example usage: setNotification({type: 'success', message: 'Action successful!'}) */}
        {notification && (
          <NotificationGroup style={{ position: 'fixed', top: 80, right: 24, zIndex: 2000 }}>
            <Notification
              type={{ style: notification.type, icon: true }}
              closable
              onClose={() => setNotification(null)}
            >
              {notification.message}
            </Notification>
          </NotificationGroup>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;
