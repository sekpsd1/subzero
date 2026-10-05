-- Additive catalog indexes only. Existing data and migrations are retained.
CREATE INDEX `Product_deletedAt_status_updatedAt_idx` ON `Product` (`deletedAt`, `status`, `updatedAt`);
CREATE INDEX `ProductImage_productId_sortOrder_idx` ON `ProductImage` (`productId`, `sortOrder`);
