-- 1. Table tickettypes
-- Rename Adult Price to Adult_Markup and Child Price to Child_Markup
ALTER TABLE `tickettypes` CHANGE `adult_price` `adult_markup` DECIMAL(10,2);
ALTER TABLE `tickettypes` CHANGE `child_price` `child_markup` DECIMAL(10,2);

-- Drop Slaes Manager Discount and Slaes Person Discount
ALTER TABLE `tickettypes` DROP COLUMN `sales_manager_discount`;
ALTER TABLE `tickettypes` DROP COLUMN `sales_person_discount`;

-- 2. Table ticket_prices
-- Add columns KGS_Adult, KGS_Child, price_adult, and price_child
ALTER TABLE `ticket_prices` ADD COLUMN `KGS_Adult` DECIMAL(10,2) DEFAULT '0.00';
ALTER TABLE `ticket_prices` ADD COLUMN `KGS_Child` DECIMAL(10,2) DEFAULT '0.00';
ALTER TABLE `ticket_prices` ADD COLUMN `price_adult` DECIMAL(10,2) DEFAULT '0.00';
ALTER TABLE `ticket_prices` ADD COLUMN `price_child` DECIMAL(10,2) DEFAULT '0.00';

-- Constraint: Ensure a UNIQUE index exists on (ticket_id, date) to prevent duplicates.
-- Note: the original table structure refers to the ticket id as `ticket_id` not `tickettype_id`.
ALTER TABLE `ticket_prices` ADD UNIQUE INDEX `idx_ticket_date_unique` (`ticket_id`, `date`);
