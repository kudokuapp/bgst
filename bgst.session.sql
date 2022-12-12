CREATE TABLE "Transaction" (
  "id" SERIAL,
  "dateTimestamp" TIMESTAMP,
  "brick_id" INTEGER,
  "brick_account_id" TEXT,
  "account_number" TEXT,
  "account_currency" TEXT,
  "institution_id" INTEGER,
  "merchant_id" INTEGER,
  "outlet_outlet_id" INTEGER,
  "location_city_id" INTEGER,
  "location_country_id" INTEGER,
  "date" TIMESTAMP,
  "amount" INTEGER,
  "description" TEXT,
  "status" TEXT,
  "direction" TEXT,
  "reference_id" TEXT UNIQUE,
  "transaction_type" TEXT,
  "category_id" INTEGER,
  "category_name" TEXT,
  "classification_group_id" INTEGER,
  "classification_group" TEXT,
  "classification_subgroup_id" INTEGER,
  "classification_subgroup" TEXT,
  "accountId" INTEGER NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "Account" (
  "id" SERIAL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "institutionId" INTEGER NOT NULL,
  "accessToken" VARCHAR(255) NOT NULL UNIQUE,
  "kudosId" INTEGER NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "User" (
  "id" INTEGER,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "whatsapp" VARCHAR(255) UNIQUE NOT NULL,
  "hasAccount" BOOLEAN DEFAULT false NOT NULL,
  PRIMARY KEY ("id")
);

ALTER TABLE "Transaction" ADD FOREIGN KEY("accountId")REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Account" ADD FOREIGN KEY("kudosId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;