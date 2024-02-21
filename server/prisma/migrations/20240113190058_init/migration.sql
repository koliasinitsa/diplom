-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'blocked', 'deleted');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "user_status" NOT NULL DEFAULT 'active',
    "role" "user_role" NOT NULL DEFAULT 'user',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "custom_string1_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_string1_name" VARCHAR(255),
    "custom_string2_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_string2_name" VARCHAR(255),
    "custom_string3_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_string3_name" VARCHAR(255),
    "custom_int1_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_int1_name" VARCHAR(255),
    "custom_int2_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_int2_name" VARCHAR(255),
    "custom_int3_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_int3_name" VARCHAR(255),
    "custom_text1_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_text1_name" VARCHAR(255),
    "custom_text2_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_text2_name" VARCHAR(255),
    "custom_text3_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_text3_name" VARCHAR(255),
    "custom_boolean1_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_boolean1_name" VARCHAR(255),
    "custom_boolean2_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_boolean2_name" VARCHAR(255),
    "custom_boolean3_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_boolean3_name" VARCHAR(255),
    "custom_date1_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_date1_name" VARCHAR(255),
    "custom_date2_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_date2_name" VARCHAR(255),
    "custom_date3_state" BOOLEAN NOT NULL DEFAULT false,
    "custom_date3_name" VARCHAR(255),

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemTags" (
    "tag_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "ItemTags_pkey" PRIMARY KEY ("tag_id","item_id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "custom_string1_value" VARCHAR(255),
    "custom_string2_value" VARCHAR(255),
    "custom_string3_value" VARCHAR(255),
    "custom_int1_value" INTEGER,
    "custom_int2_value" INTEGER,
    "custom_int3_value" INTEGER,
    "custom_text1_value" TEXT,
    "custom_text2_value" TEXT,
    "custom_text3_value" TEXT,
    "custom_boolean1_value" BOOLEAN,
    "custom_boolean2_value" BOOLEAN,
    "custom_boolean3_value" BOOLEAN,
    "custom_date1_value" TIMESTAMP(3),
    "custom_date2_value" TIMESTAMP(3),
    "custom_date3_value" TIMESTAMP(3),

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_category_name_key" ON "Categories"("category_name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_tag_name_key" ON "Tags"("tag_name");

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemTags" ADD CONSTRAINT "ItemTags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemTags" ADD CONSTRAINT "ItemTags_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
