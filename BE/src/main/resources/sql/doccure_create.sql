CREATE TABLE  USERS(	
USER_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
USER_NAME	VARCHAR2(100) NOT NULL,
FIRST_NAME	VARCHAR2(100) NOT NULL,
LAST_NAME	VARCHAR2(100) NOT NULL,
GENDER	VARCHAR2(1) NOT NULL CONSTRAINT USER_GENDER CHECK (GENDER in ('M', 'F', 'f', 'm')),
EMAIL	VARCHAR2(100) NOT NULL,
PASSWORD	VARCHAR2(100) NOT NULL,
AVATAR	VARCHAR2(100) DEFAULT NULL,
CITY	VARCHAR2(100) DEFAULT NULL,
WEIGHT	NUMBER(10, 2) DEFAULT NULL ,
HEIGHT	NUMBER(10, 2) DEFAULT NULL ,
AGE	NUMBER(10) DEFAULT NULL ,
CONSTRAINT USER_PK PRIMARY KEY (USER_ID)
);

ALTER TABLE USERS
ADD CONSTRAINT USERNAME_UNIQUE UNIQUE(USER_NAME);
ALTER TABLE USERS
ADD CONSTRAINT EMAIL_UNIQUE UNIQUE(EMAIL);


CREATE TABLE TOKEN(	
TOKEN_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
ACCESS_TOKEN	VARCHAR2(255) NOT NULL,
REFRESH_TOKEN	VARCHAR2(255) NOT NULL,
IS_LOGGED_OUT	NUMBER(1,0) NOT NULL,
USER_ID	NUMBER(10) NOT NULL,
CONSTRAINT TOKEN_PK PRIMARY KEY (TOKEN_ID),	
CONSTRAINT ACCESS_TOKEN_UNIQUE UNIQUE(ACCESS_TOKEN),	
CONSTRAINT REFRESH_TOKEN_UNIQUE UNIQUE(REFRESH_TOKEN),	
CONSTRAINT FK_TOKEN_USER FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID)
);

CREATE TABLE  DOCTOR(	
DOCTOR_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
FIRST_NAME	VARCHAR2(100) NOT NULL,
LAST_NAME	VARCHAR2(100) NOT NULL,
EXPERIENCE	NUMBER(10) NOT NULL,
HOSPITAL	VARCHAR2(100) NOT NULL,
AVATAR	VARCHAR2(100) ,
CONSTRAINT DOCTOR_PK PRIMARY KEY (DOCTOR_ID)
);

CREATE TABLE SPECIALIZATION(	
SPECIALIZATION_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
SPECIALIZATION_NAME	VARCHAR2(100) NOT NULL,
CONSTRAINT SPECIALIZATION_PK PRIMARY KEY (SPECIALIZATION_ID)
);

CREATE TABLE  DOCTOR_SPECIALIZATION(	
DOCTOR_SPECIALIZATION_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
DOCTOR_ID	NUMBER(10) NOT NULL,
SPECIALIZATION_ID	NUMBER(10) NOT NULL,
CONSTRAINT FK_DOCSPEC_SPEC FOREIGN KEY (SPECIALIZATION_ID) REFERENCES SPECIALIZATION(SPECIALIZATION_ID),	
CONSTRAINT FK_DOCSPEC_DOCTOR FOREIGN KEY (DOCTOR_ID) REFERENCES DOCTOR(DOCTOR_ID),	
CONSTRAINT SPECIALIZATION_DOCTOR_PK PRIMARY KEY (DOCTOR_SPECIALIZATION_ID)
);


CREATE TABLE SLOT(	
SLOT_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
START_DATETIME	TIMESTAMP NOT NULL,
END_DATETIME	TIMESTAMP NOT NULL,
DOCTOR_ID	NUMBER(10)  NOT NULL ,
CONSTRAINT CHK_SLOT_TIMES CHECK ( START_DATETIME < END_DATETIME AND TRUNC(START_DATETIME) = TRUNC(END_DATETIME)),	
CONSTRAINT SLOT_PK PRIMARY KEY (SLOT_ID),	
CONSTRAINT FK_SLOT_DOCTOR FOREIGN KEY (DOCTOR_ID) REFERENCES DOCTOR(DOCTOR_ID));	

CREATE TABLE APPOINTMENT(	
APPOINTMENT_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
STATUS	VARCHAR(20) CONSTRAINT APPOINTMENT_STATUS CHECK (STATUS IN ('BOOKED', 'CANCELED', 'PENDING PAYMENT')),
PRICE	NUMBER(10,2) NOT NULL,
SLOT_ID	NUMBER(10)  NOT NULL ,
DOCTOR_SPECIALIZATION_ID	NUMBER(10)  NOT NULL ,
USER_ID	NUMBER(10)  NOT NULL ,
CONSTRAINT APPOINTMENT_PK PRIMARY KEY (APPOINTMENT_ID),	
CONSTRAINT FK_APPOINTMENT_SLOT FOREIGN KEY (SLOT_ID) REFERENCES SLOT(SLOT_ID),	
CONSTRAINT FK_APPOINTMENT_DOCSPE FOREIGN KEY (DOCTOR_SPECIALIZATION_ID) REFERENCES DOCTOR_SPECIALIZATION(DOCTOR_SPECIALIZATION_ID),	
CONSTRAINT FK_APPOINTMENT_USER FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID)
);

CREATE TABLE  RATING(	
RATING_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
COMMENT_RATING	VARCHAR2(255) NOT NULL,
RATING 	NUMBER(10) NOT NULL,
CREATED_AT	TIMESTAMP NOT NULL,
APPOINTMENT_ID	NUMBER(10) NOT NULL ,
CONSTRAINT RATING_PK PRIMARY KEY (RATING_ID),	
CONSTRAINT FK_RATING_APPOINTMENT FOREIGN KEY (APPOINTMENT_ID) REFERENCES APPOINTMENT(APPOINTMENT_ID)
);

CREATE TABLE INVOICE(	
INVOICE_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
INVOICE_NAME	VARCHAR2(255) NOT NULL,
CREATED_AT	TIMESTAMP NOT NULL,
STATUS	VARCHAR(20) CONSTRAINT INVOICE_STATUS CHECK (STATUS IN ('PENDING', 'SUCCESS', 'FAIL')),
APPOINTMENT_ID	NUMBER(10) NOT NULL,
CONSTRAINT INVOICE_PK PRIMARY KEY (INVOICE_ID),	
CONSTRAINT FK_INVOICE_APPOINTMENT FOREIGN KEY (APPOINTMENT_ID) REFERENCES APPOINTMENT(APPOINTMENT_ID));	

CREATE TABLE INVOICE_ITEM(	
ITEM_ID	NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
ITEM_NAME	VARCHAR2(100) NOT NULL,
QUANTITY	NUMBER(10,2) NOT NULL,
PRICE	NUMBER(10) NOT NULL,
INVOICE_ID	NUMBER(10) NOT NULL,
CONSTRAINT INVOICE_ITEM_PK PRIMARY KEY (ITEM_ID),	
CONSTRAINT FK_ITEM_INVOICE FOREIGN KEY (INVOICE_ID) REFERENCES INVOICE(INVOICE_ID));	

