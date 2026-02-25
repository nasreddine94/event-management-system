/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'ATTENDEE' | 'EXHIBITOR' | 'MANAGER' | 'PARTNER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  price: number;
  category: string;
}

export interface Speaker {
  id: string;
  eventId: string;
  name: string;
  bio: string;
  topic: string;
  avatar: string;
}

export interface Exhibitor {
  id: string;
  eventId: string;
  name: string;
  description: string;
  boothNumber: string;
  logo: string;
}

export interface Lead {
  id: string;
  exhibitorId: string;
  attendeeId: string;
  attendeeName: string;
  attendeeEmail: string;
  scannedAt: string;
  notes?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: 'RENTAL' | 'CATERING' | 'AV' | 'SECURITY';
  description: string;
  rating: number;
}
