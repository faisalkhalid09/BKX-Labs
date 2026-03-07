-- Database Initialization Script for devrezgo
-- Table structure for table `tickettypes`

CREATE TABLE IF NOT EXISTS `tickettypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `addon` int NOT NULL DEFAULT 0,
  `ticket_type` varchar(100) NOT NULL,
  `numberofdays` tinyint NOT NULL,
  `adult_markup` decimal(10,2) NOT NULL DEFAULT 0.00,
  `child_markup` decimal(10,2) NOT NULL DEFAULT 0.00,
  `ticket_name` varchar(100) NOT NULL,
  `adctive` varchar(11) NOT NULL DEFAULT 'True',
  `created_on` varchar(50) NOT NULL,
  `theme_park_id` int DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `login_ids` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for table `ticket_prices`

CREATE TABLE IF NOT EXISTS `ticket_prices` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `date` date NOT NULL,
  `park_price` float DEFAULT NULL,
  `florida_resident_price` decimal(10,2) DEFAULT NULL,
  `price` float UNSIGNED NOT NULL DEFAULT 0,
  `group_price` float DEFAULT NULL,
  `savings` int DEFAULT NULL,
  `KGS_Adult` decimal(10,2) DEFAULT '0.00',
  `KGS_Child` decimal(10,2) DEFAULT '0.00',
  `price_adult` decimal(10,2) DEFAULT '0.00',
  `price_child` decimal(10,2) DEFAULT '0.00',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_ticket_date_unique` (`ticket_id`, `date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial data for `tickettypes` (Matching Rezgo Sandbox API names found in logs)
INSERT INTO `tickettypes` (`id`, `addon`, `ticket_type`, `numberofdays`, `adult_markup`, `child_markup`, `ticket_name`, `adctive`, `created_on`, `theme_park_id`, `image`, `login_ids`) VALUES
(1, 0, 'base', 1, '20.00', '15.00', 'Universal Orlando - 1-Day Base Ticket', 'True', '1758490745', 18, 'images/ticket_attachments/41C5ABF9-2357-4201-BBC4-F77714920A7F.png', '2'),
(2, 0, 'base', 2, '30.00', '25.00', 'Universal Orlando - 2-Day Base Ticket', 'True', '1758490745', 18, 'images/ticket_attachments/no-image.png', '2'),
(3, 0, 'base', 1, '25.00', '20.00', 'Walt Disney World Resort 1 Day', 'True', '1758490745', 66, 'images/ticket_attachments/1280px-Walt_Disney_World_Resort_logo.svg.png', '2'),
(4, 0, 'base', 3, '40.00', '35.00', 'Walt Disney World Resort 3 Day', 'True', '1758490745', 66, 'images/ticket_attachments/disney-3day.png', '2');
