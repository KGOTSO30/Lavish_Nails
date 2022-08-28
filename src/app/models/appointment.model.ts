

import { Time } from "@angular/common";


export class Appointment {
    appointmentId?: string;
    clientId?: string;
    appointmentDate?: Date;
    appointmentTime?: Time;
    appointmentStatus?: string;
    appointmentService?: string;
    appstatus?: boolean;
}