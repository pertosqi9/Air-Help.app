/*
  # Add Service Categories and Subcategories

  1. New Categories
    Adds a comprehensive set of professional service categories with:
    - Main category name
    - Description
    - Icon (using emoji as placeholder)
    - Slug for URL-friendly names
    
  2. Hierarchy
    - Categories can have parent-child relationships
    - Each category can have multiple subcategories
    - Maximum depth of 2 levels (main category -> subcategory)

  3. Changes
    - Inserts new categories into the existing categories table
    - Maintains existing table structure and relationships
*/

-- Health & Wellness
INSERT INTO categories (name, slug, description, icon) VALUES
('Health & Wellness', 'health-wellness', 'Services focused on physical and mental wellbeing', '🏥');

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Personal Training', 'personal-training', 'Customized fitness programs and coaching', id, '💪'
FROM categories WHERE slug = 'health-wellness';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Nutrition Consulting', 'nutrition-consulting', 'Diet planning and nutritional guidance', id, '🥗'
FROM categories WHERE slug = 'health-wellness';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Mental Health', 'mental-health', 'Counseling and psychological support services', id, '🧠'
FROM categories WHERE slug = 'health-wellness';

-- Home Services
INSERT INTO categories (name, slug, description, icon) VALUES
('Home Services', 'home-services', 'Professional services for home maintenance and improvement', '🏠');

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Home Cleaning', 'home-cleaning', 'Regular and deep cleaning services', id, '🧹'
FROM categories WHERE slug = 'home-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Home Repairs', 'home-repairs', 'General repairs and maintenance', id, '🔧'
FROM categories WHERE slug = 'home-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Interior Design', 'interior-design', 'Home decoration and space planning', id, '🎨'
FROM categories WHERE slug = 'home-services';

-- Education & Training
INSERT INTO categories (name, slug, description, icon) VALUES
('Education & Training', 'education-training', 'Learning and skill development services', '📚');

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Academic Tutoring', 'academic-tutoring', 'Subject-specific educational support', id, '✏️'
FROM categories WHERE slug = 'education-training';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Language Learning', 'language-learning', 'Language instruction and practice', id, '🗣️'
FROM categories WHERE slug = 'education-training';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Professional Skills', 'professional-skills', 'Business and career development training', id, '💼'
FROM categories WHERE slug = 'education-training';

-- Technology Services
INSERT INTO categories (name, slug, description, icon) VALUES
('Technology Services', 'technology-services', 'Digital and technical support services', '💻');

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Web Development', 'web-development', 'Website creation and maintenance', id, '🌐'
FROM categories WHERE slug = 'technology-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'IT Support', 'it-support', 'Technical troubleshooting and assistance', id, '🔧'
FROM categories WHERE slug = 'technology-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Digital Marketing', 'digital-marketing', 'Online marketing and social media services', id, '📱'
FROM categories WHERE slug = 'technology-services';

-- Creative Services
INSERT INTO categories (name, slug, description, icon) VALUES
('Creative Services', 'creative-services', 'Artistic and creative professional services', '🎨');

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Graphic Design', 'graphic-design', 'Visual design and branding', id, '✒️'
FROM categories WHERE slug = 'creative-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Photography', 'photography', 'Professional photo shoots and editing', id, '📸'
FROM categories WHERE slug = 'creative-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Video Production', 'video-production', 'Video creation and editing services', id, '🎥'
FROM categories WHERE slug = 'creative-services';

-- Business Services
INSERT INTO categories (name, slug, description, icon) VALUES
('Business Services', 'business-services', 'Professional business support services', '💼');

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Consulting', 'consulting', 'Business strategy and advisory services', id, '📊'
FROM categories WHERE slug = 'business-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Accounting', 'accounting', 'Financial management and bookkeeping', id, '📈'
FROM categories WHERE slug = 'business-services';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Legal Services', 'legal-services', 'Legal consultation and documentation', id, '⚖️'
FROM categories WHERE slug = 'business-services';

-- Events & Entertainment
INSERT INTO categories (name, slug, description, icon) VALUES
('Events & Entertainment', 'events-entertainment', 'Services for events and entertainment', '🎉');

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Event Planning', 'event-planning', 'Event organization and coordination', id, '📋'
FROM categories WHERE slug = 'events-entertainment';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Music & Performance', 'music-performance', 'Live entertainment services', id, '🎵'
FROM categories WHERE slug = 'events-entertainment';

INSERT INTO categories (name, slug, description, parent_id, icon)
SELECT 'Catering', 'catering', 'Food and beverage services for events', id, '🍽️'
FROM categories WHERE slug = 'events-entertainment';