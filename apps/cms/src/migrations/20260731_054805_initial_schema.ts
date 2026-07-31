import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
    CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom');
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_segment" AS ENUM('residential', 'commercial', 'utility', 'storage');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_version_segment" AS ENUM('residential', 'commercial', 'utility', 'storage');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_downloads_document_type" AS ENUM('datasheet', 'manual', 'certificate', 'warranty', 'brochure', 'software');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_media_media_type" AS ENUM('image', 'video', 'document');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_media_video_resolution" AS ENUM('1080p', '4k');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_distributors_type" AS ENUM('Distributor', 'Certified Installer', 'Service Center');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_partners_category" AS ENUM('Distribution Partners', 'Technology Alliances', 'EPC & Developer Partners');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_certifications_kind" AS ENUM('certification', 'award');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_solutions_slug" AS ENUM('residential', 'commercial', 'utility', 'storage');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  CREATE TABLE IF NOT EXISTS "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact',
  	"hero_rich_text" jsonb,
  	"hero_media_id" integer,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact',
  	"version_hero_rich_text" jsonb,
  	"version_hero_media_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "products_key_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"unit" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"category_id" integer,
  	"segment" "enum_products_segment",
  	"short_description" varchar,
  	"full_description" jsonb,
  	"power_range" varchar,
  	"efficiency" varchar,
  	"phases" varchar,
  	"warranty" varchar,
  	"hero_image_id" integer,
  	"datasheet_pdf_id" integer,
  	"manual_pdf_id" integer,
  	"featured" boolean DEFAULT false,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_key_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"unit" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_segment" "enum__products_v_version_segment",
  	"version_short_description" varchar,
  	"version_full_description" jsonb,
  	"version_power_range" varchar,
  	"version_efficiency" varchar,
  	"version_phases" varchar,
  	"version_warranty" varchar,
  	"version_hero_image_id" integer,
  	"version_datasheet_pdf_id" integer,
  	"version_manual_pdf_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_og_image_id" integer,
  	"version_seo_canonical_url" varchar,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "downloads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"file_id" integer NOT NULL,
  	"document_type" "enum_downloads_document_type" NOT NULL,
  	"related_product_id" integer,
  	"locale" varchar DEFAULT 'en',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"media_type" "enum_media_media_type" DEFAULT 'image',
  	"video_resolution" "enum_media_video_resolution",
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar,
  	"sizes_4k_url" varchar,
  	"sizes_4k_width" numeric,
  	"sizes_4k_height" numeric,
  	"sizes_4k_mime_type" varchar,
  	"sizes_4k_filesize" numeric,
  	"sizes_4k_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"category_intro_body" jsonb,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_product_slugs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"segment" varchar NOT NULL,
  	"capacity" varchar,
  	"products" varchar,
  	"location" varchar,
  	"year" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"summary" varchar NOT NULL,
  	"challenge" varchar,
  	"solution" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "faqs_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"duration" varchar,
  	"video_url" varchar,
  	"thumbnail_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "distributors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"external_id" varchar,
  	"name" varchar NOT NULL,
  	"type" "enum_distributors_type" NOT NULL,
  	"city" varchar NOT NULL,
  	"state" varchar,
  	"country" varchar NOT NULL,
  	"region" varchar NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"department" varchar NOT NULL,
  	"type" varchar DEFAULT 'Full-time' NOT NULL,
  	"apply_url" varchar DEFAULT '/contact',
  	"sort_order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"category" "enum_partners_category" NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_certifications_kind" NOT NULL,
  	"name" varchar NOT NULL,
  	"scope" varchar,
  	"region" varchar,
  	"year" varchar,
  	"organization" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "solutions_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "solutions_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "solutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" "enum_solutions_slug" NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "content_pages_breadcrumb" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "content_pages_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "content_pages_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "content_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"eyebrow" varchar,
  	"description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"seo_canonical_url" varchar,
  	"seo_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"products_id" integer,
  	"downloads_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"case_studies_id" integer,
  	"faqs_id" integer,
  	"videos_id" integer,
  	"distributors_id" integer,
  	"jobs_id" integer,
  	"partners_id" integer,
  	"certifications_id" integer,
  	"solutions_id" integer,
  	"content_pages_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_menus_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_menus_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_nav_menus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hotline_label" varchar DEFAULT 'Customer Hotline:',
  	"hotline" varchar DEFAULT '+1 (800) ORIANA-1',
  	"language_label" varchar DEFAULT 'USA · English',
  	"search_placeholder" varchar DEFAULT 'Search',
  	"login_label" varchar DEFAULT 'Login',
  	"login_href" varchar DEFAULT '/admin',
  	"where_to_buy_label" varchar DEFAULT 'Where to Buy',
  	"where_to_buy_href" varchar DEFAULT '/where-to-buy',
  	"quote_label" varchar DEFAULT 'Request Quote',
  	"quote_href" varchar DEFAULT '/contact',
  	"logo_id" integer,
  	"logo_alt" varchar DEFAULT 'Oriana Inverters',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"copyright" varchar DEFAULT '© {year} Oriana Inverters. All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar DEFAULT 'Oriana Inverters',
  	"support_email" varchar DEFAULT 'support@orianainverters.com',
  	"info_email" varchar DEFAULT 'info@orianainverters.com',
  	"security_email" varchar DEFAULT 'security@orianainverters.com',
  	"privacy_email" varchar DEFAULT 'privacy@orianainverters.com',
  	"hotline" varchar DEFAULT '+1 (800) ORIANA-1',
  	"default_meta_title" varchar,
  	"default_meta_description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "home_strategies_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_impact_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_why_oriana_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"copy" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_global_reach_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"focus" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_news_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" varchar,
  	"href" varchar NOT NULL,
  	"type" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_support_strip_downloads_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"hero_primary_cta_label" varchar NOT NULL,
  	"hero_primary_cta_href" varchar NOT NULL,
  	"hero_secondary_cta_label" varchar NOT NULL,
  	"hero_secondary_cta_href" varchar NOT NULL,
  	"strategies_eyebrow" varchar,
  	"strategies_title" varchar,
  	"strategies_description" varchar,
  	"impact_eyebrow" varchar,
  	"impact_title" varchar,
  	"impact_cta_label" varchar,
  	"impact_cta_href" varchar,
  	"why_oriana_eyebrow" varchar,
  	"why_oriana_title" varchar,
  	"why_oriana_description" varchar,
  	"global_reach_eyebrow" varchar,
  	"global_reach_title" varchar,
  	"global_reach_description" varchar,
  	"global_reach_cta_label" varchar,
  	"global_reach_cta_href" varchar,
  	"news_eyebrow" varchar,
  	"news_title" varchar,
  	"news_view_all_label" varchar,
  	"news_view_all_href" varchar,
  	"case_studies_intro_eyebrow" varchar,
  	"case_studies_intro_title" varchar,
  	"case_studies_intro_view_all_label" varchar,
  	"case_studies_intro_view_all_href" varchar,
  	"support_strip_service_eyebrow" varchar,
  	"support_strip_service_title" varchar,
  	"support_strip_service_hotline" varchar,
  	"support_strip_service_link_label" varchar,
  	"support_strip_service_link_href" varchar,
  	"support_strip_downloads_eyebrow" varchar,
  	"support_strip_partner_eyebrow" varchar,
  	"support_strip_partner_description" varchar,
  	"support_strip_partner_cta_label" varchar,
  	"support_strip_partner_cta_href" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "about_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"story_title" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "contact_contact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"sidebar_title" varchar,
  	"form_name_label" varchar,
  	"form_email_label" varchar,
  	"form_company_label" varchar,
  	"form_message_label" varchar,
  	"form_submit_label" varchar,
  	"form_success_title" varchar,
  	"form_success_message" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"why_title" varchar,
  	"why_description" varchar,
  	"why_image_id" integer,
  	"why_image_url" varchar,
  	"openings_title" varchar,
  	"fallback_cta_label" varchar,
  	"fallback_cta_href" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "support_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"detail" varchar NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "support_resource_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "support" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"resources_title" varchar,
  	"ticket_cta_title" varchar,
  	"ticket_cta_description" varchar,
  	"ticket_cta_cta_label" varchar NOT NULL,
  	"ticket_cta_cta_href" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "warranty_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product" varchar NOT NULL,
  	"standard" varchar NOT NULL,
  	"extended" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "warranty" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"tiers_title" varchar,
  	"register_title" varchar,
  	"register_description" varchar,
  	"claim_title" varchar,
  	"claim_description" varchar,
  	"primary_cta_label" varchar NOT NULL,
  	"primary_cta_href" varchar NOT NULL,
  	"secondary_cta_label" varchar NOT NULL,
  	"secondary_cta_href" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "sustainability_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "sustainability" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"approach_title" varchar,
  	"approach_description" varchar,
  	"approach_image_id" integer,
  	"approach_image_url" varchar,
  	"approach_primary_cta_label" varchar NOT NULL,
  	"approach_primary_cta_href" varchar NOT NULL,
  	"approach_secondary_cta_label" varchar NOT NULL,
  	"approach_secondary_cta_href" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "sustainability_reports_reports" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"year" varchar,
  	"size" varchar,
  	"href" varchar DEFAULT '/resources/downloads',
  	"file_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "sustainability_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "where_to_buy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar,
  	"become_distributor_title" varchar,
  	"become_distributor_description" varchar,
  	"become_distributor_cta_label" varchar NOT NULL,
  	"become_distributor_cta_href" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "page_intros" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"faqs_eyebrow" varchar,
  	"faqs_title" varchar NOT NULL,
  	"faqs_description" varchar,
  	"faqs_cta_prompt" varchar,
  	"faqs_cta_label" varchar,
  	"faqs_cta_href" varchar,
  	"videos_eyebrow" varchar,
  	"videos_title" varchar NOT NULL,
  	"videos_description" varchar,
  	"videos_footer_note" varchar,
  	"certifications_eyebrow" varchar,
  	"certifications_title" varchar NOT NULL,
  	"certifications_description" varchar,
  	"certifications_certs_heading" varchar,
  	"certifications_awards_heading" varchar,
  	"partners_eyebrow" varchar,
  	"partners_title" varchar NOT NULL,
  	"partners_description" varchar,
  	"partners_cta_title" varchar,
  	"partners_cta_description" varchar,
  	"partners_cta_primary_cta_label" varchar NOT NULL,
  	"partners_cta_primary_cta_href" varchar NOT NULL,
  	"partners_cta_secondary_cta_label" varchar NOT NULL,
  	"partners_cta_secondary_cta_href" varchar NOT NULL,
  	"case_studies_eyebrow" varchar,
  	"case_studies_title" varchar NOT NULL,
  	"case_studies_description" varchar,
  	"products_eyebrow" varchar,
  	"products_title" varchar NOT NULL,
  	"products_description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  -- ensure-columns-from-create-table (schema:push may have created tables without newer cols)
  ALTER TABLE "pages_hero_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_hero_links" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "pages_hero_links" ADD COLUMN IF NOT EXISTS "link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_hero_links" ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
  ALTER TABLE "pages_hero_links" ADD COLUMN IF NOT EXISTS "link_url" varchar;
  ALTER TABLE "pages_hero_links" ADD COLUMN IF NOT EXISTS "link_label" varchar;
  ALTER TABLE "pages_hero_links" ADD COLUMN IF NOT EXISTS "link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN IF NOT EXISTS "_parent_id" varchar NOT NULL;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_url" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_label" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN IF NOT EXISTS "rich_text" jsonb;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "_parent_id" varchar NOT NULL;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "enable_link" boolean;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_url" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_label" varchar;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_appearance" "enum_pages_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_content" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_blocks_content" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "pages_blocks_content" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "pages_blocks_content" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "intro_content" jsonb;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts';
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 10;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "form_id" integer;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "enable_intro" boolean;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "intro_content" jsonb;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "hero_media_id" integer;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "published_at" timestamp(3) with time zone;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "generate_slug" boolean DEFAULT true;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "slug" varchar;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "link_url" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "link_label" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "enable_link" boolean;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "link_appearance" "enum__pages_v_blocks_content_columns_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "intro_content" jsonb;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts';
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "limit" numeric DEFAULT 10;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "form_id" integer;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "enable_intro" boolean;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "intro_content" jsonb;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "parent_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_hero_media_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_published_at" timestamp(3) with time zone;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_slug" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_updated_at" timestamp(3) with time zone;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_created_at" timestamp(3) with time zone;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version__status" "enum__pages_v_version_status" DEFAULT 'draft';
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "latest" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
  ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
  ALTER TABLE "posts_populated_authors" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "posts_populated_authors" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "posts_populated_authors" ADD COLUMN IF NOT EXISTS "name" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "content" jsonb;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "published_at" timestamp(3) with time zone;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "generate_slug" boolean DEFAULT true;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "slug" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "_status" "enum_posts_status" DEFAULT 'draft';
  ALTER TABLE "posts_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "posts_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "posts_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "posts_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
  ALTER TABLE "posts_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_posts_v_version_populated_authors" ADD COLUMN IF NOT EXISTS "name" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "parent_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_hero_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_content" jsonb;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_meta_title" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_meta_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_meta_description" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_published_at" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_generate_slug" boolean DEFAULT true;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_slug" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_updated_at" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_created_at" timestamp(3) with time zone;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version__status" "enum__posts_v_version_status" DEFAULT 'draft';
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "latest" boolean;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "autosave" boolean;
  ALTER TABLE "_posts_v_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "_posts_v_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "_posts_v_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
  ALTER TABLE "_posts_v_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
  ALTER TABLE "products_gallery" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "products_gallery" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "products_gallery" ADD COLUMN IF NOT EXISTS "image_id" integer;
  ALTER TABLE "products_key_specs" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "products_key_specs" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "products_key_specs" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "products_key_specs" ADD COLUMN IF NOT EXISTS "value" varchar;
  ALTER TABLE "products_key_specs" ADD COLUMN IF NOT EXISTS "unit" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "name" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "slug" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "category_id" integer;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "segment" "enum_products_segment";
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "short_description" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "full_description" jsonb;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "power_range" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "efficiency" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "phases" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "warranty" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "datasheet_pdf_id" integer;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "manual_pdf_id" integer;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_og_image_id" integer;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_canonical_url" varchar;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "_status" "enum_products_status" DEFAULT 'draft';
  ALTER TABLE "_products_v_version_gallery" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_products_v_version_gallery" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_products_v_version_gallery" ADD COLUMN IF NOT EXISTS "image_id" integer;
  ALTER TABLE "_products_v_version_gallery" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_products_v_version_key_specs" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "_products_v_version_key_specs" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "_products_v_version_key_specs" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "_products_v_version_key_specs" ADD COLUMN IF NOT EXISTS "value" varchar;
  ALTER TABLE "_products_v_version_key_specs" ADD COLUMN IF NOT EXISTS "unit" varchar;
  ALTER TABLE "_products_v_version_key_specs" ADD COLUMN IF NOT EXISTS "_uuid" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "parent_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_name" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_slug" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_category_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_segment" "enum__products_v_version_segment";
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_short_description" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_full_description" jsonb;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_power_range" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_efficiency" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_phases" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_warranty" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_hero_image_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_datasheet_pdf_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_manual_pdf_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_featured" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_seo_meta_title" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_seo_meta_description" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_seo_og_image_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_seo_canonical_url" varchar;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_seo_no_index" boolean DEFAULT false;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_updated_at" timestamp(3) with time zone;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_created_at" timestamp(3) with time zone;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version__status" "enum__products_v_version_status" DEFAULT 'draft';
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "latest" boolean;
  ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "file_id" integer NOT NULL;
  ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "document_type" "enum_downloads_document_type" NOT NULL;
  ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "related_product_id" integer;
  ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "locale" varchar DEFAULT 'en';
  ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "alt" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "media_type" "enum_media_media_type" DEFAULT 'image';
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "video_resolution" "enum_media_video_resolution";
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "caption" jsonb;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "thumbnail_u_r_l" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "focal_x" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "focal_y" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_square_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_square_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_square_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_square_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_square_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_square_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_small_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_small_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_small_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_small_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_small_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_small_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_medium_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_medium_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_medium_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_medium_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_medium_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_medium_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_large_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_large_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_large_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_large_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_large_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_large_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_xlarge_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_xlarge_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_xlarge_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_xlarge_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_xlarge_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_xlarge_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_og_filename" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_4k_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_4k_width" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_4k_height" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_4k_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_4k_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_4k_filename" varchar;
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN IF NOT EXISTS "doc_id" integer;
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN IF NOT EXISTS "url" varchar;
  ALTER TABLE "categories_breadcrumbs" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "generate_slug" boolean DEFAULT true;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "slug" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "category_intro_body" jsonb;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "parent_id" integer;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "case_studies_product_slugs" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "case_studies_product_slugs" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "case_studies_product_slugs" ADD COLUMN IF NOT EXISTS "slug" varchar NOT NULL;
  ALTER TABLE "case_studies_results" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "case_studies_results" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "case_studies_results" ADD COLUMN IF NOT EXISTS "text" varchar NOT NULL;
  ALTER TABLE "case_studies_stats" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "case_studies_stats" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "case_studies_stats" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "case_studies_stats" ADD COLUMN IF NOT EXISTS "value" varchar NOT NULL;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "slug" varchar NOT NULL;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "segment" varchar NOT NULL;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "capacity" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "products" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "location" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "year" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "image_id" integer;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "image_url" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "summary" varchar NOT NULL;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "challenge" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "solution" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "seo_og_image_id" integer;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "seo_canonical_url" varchar;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "faqs_items" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "faqs_items" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "faqs_items" ADD COLUMN IF NOT EXISTS "question" varchar NOT NULL;
  ALTER TABLE "faqs_items" ADD COLUMN IF NOT EXISTS "answer" varchar NOT NULL;
  ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "sort_order" numeric DEFAULT 0;
  ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "category" varchar NOT NULL;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "duration" varchar;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "video_url" varchar;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "thumbnail_id" integer;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "sort_order" numeric DEFAULT 0;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "videos" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "external_id" varchar;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "type" "enum_distributors_type" NOT NULL;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "city" varchar NOT NULL;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "state" varchar;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "country" varchar NOT NULL;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "region" varchar NOT NULL;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "email" varchar;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "phone" varchar;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "distributors" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "location" varchar NOT NULL;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "department" varchar NOT NULL;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "type" varchar DEFAULT 'Full-time' NOT NULL;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "apply_url" varchar DEFAULT '/contact';
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "sort_order" numeric DEFAULT 0;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "active" boolean DEFAULT true;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "jobs" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "category" "enum_partners_category" NOT NULL;
  ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "logo_id" integer;
  ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "website" varchar;
  ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "sort_order" numeric DEFAULT 0;
  ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "kind" "enum_certifications_kind" NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "scope" varchar;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "region" varchar;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "year" varchar;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "organization" varchar;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "sort_order" numeric DEFAULT 0;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "certifications" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "solutions_benefits" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "solutions_benefits" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "solutions_benefits" ADD COLUMN IF NOT EXISTS "text" varchar NOT NULL;
  ALTER TABLE "solutions_products" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "solutions_products" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "solutions_products" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "slug" "enum_solutions_slug" NOT NULL;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "description" varchar NOT NULL;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "image_id" integer;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "image_url" varchar;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "seo_og_image_id" integer;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "seo_canonical_url" varchar;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "solutions" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "content_pages_breadcrumb" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "content_pages_breadcrumb" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "content_pages_breadcrumb" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "content_pages_breadcrumb" ADD COLUMN IF NOT EXISTS "href" varchar;
  ALTER TABLE "content_pages_sections_paragraphs" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "content_pages_sections_paragraphs" ADD COLUMN IF NOT EXISTS "_parent_id" varchar NOT NULL;
  ALTER TABLE "content_pages_sections_paragraphs" ADD COLUMN IF NOT EXISTS "text" varchar NOT NULL;
  ALTER TABLE "content_pages_sections" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "content_pages_sections" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "content_pages_sections" ADD COLUMN IF NOT EXISTS "heading" varchar;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "slug" varchar NOT NULL;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "eyebrow" varchar;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "description" varchar;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "seo_og_image_id" integer;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "seo_canonical_url" varchar;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "seo_no_index" boolean DEFAULT false;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "content_pages" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "users_sessions" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "users_sessions" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "users_sessions" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "users_sessions" ADD COLUMN IF NOT EXISTS "expires_at" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "name" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "email" varchar NOT NULL;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_token" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "reset_password_expiration" timestamp(3) with time zone;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "salt" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "hash" varchar;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "login_attempts" numeric DEFAULT 0;
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "lock_until" timestamp(3) with time zone;
  ALTER TABLE "redirects" ADD COLUMN IF NOT EXISTS "from" varchar NOT NULL;
  ALTER TABLE "redirects" ADD COLUMN IF NOT EXISTS "to_type" "enum_redirects_to_type" DEFAULT 'reference';
  ALTER TABLE "redirects" ADD COLUMN IF NOT EXISTS "to_url" varchar;
  ALTER TABLE "redirects" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "redirects" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "redirects_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "redirects_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "redirects_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "default_value" boolean;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_country" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_email" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_message" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_message" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_message" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_message" ADD COLUMN IF NOT EXISTS "message" jsonb;
  ALTER TABLE "forms_blocks_message" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "default_value" numeric;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_number" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN IF NOT EXISTS "_parent_id" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN IF NOT EXISTS "value" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "default_value" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "placeholder" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_select" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_state" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "default_value" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_text" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "_path" text NOT NULL;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "label" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "width" numeric;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "default_value" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "required" boolean;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN IF NOT EXISTS "block_name" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "email_to" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "cc" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "bcc" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "reply_to" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "email_from" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN IF NOT EXISTS "message" jsonb;
  ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "submit_button_label" varchar;
  ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message';
  ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "confirmation_message" jsonb;
  ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "redirect_url" varchar;
  ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "forms" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "form_submissions_submission_data" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "form_submissions_submission_data" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "form_submissions_submission_data" ADD COLUMN IF NOT EXISTS "field" varchar NOT NULL;
  ALTER TABLE "form_submissions_submission_data" ADD COLUMN IF NOT EXISTS "value" varchar NOT NULL;
  ALTER TABLE "form_submissions" ADD COLUMN IF NOT EXISTS "form_id" integer NOT NULL;
  ALTER TABLE "form_submissions" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "form_submissions" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "search_categories" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "search_categories" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "search_categories" ADD COLUMN IF NOT EXISTS "relation_to" varchar;
  ALTER TABLE "search_categories" ADD COLUMN IF NOT EXISTS "category_i_d" varchar;
  ALTER TABLE "search_categories" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "title" varchar;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "priority" numeric;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "slug" varchar;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "meta_title" varchar;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "meta_description" varchar;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "meta_image_id" integer;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "search" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "search_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "search_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "search_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "search_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;
  ALTER TABLE "payload_kv" ADD COLUMN IF NOT EXISTS "key" varchar NOT NULL;
  ALTER TABLE "payload_kv" ADD COLUMN IF NOT EXISTS "data" jsonb NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "executed_at" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "completed_at" timestamp(3) with time zone NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "task_slug" "enum_payload_jobs_log_task_slug" NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "task_i_d" varchar NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "input" jsonb;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "output" jsonb;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "state" "enum_payload_jobs_log_state" NOT NULL;
  ALTER TABLE "payload_jobs_log" ADD COLUMN IF NOT EXISTS "error" jsonb;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "input" jsonb;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "completed_at" timestamp(3) with time zone;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "total_tried" numeric DEFAULT 0;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "has_error" boolean DEFAULT false;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "error" jsonb;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "task_slug" "enum_payload_jobs_task_slug";
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "queue" varchar DEFAULT 'default';
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "wait_until" timestamp(3) with time zone;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "processing" boolean DEFAULT false;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "payload_jobs" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "payload_locked_documents" ADD COLUMN IF NOT EXISTS "global_slug" varchar;
  ALTER TABLE "payload_locked_documents" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "payload_locked_documents" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "downloads_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "case_studies_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "distributors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "jobs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "partners_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "certifications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "solutions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "content_pages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "redirects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "forms_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "form_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "search_id" integer;
  ALTER TABLE "payload_preferences" ADD COLUMN IF NOT EXISTS "key" varchar;
  ALTER TABLE "payload_preferences" ADD COLUMN IF NOT EXISTS "value" jsonb;
  ALTER TABLE "payload_preferences" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "payload_preferences" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN IF NOT EXISTS "order" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN IF NOT EXISTS "parent_id" integer NOT NULL;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN IF NOT EXISTS "path" varchar NOT NULL;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN IF NOT EXISTS "users_id" integer;
  ALTER TABLE "payload_migrations" ADD COLUMN IF NOT EXISTS "name" varchar;
  ALTER TABLE "payload_migrations" ADD COLUMN IF NOT EXISTS "batch" numeric;
  ALTER TABLE "payload_migrations" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "payload_migrations" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL;
  ALTER TABLE "header_nav_menus_columns_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "header_nav_menus_columns_links" ADD COLUMN IF NOT EXISTS "_parent_id" varchar NOT NULL;
  ALTER TABLE "header_nav_menus_columns_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "header_nav_menus_columns_links" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "header_nav_menus_columns" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "header_nav_menus_columns" ADD COLUMN IF NOT EXISTS "_parent_id" varchar NOT NULL;
  ALTER TABLE "header_nav_menus_columns" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "header_nav_menus_columns" ADD COLUMN IF NOT EXISTS "href" varchar;
  ALTER TABLE "header_nav_menus" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "header_nav_menus" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "header_nav_menus" ADD COLUMN IF NOT EXISTS "key" varchar NOT NULL;
  ALTER TABLE "header_nav_menus" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "hotline_label" varchar DEFAULT 'Customer Hotline:';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "hotline" varchar DEFAULT '+1 (800) ORIANA-1';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "language_label" varchar DEFAULT 'USA · English';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "search_placeholder" varchar DEFAULT 'Search';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "login_label" varchar DEFAULT 'Login';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "login_href" varchar DEFAULT '/admin';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "where_to_buy_label" varchar DEFAULT 'Where to Buy';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "where_to_buy_href" varchar DEFAULT '/where-to-buy';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "quote_label" varchar DEFAULT 'Request Quote';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "quote_href" varchar DEFAULT '/contact';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "logo_id" integer;
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "logo_alt" varchar DEFAULT 'Oriana Inverters';
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "footer_columns_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "footer_columns_links" ADD COLUMN IF NOT EXISTS "_parent_id" varchar NOT NULL;
  ALTER TABLE "footer_columns_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "footer_columns_links" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "footer_columns" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "footer_columns" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "footer_columns" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "footer_social_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "footer_social_links" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "footer_social_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "footer_social_links" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "footer_legal_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "footer_legal_links" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "footer_legal_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "footer_legal_links" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "copyright" varchar DEFAULT '© {year} Oriana Inverters. All rights reserved.';
  ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "footer" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "brand_name" varchar DEFAULT 'Oriana Inverters';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "support_email" varchar DEFAULT 'support@orianainverters.com';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "info_email" varchar DEFAULT 'info@orianainverters.com';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "security_email" varchar DEFAULT 'security@orianainverters.com';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "privacy_email" varchar DEFAULT 'privacy@orianainverters.com';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "hotline" varchar DEFAULT '+1 (800) ORIANA-1';
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "default_meta_title" varchar;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "default_meta_description" varchar;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "og_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "home_strategies_items" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "home_strategies_items" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "home_strategies_items" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "home_strategies_items" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "home_strategies_items" ADD COLUMN IF NOT EXISTS "description" varchar NOT NULL;
  ALTER TABLE "home_strategies_items" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "home_impact_stats" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "home_impact_stats" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "home_impact_stats" ADD COLUMN IF NOT EXISTS "icon" varchar;
  ALTER TABLE "home_impact_stats" ADD COLUMN IF NOT EXISTS "value" varchar NOT NULL;
  ALTER TABLE "home_impact_stats" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "home_why_oriana_items" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "home_why_oriana_items" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "home_why_oriana_items" ADD COLUMN IF NOT EXISTS "icon" varchar;
  ALTER TABLE "home_why_oriana_items" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "home_why_oriana_items" ADD COLUMN IF NOT EXISTS "copy" varchar NOT NULL;
  ALTER TABLE "home_why_oriana_items" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "home_global_reach_regions" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "home_global_reach_regions" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "home_global_reach_regions" ADD COLUMN IF NOT EXISTS "name" varchar NOT NULL;
  ALTER TABLE "home_global_reach_regions" ADD COLUMN IF NOT EXISTS "focus" varchar NOT NULL;
  ALTER TABLE "home_news_items" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "home_news_items" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "home_news_items" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "home_news_items" ADD COLUMN IF NOT EXISTS "date" varchar;
  ALTER TABLE "home_news_items" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "home_news_items" ADD COLUMN IF NOT EXISTS "type" varchar;
  ALTER TABLE "home_support_strip_downloads_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "home_support_strip_downloads_links" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "home_support_strip_downloads_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "home_support_strip_downloads_links" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_primary_cta_label" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_primary_cta_href" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_secondary_cta_label" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_secondary_cta_href" varchar NOT NULL;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "strategies_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "strategies_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "strategies_description" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "impact_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "impact_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "impact_cta_label" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "impact_cta_href" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "why_oriana_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "why_oriana_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "why_oriana_description" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "global_reach_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "global_reach_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "global_reach_description" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "global_reach_cta_label" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "global_reach_cta_href" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "news_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "news_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "news_view_all_label" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "news_view_all_href" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "case_studies_intro_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "case_studies_intro_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "case_studies_intro_view_all_label" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "case_studies_intro_view_all_href" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_service_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_service_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_service_hotline" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_service_link_label" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_service_link_href" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_downloads_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_partner_eyebrow" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_partner_description" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_partner_cta_label" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "support_strip_partner_cta_href" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "about_story_paragraphs" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "about_story_paragraphs" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "about_story_paragraphs" ADD COLUMN IF NOT EXISTS "text" varchar NOT NULL;
  ALTER TABLE "about_stats" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "about_stats" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "about_stats" ADD COLUMN IF NOT EXISTS "value" varchar NOT NULL;
  ALTER TABLE "about_stats" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "about_values" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "about_values" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "about_values" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "about_values" ADD COLUMN IF NOT EXISTS "description" varchar NOT NULL;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "story_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "contact_contact_items" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "contact_contact_items" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "contact_contact_items" ADD COLUMN IF NOT EXISTS "icon" varchar;
  ALTER TABLE "contact_contact_items" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "contact_contact_items" ADD COLUMN IF NOT EXISTS "value" varchar NOT NULL;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "sidebar_title" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "form_name_label" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "form_email_label" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "form_company_label" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "form_message_label" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "form_submit_label" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "form_success_title" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "form_success_message" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "contact" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "why_title" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "why_description" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "why_image_id" integer;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "why_image_url" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "openings_title" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "fallback_cta_label" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "fallback_cta_href" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "careers" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "support_channels" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "support_channels" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "support_channels" ADD COLUMN IF NOT EXISTS "icon" varchar;
  ALTER TABLE "support_channels" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "support_channels" ADD COLUMN IF NOT EXISTS "detail" varchar NOT NULL;
  ALTER TABLE "support_channels" ADD COLUMN IF NOT EXISTS "note" varchar;
  ALTER TABLE "support_resource_links" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "support_resource_links" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "support_resource_links" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "support_resource_links" ADD COLUMN IF NOT EXISTS "href" varchar NOT NULL;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "resources_title" varchar;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "ticket_cta_title" varchar;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "ticket_cta_description" varchar;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "ticket_cta_cta_label" varchar NOT NULL;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "ticket_cta_cta_href" varchar NOT NULL;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "support" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "warranty_tiers" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "warranty_tiers" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "warranty_tiers" ADD COLUMN IF NOT EXISTS "product" varchar NOT NULL;
  ALTER TABLE "warranty_tiers" ADD COLUMN IF NOT EXISTS "standard" varchar NOT NULL;
  ALTER TABLE "warranty_tiers" ADD COLUMN IF NOT EXISTS "extended" varchar NOT NULL;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "tiers_title" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "register_title" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "register_description" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "claim_title" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "claim_description" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "primary_cta_label" varchar NOT NULL;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "primary_cta_href" varchar NOT NULL;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "secondary_cta_label" varchar NOT NULL;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "secondary_cta_href" varchar NOT NULL;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "warranty" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "sustainability_highlights" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "sustainability_highlights" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "sustainability_highlights" ADD COLUMN IF NOT EXISTS "value" varchar NOT NULL;
  ALTER TABLE "sustainability_highlights" ADD COLUMN IF NOT EXISTS "label" varchar NOT NULL;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_title" varchar;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_description" varchar;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_image_id" integer;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_image_url" varchar;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_primary_cta_label" varchar NOT NULL;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_primary_cta_href" varchar NOT NULL;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_secondary_cta_label" varchar NOT NULL;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "approach_secondary_cta_href" varchar NOT NULL;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "sustainability" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "sustainability_reports_reports" ADD COLUMN IF NOT EXISTS "_order" integer NOT NULL;
  ALTER TABLE "sustainability_reports_reports" ADD COLUMN IF NOT EXISTS "_parent_id" integer NOT NULL;
  ALTER TABLE "sustainability_reports_reports" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;
  ALTER TABLE "sustainability_reports_reports" ADD COLUMN IF NOT EXISTS "year" varchar;
  ALTER TABLE "sustainability_reports_reports" ADD COLUMN IF NOT EXISTS "size" varchar;
  ALTER TABLE "sustainability_reports_reports" ADD COLUMN IF NOT EXISTS "href" varchar DEFAULT '/resources/downloads';
  ALTER TABLE "sustainability_reports_reports" ADD COLUMN IF NOT EXISTS "file_id" integer;
  ALTER TABLE "sustainability_reports" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "sustainability_reports" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "sustainability_reports" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "sustainability_reports" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "sustainability_reports" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "sustainability_reports" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "sustainability_reports" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "hero_title" varchar NOT NULL;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "hero_description" varchar;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "become_distributor_title" varchar;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "become_distributor_description" varchar;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "become_distributor_cta_label" varchar NOT NULL;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "become_distributor_cta_href" varchar NOT NULL;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "where_to_buy" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "faqs_eyebrow" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "faqs_title" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "faqs_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "faqs_cta_prompt" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "faqs_cta_label" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "faqs_cta_href" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "videos_eyebrow" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "videos_title" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "videos_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "videos_footer_note" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "certifications_eyebrow" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "certifications_title" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "certifications_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "certifications_certs_heading" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "certifications_awards_heading" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_eyebrow" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_title" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_cta_title" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_cta_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_cta_primary_cta_label" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_cta_primary_cta_href" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_cta_secondary_cta_label" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "partners_cta_secondary_cta_href" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "case_studies_eyebrow" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "case_studies_title" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "case_studies_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "products_eyebrow" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "products_title" varchar NOT NULL;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "products_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "updated_at" timestamp(3) with time zone;
  ALTER TABLE "page_intros" ADD COLUMN IF NOT EXISTS "created_at" timestamp(3) with time zone;

  DO $$ BEGIN
  
   ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  
  EXCEPTION
  
   WHEN duplicate_object THEN null;
  
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products_key_specs" ADD CONSTRAINT "products_key_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_datasheet_pdf_id_media_id_fk" FOREIGN KEY ("datasheet_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_manual_pdf_id_media_id_fk" FOREIGN KEY ("manual_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_key_specs" ADD CONSTRAINT "_products_v_version_key_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_datasheet_pdf_id_media_id_fk" FOREIGN KEY ("version_datasheet_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_manual_pdf_id_media_id_fk" FOREIGN KEY ("version_manual_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "downloads" ADD CONSTRAINT "downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "downloads" ADD CONSTRAINT "downloads_related_product_id_products_id_fk" FOREIGN KEY ("related_product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "case_studies_product_slugs" ADD CONSTRAINT "case_studies_product_slugs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "case_studies_results" ADD CONSTRAINT "case_studies_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "case_studies_stats" ADD CONSTRAINT "case_studies_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "faqs_items" ADD CONSTRAINT "faqs_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "videos" ADD CONSTRAINT "videos_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "solutions_benefits" ADD CONSTRAINT "solutions_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "solutions_products" ADD CONSTRAINT "solutions_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "solutions" ADD CONSTRAINT "solutions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "solutions" ADD CONSTRAINT "solutions_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "content_pages_breadcrumb" ADD CONSTRAINT "content_pages_breadcrumb_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "content_pages_sections_paragraphs" ADD CONSTRAINT "content_pages_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_pages_sections"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "content_pages_sections" ADD CONSTRAINT "content_pages_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "content_pages" ADD CONSTRAINT "content_pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_distributors_fk" FOREIGN KEY ("distributors_id") REFERENCES "public"."distributors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_pages_fk" FOREIGN KEY ("content_pages_id") REFERENCES "public"."content_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "header_nav_menus_columns_links" ADD CONSTRAINT "header_nav_menus_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_menus_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "header_nav_menus_columns" ADD CONSTRAINT "header_nav_menus_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_menus"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "header_nav_menus" ADD CONSTRAINT "header_nav_menus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "home_strategies_items" ADD CONSTRAINT "home_strategies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "home_impact_stats" ADD CONSTRAINT "home_impact_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "home_why_oriana_items" ADD CONSTRAINT "home_why_oriana_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "home_global_reach_regions" ADD CONSTRAINT "home_global_reach_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "home_news_items" ADD CONSTRAINT "home_news_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "home_support_strip_downloads_links" ADD CONSTRAINT "home_support_strip_downloads_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "about_story_paragraphs" ADD CONSTRAINT "about_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "about_stats" ADD CONSTRAINT "about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "about_values" ADD CONSTRAINT "about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "contact_contact_items" ADD CONSTRAINT "contact_contact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "careers" ADD CONSTRAINT "careers_why_image_id_media_id_fk" FOREIGN KEY ("why_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "support_channels" ADD CONSTRAINT "support_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."support"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "support_resource_links" ADD CONSTRAINT "support_resource_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."support"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "warranty_tiers" ADD CONSTRAINT "warranty_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warranty"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "sustainability_highlights" ADD CONSTRAINT "sustainability_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "sustainability" ADD CONSTRAINT "sustainability_approach_image_id_media_id_fk" FOREIGN KEY ("approach_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "sustainability_reports_reports" ADD CONSTRAINT "sustainability_reports_reports_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  DO $$ BEGIN
   ALTER TABLE "sustainability_reports_reports" ADD CONSTRAINT "sustainability_reports_reports_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_reports"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  CREATE INDEX IF NOT EXISTS "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "products_key_specs_order_idx" ON "products_key_specs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_key_specs_parent_id_idx" ON "products_key_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "products_hero_image_idx" ON "products" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "products_datasheet_pdf_idx" ON "products" USING btree ("datasheet_pdf_id");
  CREATE INDEX IF NOT EXISTS "products_manual_pdf_idx" ON "products" USING btree ("manual_pdf_id");
  CREATE INDEX IF NOT EXISTS "products_seo_seo_og_image_idx" ON "products" USING btree ("seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_products_v_version_gallery_order_idx" ON "_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_gallery_parent_id_idx" ON "_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_gallery_image_idx" ON "_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_key_specs_order_idx" ON "_products_v_version_key_specs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_key_specs_parent_id_idx" ON "_products_v_version_key_specs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_hero_image_idx" ON "_products_v" USING btree ("version_hero_image_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_datasheet_pdf_idx" ON "_products_v" USING btree ("version_datasheet_pdf_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_manual_pdf_idx" ON "_products_v" USING btree ("version_manual_pdf_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_seo_version_seo_og_image_idx" ON "_products_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "downloads_file_idx" ON "downloads" USING btree ("file_id");
  CREATE INDEX IF NOT EXISTS "downloads_related_product_idx" ON "downloads" USING btree ("related_product_id");
  CREATE INDEX IF NOT EXISTS "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_4k_sizes_4k_filename_idx" ON "media" USING btree ("sizes_4k_filename");
  CREATE INDEX IF NOT EXISTS "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "case_studies_product_slugs_order_idx" ON "case_studies_product_slugs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_product_slugs_parent_id_idx" ON "case_studies_product_slugs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_results_order_idx" ON "case_studies_results" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_results_parent_id_idx" ON "case_studies_results" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "case_studies_stats_order_idx" ON "case_studies_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "case_studies_stats_parent_id_idx" ON "case_studies_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "case_studies_image_idx" ON "case_studies" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "case_studies_seo_seo_og_image_idx" ON "case_studies" USING btree ("seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "faqs_items_order_idx" ON "faqs_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "faqs_items_parent_id_idx" ON "faqs_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "videos_thumbnail_idx" ON "videos" USING btree ("thumbnail_id");
  CREATE INDEX IF NOT EXISTS "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "distributors_external_id_idx" ON "distributors" USING btree ("external_id");
  CREATE INDEX IF NOT EXISTS "distributors_updated_at_idx" ON "distributors" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "distributors_created_at_idx" ON "distributors" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "solutions_benefits_order_idx" ON "solutions_benefits" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "solutions_benefits_parent_id_idx" ON "solutions_benefits" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "solutions_products_order_idx" ON "solutions_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "solutions_products_parent_id_idx" ON "solutions_products" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "solutions_slug_idx" ON "solutions" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "solutions_image_idx" ON "solutions" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "solutions_seo_seo_og_image_idx" ON "solutions" USING btree ("seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "solutions_updated_at_idx" ON "solutions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "solutions_created_at_idx" ON "solutions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "content_pages_breadcrumb_order_idx" ON "content_pages_breadcrumb" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "content_pages_breadcrumb_parent_id_idx" ON "content_pages_breadcrumb" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "content_pages_sections_paragraphs_order_idx" ON "content_pages_sections_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "content_pages_sections_paragraphs_parent_id_idx" ON "content_pages_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "content_pages_sections_order_idx" ON "content_pages_sections" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "content_pages_sections_parent_id_idx" ON "content_pages_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "content_pages_slug_idx" ON "content_pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "content_pages_seo_seo_og_image_idx" ON "content_pages" USING btree ("seo_og_image_id");
  CREATE INDEX IF NOT EXISTS "content_pages_updated_at_idx" ON "content_pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "content_pages_created_at_idx" ON "content_pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX IF NOT EXISTS "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX IF NOT EXISTS "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX IF NOT EXISTS "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_distributors_id_idx" ON "payload_locked_documents_rels" USING btree ("distributors_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_solutions_id_idx" ON "payload_locked_documents_rels" USING btree ("solutions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_content_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("content_pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "header_nav_menus_columns_links_order_idx" ON "header_nav_menus_columns_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_menus_columns_links_parent_id_idx" ON "header_nav_menus_columns_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_menus_columns_order_idx" ON "header_nav_menus_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_menus_columns_parent_id_idx" ON "header_nav_menus_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_nav_menus_order_idx" ON "header_nav_menus" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_nav_menus_parent_id_idx" ON "header_nav_menus" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");
  CREATE INDEX IF NOT EXISTS "home_strategies_items_order_idx" ON "home_strategies_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_strategies_items_parent_id_idx" ON "home_strategies_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_impact_stats_order_idx" ON "home_impact_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_impact_stats_parent_id_idx" ON "home_impact_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_why_oriana_items_order_idx" ON "home_why_oriana_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_why_oriana_items_parent_id_idx" ON "home_why_oriana_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_global_reach_regions_order_idx" ON "home_global_reach_regions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_global_reach_regions_parent_id_idx" ON "home_global_reach_regions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_news_items_order_idx" ON "home_news_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_news_items_parent_id_idx" ON "home_news_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_support_strip_downloads_links_order_idx" ON "home_support_strip_downloads_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_support_strip_downloads_links_parent_id_idx" ON "home_support_strip_downloads_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_story_paragraphs_order_idx" ON "about_story_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_story_paragraphs_parent_id_idx" ON "about_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_stats_order_idx" ON "about_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_stats_parent_id_idx" ON "about_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_values_order_idx" ON "about_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_values_parent_id_idx" ON "about_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_contact_items_order_idx" ON "contact_contact_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_contact_items_parent_id_idx" ON "contact_contact_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "careers_why_why_image_idx" ON "careers" USING btree ("why_image_id");
  CREATE INDEX IF NOT EXISTS "support_channels_order_idx" ON "support_channels" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "support_channels_parent_id_idx" ON "support_channels" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "support_resource_links_order_idx" ON "support_resource_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "support_resource_links_parent_id_idx" ON "support_resource_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "warranty_tiers_order_idx" ON "warranty_tiers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "warranty_tiers_parent_id_idx" ON "warranty_tiers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "sustainability_highlights_order_idx" ON "sustainability_highlights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "sustainability_highlights_parent_id_idx" ON "sustainability_highlights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "sustainability_approach_approach_image_idx" ON "sustainability" USING btree ("approach_image_id");
  CREATE INDEX IF NOT EXISTS "sustainability_reports_reports_order_idx" ON "sustainability_reports_reports" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "sustainability_reports_reports_parent_id_idx" ON "sustainability_reports_reports" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "sustainability_reports_reports_file_idx" ON "sustainability_reports_reports" USING btree ("file_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "pages_hero_links" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_cta_links" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_cta" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_content_columns" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_content" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_media_block" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_archive" CASCADE;
  DROP TABLE IF EXISTS "pages_blocks_form_block" CASCADE;
  DROP TABLE IF EXISTS "pages" CASCADE;
  DROP TABLE IF EXISTS "pages_rels" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_version_hero_links" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_cta" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_content" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_archive" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE IF EXISTS "_pages_v" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_rels" CASCADE;
  DROP TABLE IF EXISTS "posts_populated_authors" CASCADE;
  DROP TABLE IF EXISTS "posts" CASCADE;
  DROP TABLE IF EXISTS "posts_rels" CASCADE;
  DROP TABLE IF EXISTS "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE IF EXISTS "_posts_v" CASCADE;
  DROP TABLE IF EXISTS "_posts_v_rels" CASCADE;
  DROP TABLE IF EXISTS "products_gallery" CASCADE;
  DROP TABLE IF EXISTS "products_key_specs" CASCADE;
  DROP TABLE IF EXISTS "products" CASCADE;
  DROP TABLE IF EXISTS "_products_v_version_gallery" CASCADE;
  DROP TABLE IF EXISTS "_products_v_version_key_specs" CASCADE;
  DROP TABLE IF EXISTS "_products_v" CASCADE;
  DROP TABLE IF EXISTS "downloads" CASCADE;
  DROP TABLE IF EXISTS "media" CASCADE;
  DROP TABLE IF EXISTS "categories_breadcrumbs" CASCADE;
  DROP TABLE IF EXISTS "categories" CASCADE;
  DROP TABLE IF EXISTS "case_studies_product_slugs" CASCADE;
  DROP TABLE IF EXISTS "case_studies_results" CASCADE;
  DROP TABLE IF EXISTS "case_studies_stats" CASCADE;
  DROP TABLE IF EXISTS "case_studies" CASCADE;
  DROP TABLE IF EXISTS "faqs_items" CASCADE;
  DROP TABLE IF EXISTS "faqs" CASCADE;
  DROP TABLE IF EXISTS "videos" CASCADE;
  DROP TABLE IF EXISTS "distributors" CASCADE;
  DROP TABLE IF EXISTS "jobs" CASCADE;
  DROP TABLE IF EXISTS "partners" CASCADE;
  DROP TABLE IF EXISTS "certifications" CASCADE;
  DROP TABLE IF EXISTS "solutions_benefits" CASCADE;
  DROP TABLE IF EXISTS "solutions_products" CASCADE;
  DROP TABLE IF EXISTS "solutions" CASCADE;
  DROP TABLE IF EXISTS "content_pages_breadcrumb" CASCADE;
  DROP TABLE IF EXISTS "content_pages_sections_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "content_pages_sections" CASCADE;
  DROP TABLE IF EXISTS "content_pages" CASCADE;
  DROP TABLE IF EXISTS "users_sessions" CASCADE;
  DROP TABLE IF EXISTS "users" CASCADE;
  DROP TABLE IF EXISTS "redirects" CASCADE;
  DROP TABLE IF EXISTS "redirects_rels" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_checkbox" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_country" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_email" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_message" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_number" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_select_options" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_select" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_state" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_text" CASCADE;
  DROP TABLE IF EXISTS "forms_blocks_textarea" CASCADE;
  DROP TABLE IF EXISTS "forms_emails" CASCADE;
  DROP TABLE IF EXISTS "forms" CASCADE;
  DROP TABLE IF EXISTS "form_submissions_submission_data" CASCADE;
  DROP TABLE IF EXISTS "form_submissions" CASCADE;
  DROP TABLE IF EXISTS "search_categories" CASCADE;
  DROP TABLE IF EXISTS "search" CASCADE;
  DROP TABLE IF EXISTS "search_rels" CASCADE;
  DROP TABLE IF EXISTS "payload_kv" CASCADE;
  DROP TABLE IF EXISTS "payload_jobs_log" CASCADE;
  DROP TABLE IF EXISTS "payload_jobs" CASCADE;
  DROP TABLE IF EXISTS "payload_locked_documents" CASCADE;
  DROP TABLE IF EXISTS "payload_locked_documents_rels" CASCADE;
  DROP TABLE IF EXISTS "payload_preferences" CASCADE;
  DROP TABLE IF EXISTS "payload_preferences_rels" CASCADE;
  DROP TABLE IF EXISTS "payload_migrations" CASCADE;
  DROP TABLE IF EXISTS "header_nav_menus_columns_links" CASCADE;
  DROP TABLE IF EXISTS "header_nav_menus_columns" CASCADE;
  DROP TABLE IF EXISTS "header_nav_menus" CASCADE;
  DROP TABLE IF EXISTS "header" CASCADE;
  DROP TABLE IF EXISTS "footer_columns_links" CASCADE;
  DROP TABLE IF EXISTS "footer_columns" CASCADE;
  DROP TABLE IF EXISTS "footer_social_links" CASCADE;
  DROP TABLE IF EXISTS "footer_legal_links" CASCADE;
  DROP TABLE IF EXISTS "footer" CASCADE;
  DROP TABLE IF EXISTS "site_settings" CASCADE;
  DROP TABLE IF EXISTS "home_strategies_items" CASCADE;
  DROP TABLE IF EXISTS "home_impact_stats" CASCADE;
  DROP TABLE IF EXISTS "home_why_oriana_items" CASCADE;
  DROP TABLE IF EXISTS "home_global_reach_regions" CASCADE;
  DROP TABLE IF EXISTS "home_news_items" CASCADE;
  DROP TABLE IF EXISTS "home_support_strip_downloads_links" CASCADE;
  DROP TABLE IF EXISTS "home" CASCADE;
  DROP TABLE IF EXISTS "about_story_paragraphs" CASCADE;
  DROP TABLE IF EXISTS "about_stats" CASCADE;
  DROP TABLE IF EXISTS "about_values" CASCADE;
  DROP TABLE IF EXISTS "about" CASCADE;
  DROP TABLE IF EXISTS "contact_contact_items" CASCADE;
  DROP TABLE IF EXISTS "contact" CASCADE;
  DROP TABLE IF EXISTS "careers" CASCADE;
  DROP TABLE IF EXISTS "support_channels" CASCADE;
  DROP TABLE IF EXISTS "support_resource_links" CASCADE;
  DROP TABLE IF EXISTS "support" CASCADE;
  DROP TABLE IF EXISTS "warranty_tiers" CASCADE;
  DROP TABLE IF EXISTS "warranty" CASCADE;
  DROP TABLE IF EXISTS "sustainability_highlights" CASCADE;
  DROP TABLE IF EXISTS "sustainability" CASCADE;
  DROP TABLE IF EXISTS "sustainability_reports_reports" CASCADE;
  DROP TABLE IF EXISTS "sustainability_reports" CASCADE;
  DROP TABLE IF EXISTS "where_to_buy" CASCADE;
  DROP TABLE IF EXISTS "page_intros" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_pages_hero_links_link_type";
  DROP TYPE IF EXISTS "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_content_columns_link_appearance";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE IF EXISTS "public"."enum_pages_hero_type";
  DROP TYPE IF EXISTS "public"."enum_pages_status";
  DROP TYPE IF EXISTS "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_content_columns_link_appearance";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE IF EXISTS "public"."enum__pages_v_version_hero_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_version_status";
  DROP TYPE IF EXISTS "public"."enum_posts_status";
  DROP TYPE IF EXISTS "public"."enum__posts_v_version_status";
  DROP TYPE IF EXISTS "public"."enum_products_segment";
  DROP TYPE IF EXISTS "public"."enum_products_status";
  DROP TYPE IF EXISTS "public"."enum__products_v_version_segment";
  DROP TYPE IF EXISTS "public"."enum__products_v_version_status";
  DROP TYPE IF EXISTS "public"."enum_downloads_document_type";
  DROP TYPE IF EXISTS "public"."enum_media_media_type";
  DROP TYPE IF EXISTS "public"."enum_media_video_resolution";
  DROP TYPE IF EXISTS "public"."enum_distributors_type";
  DROP TYPE IF EXISTS "public"."enum_partners_category";
  DROP TYPE IF EXISTS "public"."enum_certifications_kind";
  DROP TYPE IF EXISTS "public"."enum_solutions_slug";
  DROP TYPE IF EXISTS "public"."enum_redirects_to_type";
  DROP TYPE IF EXISTS "public"."enum_forms_confirmation_type";
  DROP TYPE IF EXISTS "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE IF EXISTS "public"."enum_payload_jobs_log_state";
  DROP TYPE IF EXISTS "public"."enum_payload_jobs_task_slug";`)
}
