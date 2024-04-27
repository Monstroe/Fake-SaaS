DROP DATABASE IF EXISTS fakesqlsaas;
CREATE DATABASE IF NOT EXISTS fakesqlsaas;
use fakesqlsaas;

CREATE TABLE Users (
	UserID INT PRIMARY KEY AUTO_INCREMENT,
	UserName VARCHAR(50) NOT NULL,
	PasswordHash VARCHAR(100) NOT NULL,
	FirstName VARCHAR(50),
	LastName VARCHAR(50),
	Plan INT DEFAULT 1,
	IsAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE Payments (
	CardID INT PRIMARY KEY AUTO_INCREMENT,
	UserID INT NOT NULL,
	CardHolder VARCHAR(100) NOT NULL,
	CardNumber CHAR(16) NOT NULL,
	CVV VARCHAR(4) NOT NULL,
	ExpDate DATE NOT NULL,
	Address VARCHAR(100) NOT NULL,
	City VARCHAR(50) NOT NULL,
	State VARCHAR(50) NOT NULL,
	ZipCode VARCHAR(10) NOT NULL,
	FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

CREATE TABLE Updates (
	UpdateID INT PRIMARY KEY AUTO_INCREMENT,
	UpdateDescription VARCHAR(255),
	DateReleased DATE NOT NULL,
	Plan INT
);

INSERT INTO Users (UserID, UserName, PasswordHash, FirstName, LastName, Plan, IsAdmin) VALUES
(1, 'john_doe', '$2a$10$jvyLpMWikEcA.WqsPMT4PuiAQnFMCpNIpvdhR0mzqO6RpXGxLSfy6', 'John', 'Doe', 1, true),
(2, 'CoolJane', '$2a$10$LN0sdUTcvG0j2eL.Ju1EB.zCTOpt4sH1I346jtmPiPqOdFJi8a9A6', 'Jane', 'Smith', 2, false),
(3, 'elitehaxor', '$2a$10$rPbWLDviTAEBywO2Z2BHDe.Y2aUgvi0ziGGYYIDU99IHFfVGLlMyS', 'Mike', 'Johnson', 1, false),
(4, 'emmsbrownie', '$2a$10$L15Sl3Y5vSld0vnSKnMF2esZ64p.mO2sq3zVo.6aQG3cOuDeJ72W.', 'Emily', 'Brown', 3, false),
(5, 'MrDavid', '$2a$10$zh5vL5H8U0z3/DgJBte6m.Ke2KEseMRsVwCf/CaLE8w5pEoMnkFcK', 'David', 'Wilson', 2, false);

INSERT INTO Payments (CardID, UserID, CardHolder, CardNumber, CVV, ExpDate, Address, City, State, ZipCode) VALUES
(1, 1, 'John Doe', '1234567890123456', '1234', '2024-12-31', '123 Main St', 'New York', 'NY', '10001'),
(2, 2, 'Jane Smith', '9876543210987654', '5678', '2023-11-30', '456 Oak St', 'Los Angeles', 'CA', '90001'),
(3, 3, 'Mike Johnson', '2468135790246813', '9876', '2025-09-30', '789 Elm St', 'Chicago', 'IL', '60601'),
(4, 4, 'Emily Brown', '1357924680135792', '4321', '2026-05-31', '321 Pine St', 'Houston', 'TX', '77002'),
(5, 5, 'David Wilson', '3692581470369258', '7890', '2027-03-31', '654 Maple St', 'Miami', 'FL', '33101'),
(6, 1, 'John Doe', '1111222233334444', '1111', '2023-08-31', '123 Main St', 'New York', 'NY', '10001'),
(7, 2, 'Jane Smith', '4444555566667777', '2222', '2024-07-30', '456 Oak St', 'Los Angeles', 'CA', '90001'),
(8, 3, 'Mike Johnson', '7777888899990000', '3333', '2022-06-30', '789 Elm St', 'Chicago', 'IL', '60601');

INSERT INTO Updates (UpdateID, UpdateDescription, DateReleased, Plan) VALUES
(1, 'New feature added', '2023-01-15', 1),
(2, 'Bug fixes and performance improvements', '2023-03-20', 2),
(3, 'Security patch applied', '2023-05-10', 3),
(4, 'UI enhancements', '2023-07-25', 1),
(5, 'Database optimization', '2023-09-05', 2);