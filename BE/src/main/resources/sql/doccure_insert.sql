INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Nguyễn', 'Vân Anh', 10, 'Bệnh viện Bạch Mai');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Trần', 'Thị Bình', 8, 'Bệnh viện Chợ Rẫyy');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Phạm', 'Minh Cảnh', 15, 'Bệnh viện Trung Hùng Vương');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Lê', 'Vân Diệu', 12, 'Bệnh viện Nhi Đồng 1');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Hoàng', 'Ngọc Yến', 9, 'Bệnh viện 108');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Hòang', 'Thị Thanh', 7, 'Bệnh viện đại học Y Hà Nội');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Phan', 'Thanh Giản', 11, 'Bệnh viện Hữu Nghị Việt Đức');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Vũ', 'Minh Hoàng', 5, 'Bệnh viện Quân y 103');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Bùi', 'Hoàng Tiến', 13, 'Bệnh viện Phụ sản Trung ương');
INSERT INTO DOCTOR (FIRST_NAME, LAST_NAME, EXPERIENCE, HOSPITAL)
VALUES ('Võ', 'Phùng Khánh', 14, 'Bệnh viện K');
SELECT * FROM doctor;


INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Nội khoa');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Ngoại khoa');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Nhi khoa');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Sản phụ khoa');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Tai mũi họng');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Da liễu');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Tim mạch');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Thần kinh');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Nhãn khoa');
INSERT INTO SPECIALIZATION (SPECIALIZATION_NAME)
VALUES ('Chấn thương chỉnh hình');
SELECT * FROM SPECIALIZATION;


INSERT INTO SLOT (START_DATETIME, END_DATETIME, DOCTOR_ID)
VALUES (TIMESTAMP '2024-10-21 08:00:00', TIMESTAMP '2024-10-21 09:00:00', 1);
INSERT INTO SLOT (START_DATETIME, END_DATETIME, DOCTOR_ID)
VALUES (TIMESTAMP '2024-10-21 09:00:00', TIMESTAMP '2024-10-21 10:00:00', 1);
INSERT INTO SLOT (START_DATETIME, END_DATETIME, DOCTOR_ID)
VALUES (TIMESTAMP '2024-10-21 10:00:00', TIMESTAMP '2024-10-21 11:00:00', 1);
INSERT INTO SLOT (START_DATETIME, END_DATETIME, DOCTOR_ID)
VALUES (TIMESTAMP '2024-10-21 13:00:00', TIMESTAMP '2024-10-21 14:00:00', 1);
INSERT INTO SLOT (START_DATETIME, END_DATETIME, DOCTOR_ID)
VALUES (TIMESTAMP '2024-10-21 14:00:00', TIMESTAMP '2024-10-21 15:00:00', 1);
INSERT INTO SLOT (START_DATETIME, END_DATETIME, DOCTOR_ID)
VALUES (TIMESTAMP '2024-10-21 15:00:00', TIMESTAMP '2024-10-21 16:00:00', 1);
INSERT INTO SLOT (START_DATETIME, END_DATETIME, DOCTOR_ID)
VALUES (TIMESTAMP '2024-10-21 16:00:00', TIMESTAMP '2024-10-21 17:00:00', 1);
SELECT * FROM SLOT;

INSERT INTO doctor_specialization(DOCTOR_ID, SPECIALIZATION_ID)
VALUES (1, 1);
INSERT INTO doctor_specialization(DOCTOR_ID, SPECIALIZATION_ID)
VALUES (1, 3);
INSERT INTO doctor_specialization(DOCTOR_ID, SPECIALIZATION_ID)
VALUES (2, 2);
INSERT INTO doctor_specialization(DOCTOR_ID, SPECIALIZATION_ID)
VALUES (3, 5);


INSERT INTO APPOINTMENT (STATUS, PRICE, SLOT_ID, DOCTOR_SPECIALIZATION_ID, USER_ID) 
VALUES ('BOOKED', 200.00, 1, 1, 41);
INSERT INTO APPOINTMENT (STATUS, PRICE, SLOT_ID, DOCTOR_SPECIALIZATION_ID, USER_ID) 
VALUES ('CANCELED', 400.000, 2, 1, 41);
INSERT INTO APPOINTMENT (STATUS, PRICE, SLOT_ID, DOCTOR_SPECIALIZATION_ID, USER_ID) 
VALUES ('PENDING_PAYMENT', 600.000, 3, 2, 41);
INSERT INTO APPOINTMENT (STATUS, PRICE, SLOT_ID, DOCTOR_SPECIALIZATION_ID, USER_ID) 
VALUES ('BOOKED', 200.00, 3, 1, 41);
INSERT INTO APPOINTMENT (STATUS, PRICE, SLOT_ID, DOCTOR_SPECIALIZATION_ID, USER_ID) 
VALUES ('BOOKED', 200.00, 4, 3, 41);

INSERT INTO RATING (COMMENT_RATING, RATING, CREATED_AT, APPOINTMENT_ID) 
VALUES ('Great service, very professional', 5, SYSTIMESTAMP, 1);
INSERT INTO RATING (COMMENT_RATING, RATING, CREATED_AT, APPOINTMENT_ID) 
VALUES ('Doctor was helpful but waited too long', 4, SYSTIMESTAMP, 4);
INSERT INTO RATING (COMMENT_RATING, RATING, CREATED_AT, APPOINTMENT_ID) 
VALUES ('Satisfied with the consultation', 4, SYSTIMESTAMP, 5);


INSERT INTO invoice (invoice_name, created_at, status, APPOINTMENT_ID)
VALUES('Invoice 1', SYSTIMESTAMP, 'SUCCESS', 1);
INSERT INTO invoice (invoice_name, created_at, status, APPOINTMENT_ID)
VALUES('Invoice 2', SYSTIMESTAMP, 'FAIL', 2);
INSERT INTO invoice (invoice_name, created_at, status, APPOINTMENT_ID)
VALUES('Invoice 3', SYSTIMESTAMP, 'PENDING', 3);
INSERT INTO invoice (invoice_name, created_at, status, APPOINTMENT_ID)
VALUES('Invoice 4', SYSTIMESTAMP, 'SUCCESS', 4);
INSERT INTO invoice (invoice_name, created_at, status, APPOINTMENT_ID)
VALUES('Invoice 5', SYSTIMESTAMP, 'SUCCESS', 5);

INSERT INTO invoice_item (item_name, quantity, price, Invoice_id)
VALUES('Appoinment 1 hour for doctor', 1, 500, 1);
INSERT INTO invoice_item (item_name, quantity, price, Invoice_id)
VALUES('Appoinment 1 hour for doctor', 1, 200, 2);
INSERT INTO invoice_item (item_name, quantity, price, Invoice_id)
VALUES('Extra fee for medicine', 1, 200, 2);