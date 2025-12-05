-- Lunar Antiques Supabase Schema
-- Run this SQL in your Supabase SQL Editor to create all necessary tables

-- Enable Row Level Security (RLS) on all tables
-- Note: Adjust policies based on your authentication needs

-- ============================================
-- CRM TABLES
-- ============================================

-- Contacts table (from contact form submissions and manual entries)
CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT,
  inquiry_type TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'customer', 'archived')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals/Pipeline table
CREATE TABLE IF NOT EXISTS crm_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  value TEXT, -- Store as text like "£4,800" for flexibility
  status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'negotiation', 'closed_won', 'closed_lost')),
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE SET NULL,
  owner TEXT, -- Admin user name
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Negotiations/Activity log
CREATE TABLE IF NOT EXISTS crm_negotiations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES crm_deals(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
  activity_type TEXT DEFAULT 'note' CHECK (activity_type IN ('note', 'email', 'call', 'meeting', 'offer', 'counter_offer')),
  title TEXT,
  description TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CMS TABLES
-- ============================================

-- Collection items (antiques/products)
CREATE TABLE IF NOT EXISTS cms_collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('furniture', 'porcelain', 'silver', 'prints', 'sculpture', 'decorative')),
  period TEXT NOT NULL CHECK (period IN ('georgian', 'regency', 'victorian', 'edwardian')),
  price TEXT, -- Store as text like "£2,850"
  description TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collection item images (many images per item)
CREATE TABLE IF NOT EXISTS cms_collection_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_item_id UUID REFERENCES cms_collection_items(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0, -- Order for 360° viewer
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS cms_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  pricing TEXT, -- Store as text like "From £150"
  published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service features/bullet points
CREATE TABLE IF NOT EXISTS cms_service_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES cms_services(id) ON DELETE CASCADE,
  feature_text TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for better query performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_status ON crm_contacts(status);
CREATE INDEX IF NOT EXISTS idx_crm_deals_status ON crm_deals(status);
CREATE INDEX IF NOT EXISTS idx_crm_deals_contact_id ON crm_deals(contact_id);
CREATE INDEX IF NOT EXISTS idx_crm_negotiations_deal_id ON crm_negotiations(deal_id);
CREATE INDEX IF NOT EXISTS idx_cms_collection_category ON cms_collection_items(category);
CREATE INDEX IF NOT EXISTS idx_cms_collection_period ON cms_collection_items(period);
CREATE INDEX IF NOT EXISTS idx_cms_collection_featured ON cms_collection_items(featured);
CREATE INDEX IF NOT EXISTS idx_cms_collection_published ON cms_collection_items(published);
CREATE INDEX IF NOT EXISTS idx_cms_collection_images_item_id ON cms_collection_images(collection_item_id);
CREATE INDEX IF NOT EXISTS idx_cms_services_published ON cms_services(published);
CREATE INDEX IF NOT EXISTS idx_cms_service_features_service_id ON cms_service_features(service_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_negotiations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_collection_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_service_features ENABLE ROW LEVEL SECURITY;

-- For now, allow all operations (you can restrict later based on auth)
-- In production, you'd want to restrict based on authenticated admin users

-- Allow all operations for authenticated users (adjust based on your auth setup)
CREATE POLICY "Allow all for authenticated users" ON crm_contacts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON crm_deals
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON crm_negotiations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON cms_collection_items
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON cms_collection_images
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON cms_services
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all for authenticated users" ON cms_service_features
  FOR ALL USING (true) WITH CHECK (true);

-- Allow public inserts for contact form (no auth required)
CREATE POLICY "Allow public inserts" ON crm_contacts
  FOR INSERT WITH CHECK (true);

-- Allow public reads for published collection items and services
CREATE POLICY "Allow public reads for published items" ON cms_collection_items
  FOR SELECT USING (published = true);

CREATE POLICY "Allow public reads for published services" ON cms_services
  FOR SELECT USING (published = true);

-- ============================================
-- FUNCTIONS for updated_at timestamps
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_crm_contacts_updated_at
  BEFORE UPDATE ON crm_contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_deals_updated_at
  BEFORE UPDATE ON crm_deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_collection_items_updated_at
  BEFORE UPDATE ON cms_collection_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_services_updated_at
  BEFORE UPDATE ON cms_services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


