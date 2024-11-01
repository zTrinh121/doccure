package com.doccure.BE.enums;

public enum StatusAppointmentType {
    BOOKED("booked"),
    CANCELED("canceled"),
    PENDING_PAYMENT("pendingPayment"),
    UPCOMING("upcoming");

    private final String type;

    StatusAppointmentType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public static StatusAppointmentType fromString(String type) {
        for (StatusAppointmentType t : StatusAppointmentType.values()) {
            if (t.getType().equalsIgnoreCase(type)) {
                return t;
            }
        }
        throw new IllegalArgumentException("Invalid type: " + type);
    }
}
