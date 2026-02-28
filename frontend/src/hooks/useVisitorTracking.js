import { useEffect } from 'react';
import { visitorService } from '../services/api';

export const useVisitorTracking = (pageName) => {
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        // Generate or retrieve a session ID
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem('sessionId', sessionId);
          localStorage.setItem('sessionId', sessionId);
        }

        // Track the visitor
        await visitorService.trackVisitor(pageName);
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.log('Visitor tracking skipped');
      }
    };

    if (pageName) {
      trackPageVisit();
    }
  }, [pageName]);
};
