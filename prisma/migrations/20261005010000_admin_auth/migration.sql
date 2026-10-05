-- Additive only; initial migration is unchanged.
CREATE TABLE `AdminSession` (
  `tokenHash` VARCHAR(64) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `expiresAt` DATETIME(3) NOT NULL,
  `revokedAt` DATETIME(3) NULL,
  PRIMARY KEY (`tokenHash`),
  INDEX `AdminSession_userId_idx` (`userId`),
  INDEX `AdminSession_expiresAt_idx` (`expiresAt`),
  CONSTRAINT `AdminSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE TABLE `AuthRateLimit` (
  `key` VARCHAR(64) NOT NULL,
  `attempts` INTEGER NOT NULL DEFAULT 0,
  `expiresAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`key`),
  INDEX `AuthRateLimit_expiresAt_idx` (`expiresAt`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
