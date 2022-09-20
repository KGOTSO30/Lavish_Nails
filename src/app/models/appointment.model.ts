

import { Time } from "@angular/common";


export class Appointment {
    appointmentId?: string | null;
    clientId?: string | null;
    appointmentDate?: Date | null;
    appointmentTime?: Time;
    appointmentStatus?: string | null;
    appointmentService?: string | null;
    appstatus?: boolean | null;
  payload: any ;
}

export interface Booking {
  serviceName: string,
  serviceType: string,
  size: string,
  appTime: Time,
  complete: boolean,
  totalPrice: number
}