# Supabase Setup Guide for Lunar Antiques

## ✅ What's Been Done

1. **SQL Schema Created** (`supabase-schema.sql`)
   - All necessary tables for CRM (deals, contacts, negotiations)
   - All necessary tables for CMS (collection items, images, services, features)
   - Row Level Security (RLS) policies configured
   - Indexes for performance
   - Auto-update triggers for `updated_at` timestamps

2. **Supabase Client Configured** (`src/lib/supabaseClient.js`)
   - Your Supabase URL and anon key are hardcoded (can be overridden with env vars)
   - Ready to use throughout the app

3. **All Components Updated to Use Supabase:**
   - ✅ `AdminCollectionCMS.jsx` - Creates/reads/updates/deletes collection items and images
   - ✅ `AdminServicesCMS.jsx` - Creates/reads/updates/deletes services and features
   - ✅ `AdminDashboard.jsx` - Fetches real CRM data (deals, contacts) from Supabase
   - ✅ `Collection.jsx` - Reads published collection items from Supabase (with fallback to static data)
   - ✅ `Services.jsx` - Reads published services from Supabase (with fallback to static data)
   - ✅ `Contact.jsx` - Already saves contact form submissions to Supabase

## 📋 Next Steps

### 1. Run the SQL Schema in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `qwlbgzkzzzrxmcitmnya`
3. Go to **SQL Editor**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste and click **Run**
6. Verify all tables were created (check the Table Editor)

### 2. Test the Integration

1. **Test Collection CMS:**
   - Go to `/admin/login` (use `lunarantics@gmail.com` / `luna123`)
   - Navigate to Collection CMS
   - Add a collection item with image URLs
   - Check `/collection` page - it should show your new item

2. **Test Services CMS:**
   - Go to Services CMS
   - Add/edit a service
   - Check `/services` page - it should show your new service

3. **Test Contact Form:**
   - Submit the contact form on `/contact`
   - Check Admin Dashboard - the contact should appear in "Key Contacts"

4. **Test CRM:**
   - Add deals manually in Supabase (or via admin later)
   - Check Admin Dashboard - deals should appear in the pipeline

## 🗄️ Database Tables Created

### CRM Tables:
- `crm_contacts` - Contact form submissions and manual entries
- `crm_deals` - Deals/pipeline items
- `crm_negotiations` - Activity log for deals and contacts

### CMS Tables:
- `cms_collection_items` - Collection items (antiques/products)
- `cms_collection_images` - Multiple images per collection item
- `cms_services` - Services offered
- `cms_service_features` - Bullet points/features for each service

## 🔐 Security Notes

- RLS (Row Level Security) is enabled on all tables
- Public can INSERT into `crm_contacts` (for contact form)
- Public can SELECT published items from `cms_collection_items` and `cms_services`
- All other operations require authentication (adjust policies as needed)

## 🚀 Deployment

When deploying to Netlify:
- The Supabase credentials are already hardcoded in `supabaseClient.js`
- No environment variables needed (but you can override with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if desired)

## 📝 Notes

- Collection and Services pages will use Supabase data if available, otherwise fall back to the original static data
- All admin operations (create/update/delete) now save to Supabase
- The contact form saves to `crm_contacts` table automatically


