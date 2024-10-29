package com.doccure.BE.enums;

public enum OrderType {
    LOW_TO_HIGH("lowToHigh"),
    HIGH_TO_LOW("highToLow");

    private final String order;

    OrderType(String order) {
        this.order = order;
    }

    public String getOrder() {
        return order;
    }

    public static OrderType fromString(String order) {
        for (OrderType o : OrderType.values()) {
            if (o.getOrder().equalsIgnoreCase(order)) {
                return o;
            }
        }
        throw new IllegalArgumentException("Invalid order: " + order);
    }
}
