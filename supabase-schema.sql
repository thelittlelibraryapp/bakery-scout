-- Capital District Food Scout - Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create the bakeries table
CREATE TABLE bakeries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  website TEXT,
  notes TEXT,

  -- Scoring fields (1-5 stars)
  quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 5),
  pricing_score INTEGER CHECK (pricing_score >= 1 AND pricing_score <= 5),
  variety_score INTEGER CHECK (variety_score >= 1 AND variety_score <= 5),
  location_score INTEGER CHECK (location_score >= 1 AND location_score <= 5),

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on name for faster searches
CREATE INDEX idx_bakeries_name ON bakeries(name);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before any update
CREATE TRIGGER update_bakeries_updated_at
  BEFORE UPDATE ON bakeries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE bakeries ENABLE ROW LEVEL SECURITY;

-- Since you mentioned no authentication needed, create a policy that allows all operations
-- This makes the table publicly accessible (read and write)
CREATE POLICY "Allow all operations on bakeries" ON bakeries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Insert some sample data for testing
-- Uncomment these lines if you want sample data:
/*
INSERT INTO bakeries (name, address, phone, website, notes, quality_score, pricing_score, variety_score, location_score)
VALUES
  ('Sample Bakery', '123 Main St, Albany, NY', '518-555-0100', 'https://samplebakery.com', 'Great sourdough!', 5, 4, 4, 5),
  ('Test Bakery', '456 State St, Troy, NY', '518-555-0200', 'https://testbakery.com', 'Nice croissants', 4, 3, 5, 3);
*/
