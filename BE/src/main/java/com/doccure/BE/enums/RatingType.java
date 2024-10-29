package com.doccure.BE.enums;

public enum  RatingType {
    AVG_RATING("avgRating"),
    COUNT_RATING("countRating");

    private final String type;

    RatingType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public static RatingType fromString(String type) {
        for (RatingType t : RatingType.values()) {
            if (t.getType().equalsIgnoreCase(type)) {
                return t;
            }
        }
        throw new IllegalArgumentException("Invalid type: " + type);
    }
}
