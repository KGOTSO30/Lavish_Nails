export interface Client {
    $clientId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: Number;
    status: boolean;
    completedAppointments: Number;
    totalSpend: Number;
}
