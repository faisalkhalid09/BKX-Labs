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

-- Initial data for `tickettypes` (Sample from dzm_coataa.sql)
INSERT INTO `tickettypes` (`id`, `addon`, `ticket_type`, `numberofdays`, `adult_markup`, `child_markup`, `ticket_name`, `adctive`, `created_on`, `theme_park_id`, `image`, `login_ids`) VALUES
(2, 0, 'base', 1, '120.00', '120.00', 'US-1 DAY BASE', 'False', '1758490745', 18, 'images/ticket_attachments/41C5ABF9-2357-4201-BBC4-F77714920A7F.png', '2,7,20'),
(30, 0, 'base', 1, '65.00', '65.00', 'Volcano Bay', 'False', '1691355245', 58, 'images/ticket_attachments/F746E2CA-D4EC-47E2-8BD8-9B34FF0E995C.png', '2,7,20,22'),
(49, 0, 'base', 1, '45.00', '45.00', 'Aquatica', 'False', '1689806220', 60, 'images/ticket_attachments/aq-logo-big.png', '2,7,20,22'),
(48, 0, 'base', 1, '75.00', '75.00', 'Busch Gardens Tampa', 'True', '1759478242', 59, 'images/ticket_attachments/Busch_Gardens.png', '2,7,20,22'),
(44, 0, 'base', 1, '120.00', '120.00', 'IOA-1 DAY BASE', 'False', '1759477959', 57, 'images/ticket_attachments/islands.png', '2,7,20'),
(37, 0, 'base', 1, '60.00', '60.00', 'SeaWorld Orlando', 'True', '1689806521', 54, 'images/ticket_attachments/sw.png', '2,7,20,22'),
(52, 0, 'ptp', 1, '150.00', '150.00', 'US-1 DAY PTP', 'True', '1762119719', 18, 'images/ticket_attachments/STUDIOS THEN ISLANDS.png', '2,7,20'),
(55, 0, 'ptp', 1, '150.00', '150.00', 'IOA-1 DAY PTP', 'False', '1759478007', 57, 'images/ticket_attachments/ISLANDS THEN STUDIOS.png', '2,7,20'),
(69, 1, 'upgrade', 1, '100.00', '100.00', 'SeaWorld Orlando QQ', 'True', '1771617679', 54, 'images/ticket_attachments/63E25C32-144A-4557-A2BD-93A6C8772D0F.jpeg', '2,7,20,22'),
(72, 0, 'base', 1, '40.00', '40.00', 'SeaWorld San Antonio', 'False', '1759478308', 66, 'images/ticket_attachments/312D0490-D13F-47FE-BBDB-0633D2ED4ABE.png', '2'),
(75, 0, 'upgrade', 1, '100.00', '100.00', 'Cedar Point Fastlane Plus', 'True', '1771617609', 53, 'images/ticket_attachments/CedarPoint-FrontLinePass.png', '2'),
(80, 0, 'upgrade', 1, '50.00', '50.00', 'Busch Gardens Tampa QQ', 'True', '1771617527', 59, 'images/ticket_attachments/IMG_0162.jpeg', ''),
(82, 0, 'upgrade', 1, '80.00', '80.00', 'Kings Island VIP', 'True', '1771617662', 52, 'images/ticket_attachments/KingsIsland-FrontLinePass.png', '2');
