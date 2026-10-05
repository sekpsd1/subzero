-- Preserve legacy balances and movements; nullable metadata remains unknown for legacy rows.
ALTER TABLE StockMovement
 ADD COLUMN actorId VARCHAR(191) NULL,
 ADD COLUMN actorName VARCHAR(191) NULL,
 ADD COLUMN operation VARCHAR(191) NULL,
 ADD COLUMN quantityBefore INTEGER NULL,
 ADD COLUMN reservedBefore INTEGER NULL,
 ADD COLUMN quantityAfter INTEGER NULL,
 ADD COLUMN reservedAfter INTEGER NULL,
 ADD COLUMN idempotencyKey VARCHAR(64) NULL,
 ADD COLUMN requestHash VARCHAR(64) NULL,
 ADD COLUMN compensationForId VARCHAR(191) NULL;
CREATE UNIQUE INDEX StockMovement_idempotencyKey_key ON StockMovement(idempotencyKey);
CREATE INDEX StockMovement_productId_createdAt_id_idx ON StockMovement(productId, createdAt, id);
-- Fail safely if legacy balances violate constraints; never repair/reset existing stock automatically.
ALTER TABLE Inventory ADD CONSTRAINT Inventory_balance_check CHECK (quantity >= 0 AND reserved >= 0 AND reserved <= quantity);
-- Ledger is append-only even for direct SQL writes. Corrections must append compensating movements.
CREATE TRIGGER StockMovement_no_update BEFORE UPDATE ON StockMovement FOR EACH ROW SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock history is append-only';
CREATE TRIGGER StockMovement_no_delete BEFORE DELETE ON StockMovement FOR EACH ROW SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock history is append-only';
