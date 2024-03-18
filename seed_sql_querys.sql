-- Active: 1706249936793@@127.0.0.1@3306@prisma
USE prisma;

INSERT INTO Gallery (user_id, photo)
VALUES
  (7, 'https://example.com/photo1.jpg'),
  (3, 'https://example.com/photo2.jpg'),
  (9, 'https://example.com/photo3.jpg'),
  (2, 'https://example.com/photo4.jpg'),
  (5, 'https://example.com/photo5.jpg'),
  (4, 'https://example.com/photo6.jpg'),
  (10, 'https://example.com/photo7.jpg'),
  (6, 'https://example.com/photo8.jpg'),
  (1, 'https://example.com/photo9.jpg'),
  (8, 'https://example.com/photo10.jpg');

INSERT INTO Categories (title, nr)
VALUES
  ('Electronics', 1),
  ('Clothing', 2),
  ('Home & Kitchen', 3),
  ('Books', 4),
  ('Sports & Outdoors', 5),
  ('Health & Personal Care', 6),
  ('Toys & Games', 7),
  ('Beauty', 8),
  ('Tools & Home Improvement', 9),
  ('Automotive', 10);

INSERT INTO SubCategories (category_id, title, nr)
VALUES
  -- Electronics
  (1, 'Smartphones', 1),
  (1, 'Laptops', 2),
  (1, 'Headphones', 3),
  
  -- Clothing
  (2, 'T-shirts', 1),
  (2, 'Jeans', 2),
  (2, 'Dresses', 3),
  
  -- Home & Kitchen
  (3, 'Cookware', 1),
  (3, 'Bedding', 2),
  (3, 'Home Decor', 3),
  
  -- Books
  (4, 'Fiction', 1),
  (4, 'Non-fiction', 2),
  (4, 'Self-help', 3),
  
  -- Sports & Outdoors
  (5, 'Fitness', 1),
  (5, 'Camping', 2),
  (5, 'Cycling', 3),
  
  -- Health & Personal Care
  (6, 'Skincare', 1),
  (6, 'Vitamins & Supplements', 2),
  (6, 'Personal Hygiene', 3),
  
  -- Toys & Games
  (7, 'Action Figures', 1),
  (7, 'Board Games', 2),
  (7, 'Puzzles', 3),
  
  -- Beauty
  (8, 'Makeup', 1),
  (8, 'Skincare', 2),
  (8, 'Haircare', 3),
  
  -- Tools & Home Improvement
  (9, 'Power Tools', 1),
  (9, 'Home Maintenance', 2),
  (9, 'Lighting', 3),
  
  -- Automotive
  (10, 'Car Accessories', 1),
  (10, 'Car Care', 2),
  (10, 'Motorcycle Gear', 3);

INSERT INTO Items (users_id, subCategories_id, name, description, photo_id, price, for_sale, exchange, visibility, updated_at)
VALUES
  -- First 10 items
  (3, 1, 'Smartphone', 'The latest smartphone model with high-resolution display and advanced camera.', 7, 10.99, true, false, true, NOW()),
  (9, 2, 'Laptop', 'A powerful laptop with fast processor and long-lasting battery life.', 3, 24.99, true, true, true, NOW()),
  (4, 3, 'Cookware Set', 'Complete set of high-quality cookware for all your cooking needs.', 9, 15.99, true, false, true, NOW()),
  (1, 4, 'Fiction Book', 'An engaging fiction book with thrilling plot twists and memorable characters.', 2, 29.99, true, false, true, NOW()),
  (8, 5, 'T-shirt', 'Comfortable and stylish t-shirt made from soft and breathable fabric.', 1, 12.99, true, true, true, NOW()),
  (5, 6, 'Fitness Equipment', 'Essential fitness equipment for effective workouts at home or gym.', 8, 18.99, true, false, true, NOW()),
  (7, 7, 'Action Figure', 'Collectible action figure featuring detailed design and movable parts.', 4, 22.99, true, true, true, NOW()),
  (2, 8, 'Makeup Set', 'Complete makeup set with versatile shades for creating various looks.', 5, 14.99, true, false, true, NOW()),
  (10, 9, 'Power Tool', 'High-performance power tool for efficient and precise DIY projects.', 6, 17.99, true, true, true, NOW()),
  (6, 10, 'Car Accessories', 'Essential car accessories to enhance comfort and convenience during travel.', 10, 27.99, true, false, true, NOW()),
  
  -- Next 10 items
  (1, 1, 'Smartphone', 'The latest smartphone model with high-resolution display and advanced camera.', 3, 9.99, true, false, true, NOW()),
  (2, 2, 'Laptop', 'A powerful laptop with fast processor and long-lasting battery life.', 8, 19.99, true, true, true, NOW()),
  (3, 3, 'Cookware Set', 'Complete set of high-quality cookware for all your cooking needs.', 5, 11.99, true, false, true, NOW()),
  (4, 4, 'Fiction Book', 'An engaging fiction book with thrilling plot twists and memorable characters.', 6, 16.99, true, false, true, NOW()),
  (5, 5, 'T-shirt', 'Comfortable and stylish t-shirt made from soft and breathable fabric.', 9, 14.99, true, true, true, NOW()),
  (6, 6, 'Fitness Equipment', 'Essential fitness equipment for effective workouts at home or gym.', 7, 21.99, true, false, true, NOW()),
  (7, 7, 'Action Figure', 'Collectible action figure featuring detailed design and movable parts.', 2, 23.99, true, true, true, NOW()),
  (8, 8, 'Makeup Set', 'Complete makeup set with versatile shades for creating various looks.', 10, 25.99, true, false, true, NOW()),
  (9, 9, 'Power Tool', 'High-performance power tool for efficient and precise DIY projects.', 1, 8.99, true, true, true, NOW()),
  (10, 10, 'Car Accessories', 'Essential car accessories to enhance comfort and convenience during travel.', 4, 30.99, true, false, true, NOW());


INSERT INTO `Censorship` (`string`)
VALUES
  ("blet"),
  ("bybis"),
  ("kurva"),
  ("fuck"),
  ("fucking"),
  ("faggot"),
  ("asshole"),
  ("bitch"),
  ("dick"),
  ("cock"),
  ("nahui"),
  ("pizda"),
  ("pyderas"),
  ("cunt"),
  ("pussy");
  