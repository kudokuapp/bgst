
-- DROP TABLE IF EXISTS "Transaction";
-- DROP TABLE IF EXISTS "Account";
-- DROP TABLE IF EXISTS "User";

-- CREATE TABLE "GopayTransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "OVOTransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "DANATransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "ShopeePayTransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "BCATransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "BNITransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "MandiriTransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "BSITransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "BRITransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );


-- CREATE TABLE "Account" (
--   "id" SERIAL,
--   "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   "institutionId" INTEGER NOT NULL,
--   "accessToken" VARCHAR(255) NOT NULL UNIQUE,
--   "accountNumber" VARCHAR(255) NOT NULL UNIQUE,
--   "brick_account_id" VARCHAR(255) NOT NULL UNIQUE,
--   "kudosId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );

-- CREATE TABLE "User" (
--   "id" INTEGER,
--   "firstName" VARCHAR(255) NOT NULL,
--   "email" VARCHAR(255) UNIQUE NOT NULL,
--   "whatsapp" VARCHAR(255) UNIQUE NOT NULL,
--   "hasAccount" BOOLEAN DEFAULT false NOT NULL,
--   PRIMARY KEY ("id")
-- );


-- ALTER TABLE "GopayTransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "OVOTransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "DANATransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "ShopeePayTransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "BCATransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "BNITransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "MandiriTransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "BSITransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE "BRITransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- --
-- ALTER TABLE "Transaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- ALTER TABLE "Account" ADD FOREIGN KEY("kudosId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;





-- -- @block
-- DELETE FROM "Account" WHERE "kudosId"=1;
-- DELETE FROM "Account" WHERE "kudosId"=2;
-- DELETE FROM "Account" WHERE "kudosId"=3;
-- DELETE FROM "Account" WHERE "kudosId"=11;
-- DROP TABLE IF EXISTS "Transaction";
-- DROP TABLE IF EXISTS "BCATransaction";
-- CREATE TABLE "BCATransaction" (
--   "id" SERIAL,
--   "dateTimestamp" TIMESTAMP,
--   "brick_id" INTEGER,
--   "brick_account_id" TEXT,
--   "account_number" TEXT,
--   "account_currency" TEXT,
--   "institution_id" INTEGER,
--   "merchant_id" INTEGER,
--   "outlet_outlet_id" INTEGER,
--   "location_city_id" INTEGER,
--   "location_country_id" INTEGER,
--   "date" TIMESTAMP,
--   "amount" NUMERIC,
--   "description" TEXT,
--   "status" TEXT,
--   "direction" TEXT,
--   "reference_id" TEXT UNIQUE,
--   "transaction_type" TEXT,
--   "category_id" INTEGER,
--   "category_name" TEXT,
--   "classification_group_id" INTEGER,
--   "classification_group" TEXT,
--   "classification_subgroup_id" INTEGER,
--   "classification_subgroup" TEXT,
--   "accountId" INTEGER NOT NULL,
--   PRIMARY KEY ("id")
-- );
-- ALTER TABLE "BCATransaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- @block
DELETE FROM "GopayTransaction" 
WHERE "date" >= '2023-01-01'
AND "date" <= '2023-01-31'

-- @block
SELECT * FROM "GopayTransaction" WHERE "accountId"=4


-- -- @block
-- DELETE FROM "Account" WHERE "institutionId"=17;
-- UPDATE "User" SET "hasAccount"=false WHERE "id"=87;



-- @block
ALTER TABLE "Account" ADD expired BOOLEAN;

-- @block
UPDATE "Account" SET expired=true WHERE "id"=54


-- @block
SELECT * FROM "User" WHERE id=1


-- @block
SELECT * FROM "Account" WHERE expired=false ORDER BY id ASC;