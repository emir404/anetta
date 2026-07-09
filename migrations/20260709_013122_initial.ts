import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_order\` text,
  	\`quote\` text NOT NULL,
  	\`attribution\` text NOT NULL,
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials__order_idx\` ON \`testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`homepage_hero_service_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`alt\` text NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_hero_service_cards_order_idx\` ON \`homepage_hero_service_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_service_cards_parent_id_idx\` ON \`homepage_hero_service_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_service_cards_image_idx\` ON \`homepage_hero_service_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_services_heading_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_services_heading_lines_order_idx\` ON \`homepage_services_heading_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_heading_lines_parent_id_idx\` ON \`homepage_services_heading_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_services_categories_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`on_request\` integer DEFAULT false,
  	\`price\` numeric,
  	\`from_price\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_services_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_services_categories_items_order_idx\` ON \`homepage_services_categories_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_categories_items_parent_id_idx\` ON \`homepage_services_categories_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_services_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`note\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_services_categories_order_idx\` ON \`homepage_services_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_services_categories_parent_id_idx\` ON \`homepage_services_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_about_heading_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_about_heading_lines_order_idx\` ON \`homepage_about_heading_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_heading_lines_parent_id_idx\` ON \`homepage_about_heading_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_about_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_about_paragraphs_order_idx\` ON \`homepage_about_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_paragraphs_parent_id_idx\` ON \`homepage_about_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_about_facts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_about_facts_order_idx\` ON \`homepage_about_facts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_about_facts_parent_id_idx\` ON \`homepage_about_facts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_sign_quote_quote_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_sign_quote_quote_lines_order_idx\` ON \`homepage_sign_quote_quote_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_sign_quote_quote_lines_parent_id_idx\` ON \`homepage_sign_quote_quote_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_salon_heading_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_salon_heading_lines_order_idx\` ON \`homepage_salon_heading_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_salon_heading_lines_parent_id_idx\` ON \`homepage_salon_heading_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_salon_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_salon_paragraphs_order_idx\` ON \`homepage_salon_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_salon_paragraphs_parent_id_idx\` ON \`homepage_salon_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_contact_heading_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_contact_heading_lines_order_idx\` ON \`homepage_contact_heading_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_contact_heading_lines_parent_id_idx\` ON \`homepage_contact_heading_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage_termin_heading_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_termin_heading_lines_order_idx\` ON \`homepage_termin_heading_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_termin_heading_lines_parent_id_idx\` ON \`homepage_termin_heading_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`homepage\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_groups_line\` text,
  	\`hero_hours_line\` text,
  	\`services_eyebrow\` text,
  	\`services_intro\` text,
  	\`services_price_mode\` text DEFAULT 'draft' NOT NULL,
  	\`services_footnote\` text,
  	\`about_eyebrow\` text,
  	\`about_image_id\` integer,
  	\`sign_quote_caption\` text,
  	\`salon_eyebrow\` text,
  	\`salon_storefront_image_id\` integer,
  	\`salon_detail_image_id\` integer,
  	\`contact_intro\` text,
  	\`termin_eyebrow\` text,
  	\`termin_intro\` text,
  	\`termin_call_label\` text,
  	\`termin_image_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`salon_storefront_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`salon_detail_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`termin_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_about_about_image_idx\` ON \`homepage\` (\`about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_salon_salon_storefront_image_idx\` ON \`homepage\` (\`salon_storefront_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_salon_salon_detail_image_idx\` ON \`homepage\` (\`salon_detail_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_termin_termin_image_idx\` ON \`homepage\` (\`termin_image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`day\` text NOT NULL,
  	\`time\` text NOT NULL,
  	\`closed\` integer DEFAULT false,
  	\`open_minutes\` numeric,
  	\`close_minutes\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_hours_order_idx\` ON \`site_settings_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hours_parent_id_idx\` ON \`site_settings_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_hours_summary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`days\` text NOT NULL,
  	\`time\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_hours_summary_order_idx\` ON \`site_settings_hours_summary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hours_summary_parent_id_idx\` ON \`site_settings_hours_summary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text NOT NULL,
  	\`meta_title_template\` text NOT NULL,
  	\`meta_description\` text NOT NULL,
  	\`meta_site_url\` text NOT NULL,
  	\`business_name\` text NOT NULL,
  	\`business_owner\` text NOT NULL,
  	\`business_tagline\` text NOT NULL,
  	\`business_street\` text NOT NULL,
  	\`business_postal_code\` text NOT NULL,
  	\`business_city\` text NOT NULL,
  	\`business_locality\` text NOT NULL,
  	\`business_phone_display\` text NOT NULL,
  	\`business_phone_e164\` text NOT NULL,
  	\`business_logo_id\` integer,
  	\`geo_latitude\` numeric NOT NULL,
  	\`geo_longitude\` numeric NOT NULL,
  	\`maps_url\` text NOT NULL,
  	\`maps_embed_url\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`business_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_business_business_logo_idx\` ON \`site_settings\` (\`business_logo_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`impressum\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`impressum_sections_order_idx\` ON \`impressum_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`impressum_sections_parent_id_idx\` ON \`impressum_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`impressum\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Impressum' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`datenschutz_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`datenschutz\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`datenschutz_sections_order_idx\` ON \`datenschutz_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`datenschutz_sections_parent_id_idx\` ON \`datenschutz_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`datenschutz\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'Datenschutzerklärung' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`homepage_hero_service_cards\`;`)
  await db.run(sql`DROP TABLE \`homepage_services_heading_lines\`;`)
  await db.run(sql`DROP TABLE \`homepage_services_categories_items\`;`)
  await db.run(sql`DROP TABLE \`homepage_services_categories\`;`)
  await db.run(sql`DROP TABLE \`homepage_about_heading_lines\`;`)
  await db.run(sql`DROP TABLE \`homepage_about_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`homepage_about_facts\`;`)
  await db.run(sql`DROP TABLE \`homepage_sign_quote_quote_lines\`;`)
  await db.run(sql`DROP TABLE \`homepage_salon_heading_lines\`;`)
  await db.run(sql`DROP TABLE \`homepage_salon_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`homepage_contact_heading_lines\`;`)
  await db.run(sql`DROP TABLE \`homepage_termin_heading_lines\`;`)
  await db.run(sql`DROP TABLE \`homepage\`;`)
  await db.run(sql`DROP TABLE \`site_settings_hours\`;`)
  await db.run(sql`DROP TABLE \`site_settings_hours_summary\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`impressum_sections\`;`)
  await db.run(sql`DROP TABLE \`impressum\`;`)
  await db.run(sql`DROP TABLE \`datenschutz_sections\`;`)
  await db.run(sql`DROP TABLE \`datenschutz\`;`)
}
