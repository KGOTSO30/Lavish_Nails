import { Time } from "@angular/common";

export interface Appointment {
    $appointmentId: string;
    $clientId: string;
    appointmentDate: Date;
    appointmentTime: Time;
    appointmentStatus: string;

}
