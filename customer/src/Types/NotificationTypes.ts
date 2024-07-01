import { AppointmentFormType } from "./AppointmentTypes"

export type NotificationType = {
    _id?: string
    clientId?: string
    message?: string
    appointmentDetails?: AppointmentFormType
    status?: string
}