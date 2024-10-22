package com.doccure.BE.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class AppointmentExample {
    
    protected String orderByClause;

    
    protected boolean distinct;

    
    protected List<Criteria> oredCriteria;

    
    public AppointmentExample() {
        oredCriteria = new ArrayList<>();
    }

    
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    
    public String getOrderByClause() {
        return orderByClause;
    }

    
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    
    public boolean isDistinct() {
        return distinct;
    }

    
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andAppointmentIdIsNull() {
            addCriterion("APPOINTMENT_ID is null");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdIsNotNull() {
            addCriterion("APPOINTMENT_ID is not null");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdEqualTo(Long value) {
            addCriterion("APPOINTMENT_ID =", value, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdNotEqualTo(Long value) {
            addCriterion("APPOINTMENT_ID <>", value, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdGreaterThan(Long value) {
            addCriterion("APPOINTMENT_ID >", value, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdGreaterThanOrEqualTo(Long value) {
            addCriterion("APPOINTMENT_ID >=", value, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdLessThan(Long value) {
            addCriterion("APPOINTMENT_ID <", value, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdLessThanOrEqualTo(Long value) {
            addCriterion("APPOINTMENT_ID <=", value, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdIn(List<Long> values) {
            addCriterion("APPOINTMENT_ID in", values, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdNotIn(List<Long> values) {
            addCriterion("APPOINTMENT_ID not in", values, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdBetween(Long value1, Long value2) {
            addCriterion("APPOINTMENT_ID between", value1, value2, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andAppointmentIdNotBetween(Long value1, Long value2) {
            addCriterion("APPOINTMENT_ID not between", value1, value2, "appointmentId");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("STATUS is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("STATUS is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(String value) {
            addCriterion("STATUS =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(String value) {
            addCriterion("STATUS <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(String value) {
            addCriterion("STATUS >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(String value) {
            addCriterion("STATUS >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(String value) {
            addCriterion("STATUS <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(String value) {
            addCriterion("STATUS <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLike(String value) {
            addCriterion("STATUS like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotLike(String value) {
            addCriterion("STATUS not like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<String> values) {
            addCriterion("STATUS in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<String> values) {
            addCriterion("STATUS not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(String value1, String value2) {
            addCriterion("STATUS between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(String value1, String value2) {
            addCriterion("STATUS not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andPriceIsNull() {
            addCriterion("PRICE is null");
            return (Criteria) this;
        }

        public Criteria andPriceIsNotNull() {
            addCriterion("PRICE is not null");
            return (Criteria) this;
        }

        public Criteria andPriceEqualTo(BigDecimal value) {
            addCriterion("PRICE =", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotEqualTo(BigDecimal value) {
            addCriterion("PRICE <>", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceGreaterThan(BigDecimal value) {
            addCriterion("PRICE >", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("PRICE >=", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceLessThan(BigDecimal value) {
            addCriterion("PRICE <", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceLessThanOrEqualTo(BigDecimal value) {
            addCriterion("PRICE <=", value, "price");
            return (Criteria) this;
        }

        public Criteria andPriceIn(List<BigDecimal> values) {
            addCriterion("PRICE in", values, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotIn(List<BigDecimal> values) {
            addCriterion("PRICE not in", values, "price");
            return (Criteria) this;
        }

        public Criteria andPriceBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("PRICE between", value1, value2, "price");
            return (Criteria) this;
        }

        public Criteria andPriceNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("PRICE not between", value1, value2, "price");
            return (Criteria) this;
        }

        public Criteria andSlotIdIsNull() {
            addCriterion("SLOT_ID is null");
            return (Criteria) this;
        }

        public Criteria andSlotIdIsNotNull() {
            addCriterion("SLOT_ID is not null");
            return (Criteria) this;
        }

        public Criteria andSlotIdEqualTo(Long value) {
            addCriterion("SLOT_ID =", value, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdNotEqualTo(Long value) {
            addCriterion("SLOT_ID <>", value, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdGreaterThan(Long value) {
            addCriterion("SLOT_ID >", value, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdGreaterThanOrEqualTo(Long value) {
            addCriterion("SLOT_ID >=", value, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdLessThan(Long value) {
            addCriterion("SLOT_ID <", value, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdLessThanOrEqualTo(Long value) {
            addCriterion("SLOT_ID <=", value, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdIn(List<Long> values) {
            addCriterion("SLOT_ID in", values, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdNotIn(List<Long> values) {
            addCriterion("SLOT_ID not in", values, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdBetween(Long value1, Long value2) {
            addCriterion("SLOT_ID between", value1, value2, "slotId");
            return (Criteria) this;
        }

        public Criteria andSlotIdNotBetween(Long value1, Long value2) {
            addCriterion("SLOT_ID not between", value1, value2, "slotId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdIsNull() {
            addCriterion("DOCTOR_SPECIALIZATION_ID is null");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdIsNotNull() {
            addCriterion("DOCTOR_SPECIALIZATION_ID is not null");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdEqualTo(Long value) {
            addCriterion("DOCTOR_SPECIALIZATION_ID =", value, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdNotEqualTo(Long value) {
            addCriterion("DOCTOR_SPECIALIZATION_ID <>", value, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdGreaterThan(Long value) {
            addCriterion("DOCTOR_SPECIALIZATION_ID >", value, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdGreaterThanOrEqualTo(Long value) {
            addCriterion("DOCTOR_SPECIALIZATION_ID >=", value, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdLessThan(Long value) {
            addCriterion("DOCTOR_SPECIALIZATION_ID <", value, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdLessThanOrEqualTo(Long value) {
            addCriterion("DOCTOR_SPECIALIZATION_ID <=", value, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdIn(List<Long> values) {
            addCriterion("DOCTOR_SPECIALIZATION_ID in", values, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdNotIn(List<Long> values) {
            addCriterion("DOCTOR_SPECIALIZATION_ID not in", values, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdBetween(Long value1, Long value2) {
            addCriterion("DOCTOR_SPECIALIZATION_ID between", value1, value2, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andDoctorSpecializationIdNotBetween(Long value1, Long value2) {
            addCriterion("DOCTOR_SPECIALIZATION_ID not between", value1, value2, "doctorSpecializationId");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("USER_ID is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("USER_ID is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Long value) {
            addCriterion("USER_ID =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Long value) {
            addCriterion("USER_ID <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Long value) {
            addCriterion("USER_ID >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Long value) {
            addCriterion("USER_ID >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Long value) {
            addCriterion("USER_ID <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Long value) {
            addCriterion("USER_ID <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Long> values) {
            addCriterion("USER_ID in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Long> values) {
            addCriterion("USER_ID not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Long value1, Long value2) {
            addCriterion("USER_ID between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Long value1, Long value2) {
            addCriterion("USER_ID not between", value1, value2, "userId");
            return (Criteria) this;
        }
    }

    
    public static class Criteria extends GeneratedCriteria {
        protected Criteria() {
            super();
        }
    }

    
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}