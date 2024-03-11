      -- 2. super-admin     Level - Customer (for eg. HPCL, IOCL ...)                                   - Customer related Sites
      -- 3. dealer          Level - Group Of sites / Single Site (for eg. company, indivisual dealer )  - access to owned sites
      -- 4. site-admin      Level - single site                                                         - site level access + Basic opertaions + configuration
--------------------------------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------

-- TABLES

-- 1 USER DETAILS
CREATE SEQUENCE userdetails_autoid;
CREATE TABLE userdetails(
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('userdetails_autoid'),
	firstname VARCHAR(32) NOT NULL,
	lastname VARCHAR(32) NOT NULL,
	phone VARCHAR(12) NOT NULL,
	email VARCHAR(32),
	isenable INT NOT NULL DEFAULT 1,
	updateflag INT NOT NULL DEFAULT 1,
    updateby VARCHAR(32) NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

-- USER DETAILS INSERTION
INSERT INTO userdetails (firstname, lastname, phone, email, updateby)
VALUES ('INDIAN OIL', 'CORPORATION LTD.', '9865327410', 'iocl_admin@gmail.com', 'RFBYTES'); -- for super-admin IOCL

INSERT INTO  userdetails (firstname, lastname, phone, email, updateby)
VALUES ('HINDUSTAN PETROLIUM', 'CORPORATIN LTD.', '9865327410', 'hpcl_admin@gmail.com', 'RFBYTES'); -- for super-admin HPCL

INSERT INTO  userdetails (firstname, lastname, phone, email, updateby)
VALUES ('Ajit', 'Athave', '9865327410', 'ajitA123@gmail.com', 'RFBYTES'); -- for dealer

INSERT INTO  userdetails (firstname, lastname, phone, email, updateby)
VALUES ('BHAVAN', 'CYBERTEK', '9865327410', 'bct@gmail.com', 'RFBYTES'); -- for vendor

INSERT INTO  userdetails (firstname, lastname, phone, email, updateby)
VALUES ('Kaustubh', 'Houde', '9865327410', 'kaustbhH@gmail.com', 'RFBYTES'); -- for vendor-Engineer

-- 2 USER CREDENTIALS
CREATE SEQUENCE usercredentials_autoid;
CREATE TABLE usercredentials(
    id INT PRIMARY KEY NOT NULL DEFAULT nextval('usercredentials_autoid'),
    userautoid INT,
    username VARCHAR(48) NOT NULL,
    password VARCHAR(200) NOT NULL,
    role VARCHAR(12) NOT NULL,
    isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1,
    updateby VARCHAR(32),
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (userautoid) REFERENCES userdetails(id)
);

-- USER CREDENTIALS INSERTION
INSERT INTO usercredentials (userautoid, username, password, role, updateby)
VALUES (1, 'iocl@superadmin.com', '$2a$10$3A3LoHWqCfWql8RIfgElc.ghfAKEoNsu5TcRynGkUDW2GrWHYaHge', 'super-admin', 'RFBYTES'); -- Password iocl@superadmin.com

INSERT INTO usercredentials (userautoid, username, password, role, updateby)
VALUES (5, 'bct5@engineer.com', '$2a$10$XD42GQ2svWp3SDKl7b5Rh.rjnYswob6Z7RaiJLLrybOU/YGFQXjYa', 'engineer', 'RFBYTES'); -- Password bct5@engineer.com

-- 3 MASTER PRODUCT
CREATE SEQUENCE masterproduct_autoid;
CREATE TABLE masterproduct (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('masterproduct_autoid'),
    code VARCHAR(32) NOT NULL,
    color VARCHAR(8) NOT NULL,
   	updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- PRODUCT DATA INSERTION
INSERT INTO masterproduct(code,color,updateby)
VALUES('MS', '#FC6A03', 1); 

INSERT INTO masterproduct(code,color,updateby)
VALUES ('HSD', '#03174F', 1);

INSERT INTO masterproduct(code,color,updateby)
VALUES ('XP95', '#DB3B94', 1);

INSERT INTO masterproduct(code,color,updateby)
VALUES ('XTRA GREEN', '#55bf52', 1);

-- 4 MASTER ATG CONSOLE
CREATE SEQUENCE masterconsole_autoid;
CREATE TABLE masterconsole (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('masterconsole_autoid'),
    make VARCHAR(32) NOT NULL,
    model VARCHAR(32) NOT NULL,
	version VARCHAR(32) NOT NULL,
    isenable INT NOT NULL DEFAULT 1,
	updateflag INT NOT NULL DEFAULT 1,
    updateby INT NOT NULL,
	updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- MASTER ATG CONSOLE DATA INSERTION
INSERT INTO masterconsole(make,model,version,updateby)
VALUES ('START ITALIANA', 'MODEL01', 'V1.0', 1);

INSERT INTO masterconsole(make,model,version, updateby)
VALUES ('VEEDER ROOT', 'MODEL01', 'V1.0', 1);

INSERT INTO masterconsole(make, model, version, updateby)
VALUES ('RFBYTES', 'MODEL01', 'V1.0', 1);

-- 5 MASTER ATG PROBE
CREATE SEQUENCE masterprobe_autoid;
CREATE TABLE masterprobe (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('masterprobe_autoid'),
    make VARCHAR(32) NOT NULL,
    model VARCHAR(32) NOT NULL,
    version VARCHAR(32) NOT NULL,
   	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1,
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- MASTER ATG PROBE DATA INSERTION
INSERT INTO masterprobe(make,model,version,updateby)
VALUES ('START ITALIANA', 'MODEL01', 'V1.0', 1);

INSERT INTO masterprobe(make,model,version,updateby)
VALUES ('VEEDER ROOT', 'MODEL01', 'V1.0', 1);

INSERT INTO masterprobe(make,model,version,updateby)
VALUES ('SBEM', 'MODEL01', 'V1.0', 1);

INSERT INTO masterprobe(make,model,version,updateby)
VALUES ('RFBYTES', 'MODEL01', 'V1.0', 1);

-- 6 MASTER DISPESNER MAKE
CREATE SEQUENCE masterdispensermake_autoid;
CREATE TABLE masterdispensermake(
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('masterdispensermake_autoid'),
    make VARCHAR(32) NOT NULL,
    model VARCHAR(32) NOT NULL,
    version VARCHAR(32) NOT NULL,
  	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1,
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- MASTER DISPENSER MAKE INSERTION
INSERT INTO masterdispensermake(make,model,version,updateby)
VALUES ('GILBARCO', 'MODEL01', 'V1.0', 1);

INSERT INTO masterdispensermake(make,model,version,updateby)
VALUES ('TOKHEIM', 'MODEL01', 'V1.0', 1);

INSERT INTO masterdispensermake(make,model,version,updateby)
VALUES ('MIDCO', 'MODEL01', 'V1.0', 1);

INSERT INTO masterdispensermake(make,model,version,updateby)
VALUES ('TATSUNO', 'MODEL01', 'V1.0', 1);

INSERT INTO masterdispensermake(make,model,version,updateby)
VALUES ('PROWALCO', 'MODEL01', 'V1.0', 1);

INSERT INTO masterdispensermake(make,model,version,updateby)
VALUES ('WAYEN', 'MODEL01', 'V1.0', 1);

-- 7 RODETAILS 
CREATE SEQUENCE rodetails_autoid;
CREATE TABLE rodetails(
    id INT PRIMARY KEY NOT NULL DEFAULT nextval('rodetails_autoid'),
    rocode VARCHAR(16) UNIQUE NOT NULL,
    roname VARCHAR(64),
    rotype VARCHAR(32),
	address VARCHAR(128),
    pincode VARCHAR(8),
	city VARCHAR(32),
	state VARCHAR(32),
	country VARCHAR(32),
	region VARCHAR(32),
    dealername VARCHAR(32),
    email VARCHAR(52),
    phonenumber VARCHAR(16),
    mobilenumber VARCHAR(16),
    commissioningdate TIMESTAMP WITHOUT TIME ZONE,
	initializedate TIMESTAMP WITHOUT TIME ZONE,
	resitementdate TIMESTAMP WITHOUT TIME ZONE,
	sivendor VARCHAR(32),
	atgvendor VARCHAR(32),
	csid INT,
    isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 8 DEVICES
CREATE SEQUENCE devices_autoid;
CREATE TABLE devices(
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('devices_autoid'),
	roautoid INT NOT NULL,
	deviceid INT NOT NULL,
	device VARCHAR(16),
	devicetype VARCHAR(16) NOT NULL, 
	isenable INT NOT NULL DEFAULT 1,
	updateflag INT NOT NULL DEFAULT 1,
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 9 TAGS
CREATE SEQUENCE tags_autoid;
CREATE TABLE tags(
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('tags_autoid'),
    roautoid INT NOT NULL,
	tagtype VARCHAR(16) NOT NULL,
	tagnumber INT NOT NULL,
	isenable INT NOT NULL DEFAULT 1,
	updateflag INT NOT NULL DEFAULT 1,
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 10 PRODUCT DETAILS
CREATE SEQUENCE productdetails_autoid;
CREATE TABLE productdetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('productdetails_autoid'),
	roautoid INT NOT NULL,
    masterproductid INT NOT NULL,
	price float NOT NULL,
	csid integer NOT NULL,
	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (masterproductid) REFERENCES masterproduct(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 11 ATG CONSOLE DETAILS
CREATE SEQUENCE consoledetails_autoid;
CREATE TABLE consoledetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('consoledetails_autoid'),
    roautoid INT NOT NULL,
	masterconsoleid INT NOT NULL,
	serialno INT,
	comport INT,
    type INT NOT NULL, -- 0 SOFTWARE 1 HARDWARE
   	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (masterconsoleid) REFERENCES masterconsole(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)	
);

-- 12 ATG PROBE DATAILS
CREATE SEQUENCE probedetails_autoid;
CREATE TABLE probedetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('probedetails_autoid'),
    roautoid INT NOT NULL,
	masterprobeid INT NOT NULL,
	type INT NOT NULL, -- 0 DENSITY 1 NON DENSITY
	serialno INT,
   	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (masterprobeid) REFERENCES masterprobe(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 13 RFSLAVE DETAILS
CREATE SEQUENCE rfslavedetails_autoid;
CREATE TABLE rfslavedetails (
    id INT PRIMARY KEY NOT NULL DEFAULT nextval('rfslavedetails_autoid'),
    roautoid INT NOT NULL,
	rfslaveid INT NOT NULL,
    type INT NOT NULL, -- 0 DISPENSER 1 TANK 2 MONOLITH
	trxnlimit INT NOT NULL,
	commaddress INT NOT NULL,
    firmwareversion INT NOT NULL,
	serialno INT,  
    isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id), 
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 14 TANK DETAILS
CREATE SEQUENCE tankdetails_autoid;
CREATE TABLE tankdetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('tankdetails_autoid'),
	roautoid INT NOT NULL,
    tankid INT NOT NULL,
	productautoid INT NOT NULL,
    probeautoid INT NOT NULL,
    height INT NOT NULL,
    capacity INT NOT NULL,
	productlowflag boolean,
	productlowvalue float,
	waterhighflag boolean,
	waterhighvalue float,
	ttreceiptflag boolean,
	ttreceiptvalue TIME,
	commfailflag boolean,
	commfailvalue INT,
	blockflag boolean,
	deliveryflag boolean,
	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (probeautoid) REFERENCES probedetails(id),
	FOREIGN KEY (productautoid) REFERENCES productdetails(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 15 DISPENSER DETAILS
CREATE SEQUENCE dispenserdetails_autoid;
CREATE TABLE dispenserdetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('dispenserdetails_autoid'),
	roautoid INT NOT NULL,
    dispenserid INT NOT NULL,
	makeautoid INT NOT NULL,
	rfslaveautoid INT NOT NULL,
    serialno INT NOT NULL,
  	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (rfslaveautoid) REFERENCES rfslavedetails(id),
	FOREIGN KEY (makeautoid) REFERENCES masterdispensermake(id)
);

-- 16 PUMP DETAILS 
CREATE SEQUENCE pumpdetails_autoid;
CREATE TABLE pumpdetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('pumpdetails_autoid'),
	roautoid INT NOT NULL,
    pumpid INT NOT NULL,
    dispenserautoid INT NOT NULL, 
	type INT NOT NULL, --  MONO 1 DUAL 2 QPD 3 MPD
	mode INT NOT NULL,	-- 0 PREAUTHORISED 1 SLAVE AUTHORISED 2 RFIDMODE-1 3 RFIDMODE-2 4 RFIDMODE-3
	commaddress INT NOT NULL,
	amountdecimalpoINT INT,
	volumedecimalpoINT INT,
	pricedecimalpoINT INT,
	meterdecimalpoINT INT,
	presetflag boolean, 
	presetvalue float,
	npndflag boolean,
	npndvalue float,
	blockflag boolean,
	isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1, 
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (dispenserautoid) REFERENCES dispenserdetails(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 17 NOZZLE DETAILS
CREATE SEQUENCE nozzledetails_autoid;
CREATE TABLE nozzledetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('nozzledetails_autoid'),
	roautoid INT NOT NULL,
    nozzleid INT NOT NULL,
    pumpautoid INT NOT NULL,  
	tankautoid INT NOT NULL,
    totalizer float NOT NULL,
	testingflag boolean,
	valueinltr float,
	testingtime TIME,
	blockflag boolean,
    isenable INT NOT NULL DEFAULT 1,
    updateflag INT NOT NULL DEFAULT 1,  
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id), 
	FOREIGN KEY (pumpautoid) REFERENCES pumpdetails(id),
    FOREIGN KEY (tankautoid) REFERENCES tankdetails(id), 
    FOREIGN KEY (updateby) REFERENCES usercredentials(id)
);

-- 18 MASTER ALARMS
CREATE SEQUENCE masteralarm_autoid;
CREATE TABLE masteralarm (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('masteralarm_autoid'),
    alarmid INT NOT NULL,
	deviceautoid INT NOT NULL,
	priority VARCHAR(16) NOT NULL,
	description  VARCHAR(250)  NOT NULL,
	referncevalue DOUBLE PRECISION NOT NULL,
	isenable INT NOT NULL DEFAULT 1,
	updateflag INT NOT NULL DEFAULT 1,
    updateby INT NOT NULL,
    updatetime TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	FOREIGN KEY (deviceautoid) REFERENCES devices(id),
    FOREIGN KEY (updateby) REFERENCES usercredentials(id) 
);

-- 19 ALARM DETAILS
CREATE SEQUENCE alarmdetails_autoid;
CREATE TABLE alarmdetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('alarmdetails_autoid'),
    roautoid INT NOT NULL,
    alarmautoid INT NOT NULL,
	deviceautoid INT NOT NULL,
	priority VARCHAR(16) NOT NULL,
    genarationtime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    normalization TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    param1 VARCHAR(60),
    param2 VARCHAR(60),
    param3 VARCHAR(60),
    param4 VARCHAR(60),
    param5 VARCHAR(60),
    param6 VARCHAR(60),
    param7 VARCHAR(60),
    param8 VARCHAR(60),
    param9 VARCHAR(60),
    param10 VARCHAR(60),
    acktime TIMESTAMP WITHOUT TIME ZONE,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (deviceautoid) REFERENCES devices(id),
    FOREIGN KEY (alarmautoid) REFERENCES alarmdetails(id) 
);

-- 20 PUMP TRANSACTIONS 
CREATE SEQUENCE pumptransactions_autoid;
CREATE TABLE pumptransactions (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('pumptransactions_autoid'),
    roautoid INT NOT NULL,
    nozzleautoid INT NOT NULL,
    starttime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    endtime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    volume DOUBLE PRECISION NOT NULL,
    starttotalizer DOUBLE PRECISION NOT NULL,
    endtotalizer DOUBLE PRECISION NOT NULL,
	mop INT NOT NULL,   -- 0 CASH 1 CREDIT 2 ROYALTI 3 TESTING 
    presettype INT NOT NULL, -- 0 NULL 1 AMOUNT 2 VOLUME  
    presetmode INT NOT NULL, -- 0 NULL 1 LOCAL 3 BOS
    presetvalue DOUBLE PRECISION,
    vehicalno VARCHAR(16),
    mobileno VARCHAR(16),
    attandanttag INT,
    customertag INT,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (nozzleautoid) REFERENCES nozzledetails(id) 
);

-- 27 TANK DELIVERY 
CREATE SEQUENCE delivery_autoid;
CREATE TABLE delivery (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('delivery_autoid'),
    roautoid INT NOT NULL,
   	tankautoid INT NOT NULL,
	starttime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    endtime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
   	productlevel DOUBLE PRECISION NOT NULL,
	endproductlevel DOUBLE PRECISION NOT NULL,
    startvolume DOUBLE PRECISION NOT NULL,
    endvolume DOUBLE PRECISION NOT NULL,
	startwater DOUBLE PRECISION NOT NULL,
	endwater DOUBLE PRECISION NOT NULL,
    starttemperature DOUBLE PRECISION NOT NULL,
    endtemperature DOUBLE PRECISION NOT NULL,
	startdensity DOUBLE PRECISION NOT NULL,
    enddensity DOUBLE PRECISION NOT NULL,
	starttcdensity DOUBLE PRECISION NOT NULL,
    endtcdensity DOUBLE PRECISION NOT NULL,
    netvolume DOUBLE PRECISION NOT NULL,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id), 
	FOREIGN KEY (tankautoid) REFERENCES tankdetails(id) 
);

-- 28 DAY END DETAILS
CREATE SEQUENCE dayenddetails_autoid;
CREATE TABLE dayenddetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('dayenddetails_autoid'),
    roautoid INT NOT NULL,
    opentime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    closetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    status VARCHAR(1),
	FOREIGN KEY (roautoid) REFERENCES rodetails(id) 
);

-- 29 DAY END TOTALIZER
CREATE SEQUENCE dayendtotalizer_autoid;
CREATE TABLE dayendtotalizer (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('dayendtotalizer_autoid'),
    roautoid INT NOT NULL,
    dayautoid INT NOT NULL,
    nozzleautoid INT NOT NULL,
    starttotalizer DOUBLE PRECISION NOT NULL,
    endtotalizer DOUBLE PRECISION,
    totalsale DOUBLE PRECISION,
    totalvolume DOUBLE PRECISION,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (dayautoid) REFERENCES dayenddetails(id),
	FOREIGN KEY (nozzleautoid) REFERENCES nozzledetails(id)
);

-- 30 DAY END INVENTORY
CREATE SEQUENCE dayendinventory_autoid;
CREATE TABLE dayendinventory (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('dayendinventory_autoid'),
    roautoid INT NOT NULL,
    dayautoid INT NOT NULL,
    tankautoid INT NOT NULL,
    starttime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    endtime TIMESTAMP WITHOUT TIME ZONE,
    startproductlevel DOUBLE PRECISION NOT NULL,
    endproductlevel DOUBLE PRECISION,
	startproductvolume DOUBLE PRECISION NOT NULL,
	endproductvolume DOUBLE PRECISION,
	startwaterlevel DOUBLE PRECISION NOT NULL,
    endwaterlevel DOUBLE PRECISION,
	starttemperature DOUBLE PRECISION NOT NULL,
    endtemperature DOUBLE PRECISION,
	startdensity DOUBLE PRECISION NOT NULL,
    enddensity DOUBLE PRECISION,
	starttcdensity DOUBLE PRECISION NOT NULL,
    endtcdensity DOUBLE PRECISION,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id),
	FOREIGN KEY (dayautoid) REFERENCES dayenddetails(id),
	FOREIGN KEY (tankautoid) REFERENCES tankdetails(id) 
);

-- 31 SHIFT END DETAILS
CREATE SEQUENCE shiftenddetails_autoid;
CREATE TABLE shiftenddetails (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('shiftenddetails_autoid'),
    roautoid INT NOT NULL,
    shiftid INT NOT NULL,
    dayautoid INT NOT NULL,
    opentime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    closetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id), 
	FOREIGN KEY (dayautoid) REFERENCES dayenddetails(id) 
);

-- 32 SHIFT END TOTALIZER
CREATE SEQUENCE shiftendtotalizer_autoid;
CREATE TABLE shiftendtotalizer (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('shiftendtotalizer_autoid'),
	roautoid INT NOT NULL,
    shiftautoid INT NOT NULL,
    nozzleautoid INT NOT NULL, 
    starttotalizer DOUBLE PRECISION NOT NULL,
    endtotalizer DOUBLE PRECISION,
	totalsale DOUBLE PRECISION,
    totalvolume DOUBLE PRECISION,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id), 
	FOREIGN KEY (shiftautoid) REFERENCES shiftenddetails(id) ,
	FOREIGN KEY (nozzleautoid) REFERENCES nozzledetails(id) 
);

-- 33 SHIFT END INVENTORY 
CREATE SEQUENCE shiftendinventory_autoid;
CREATE TABLE shiftendinventory (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('shiftendinventory_autoid'),
    roautoid INT NOT NULL,
    shiftautoid INT NOT NULL,
	tankautoid INT NOT NULL,
    starttime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    endtime TIMESTAMP WITHOUT TIME ZONE,
    startproductlevel DOUBLE PRECISION NOT NULL,
	endproductlevel DOUBLE PRECISION,
    startproductvolume DOUBLE PRECISION NOT NULL,
    endproductvolume DOUBLE PRECISION,
	startwaterlevel DOUBLE PRECISION NOT NULL,
    endwaterlevel DOUBLE PRECISION,
	starttemperature DOUBLE PRECISION NOT NULL,
	endtemperature DOUBLE PRECISION,
    startdensity DOUBLE PRECISION NOT NULL,
    enddensity DOUBLE PRECISION,
	starttcdensity DOUBLE PRECISION NOT NULL,
    endtcdensity DOUBLE PRECISION,
    netsale DOUBLE PRECISION,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id), 
	FOREIGN KEY (shiftautoid) REFERENCES shiftenddetails(id),
	FOREIGN KEY (tankautoid) REFERENCES tankdetails(id)
);

-- 34 PRICE CHANGE 
CREATE SEQUENCE pricechange_auto_id;
CREATE TABLE pricechange (
    id INT PRIMARY KEY NOT NULL DEFAULT nextval('pricechange_auto_id'),
    roautoid INT NOT NULL,
    changetype VARCHAR(16)  NOT NULL, -- BY CUSTOMER SERVER --BY RFBYTES SERVER -- BY LOCAL 
    productautoid INT NOT NULL,
    price FLOAT NOT NULL, 
    effectivefrom TIMESTAMP WITHOUT TIME ZONE NOT NULL, 
    effectiveto TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updateflag INT NOT NULL DEFAULT 1,
    updateby INT NOT NULL,
    status INT NOT NULL, -- 0 = Received  1 = Pending 2 = Applied
    FOREIGN KEY (roautoid) REFERENCES rodetails(id),
    FOREIGN KEY (productautoid) REFERENCES productdetails(id)
);

-- 35 PRODUCT SALE 
CREATE SEQUENCE productsale_auto_id;
CREATE TABLE productsale(
    id INT PRIMARY KEY NOT NULL DEFAULT nextval('productsale_auto_id'),
    roautoid INT NOT NULL,
    productautoid INT NOT NULL,
    date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    amount FLOAT NOT NULL,
    volume FLOAT NOT NULL,
    FOREIGN KEY (roautoid) REFERENCES rodetails(id),
    FOREIGN KEY (productautoid) REFERENCES productdetails(id)
);

-- 36 NOZZLE SALE
CREATE SEQUENCE nozzlesale_auto_id;
CREATE TABLE nozzlesale(
    id INT PRIMARY KEY NOT NULL DEFAULT nextval('nozzlesale_auto_id'),
    roautoid INT NOT NULL,
    nozzleautoid INT NOT NULL,
    amount FLOAT NOT NULL,
    volume FLOAT NOT NULL,
    FOREIGN KEY (roautoid) REFERENCES rodetails(id),
    FOREIGN KEY (nozzleautoid) REFERENCES nozzledetails(id)
);

-- 37 DAY CONFIGURATION
CREATE SEQUENCE dayconfiguration_auto_id;
CREATE TABLE dayconfiguration(
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('dayconfiguration_auto_id'),
	roautoid INT NOT NULL,
	mode INT NOT NULL, -- 0 AUTO 1 MANUAL
	endtime TIME,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id)
);

-- 38 SHIFT CONFIGURATION
CREATE SEQUENCE shiftconfiguration_auto_id;
CREATE TABLE shiftconfiguration(
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('shiftconfiguration_auto_id'),
	roautoid INT NOT NULL,
	shiftid INT NOT NULL, -- 0 TO 4
	starttime TIME,
	endtime TIME,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id)
);

-- 26 TANK INVENTORY
CREATE SEQUENCE tankinventory_autoid;
CREATE TABLE tankinventory (
	id INT PRIMARY KEY NOT NULL DEFAULT nextval('tankinventory_autoid'),
    roautoid INT NOT NULL,
    tankautoid INT NOT NULL,
    inventorytime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    inventorytype INT NOT NULL, --  0 = STATUS 1 = PRICE CHANGE 2 = DAY OPEN 3 = DAY CLOSE 4 = SHIFT START 5 = SHIFT CLOSE  
    shiftautoid INT NOT NULL,
    productlevel DOUBLE PRECISION NOT NULL,
    productvolume DOUBLE PRECISION NOT NULL,
    waterlevel DOUBLE PRECISION NOT NULL,
    watervolume DOUBLE PRECISION NOT NULL,
    temperature DOUBLE PRECISION NOT NULL,
    ullage DOUBLE PRECISION NOT NULL,
    density DOUBLE PRECISION NOT NULL,
    tcdensity DOUBLE PRECISION NOT NULL,
	state VARCHAR(22) NOT NULL,
	FOREIGN KEY (roautoid) REFERENCES rodetails(id), 
	FOREIGN KEY (tankautoid) REFERENCES tankdetails(id),
    FOREIGN KEY (shiftautoid) REFERENCES shiftenddetails(id)
);