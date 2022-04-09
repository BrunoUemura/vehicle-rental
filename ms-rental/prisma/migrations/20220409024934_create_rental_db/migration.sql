-- CreateTable
CREATE TABLE "customer" (
    "customerId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "vehicle" (
    "vehicleId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "kilometers" INTEGER NOT NULL,
    "plate" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "rental_order" (
    "order_id" TEXT NOT NULL PRIMARY KEY,
    "customer_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "estimated_km" INTEGER NOT NULL,
    "estimated_amount" DECIMAL NOT NULL,
    "additional_amount" DECIMAL NOT NULL DEFAULT 0.00,
    "total_amount" DECIMAL NOT NULL,
    "driven_km" INTEGER,
    "returned_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "canceled_at" DATETIME,
    CONSTRAINT "rental_order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer" ("customerId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rental_order_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle" ("vehicleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_document_number_key" ON "customer"("document_number");
