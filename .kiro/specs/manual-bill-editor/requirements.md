# Requirements Document - Manual Bill Editor

## Introduction

The Manual Bill Editor provides a rich, intuitive interface for users to review and correct OCR-extracted bill data. It includes real-time validation, intelligent suggestions, and seamless integration with the change tracking system.

## Glossary

- **Manual Bill Editor**: Interactive UI for editing extracted bill data
- **Field Validation**: Real-time verification of data format and business rules
- **Auto-Complete**: Intelligent suggestions based on historical data
- **Field Confidence**: Visual indicator of OCR extraction confidence (0-1)
- **Inline Editing**: Ability to edit fields directly in the bill view
- **Bulk Edit Mode**: Edit multiple bills simultaneously
- **Validation Error**: Indication that a field value violates business rules
- **Smart Suggestions**: AI-powered recommendations for field corrections
- **Keyboard Shortcuts**: Hotkeys for faster navigation and editing
- **Undo/Redo**: Ability to reverse recent edits before saving
- **Draft Mode**: Temporary save state before final submission
- **Field Locking**: Prevent editing of specific fields

## Requirements

### Requirement 1

**User Story:** As a user, I want to see extracted bill data alongside the original document, so that I can verify accuracy while editing.

#### Acceptance Criteria

1. WHEN a user opens the bill editor THEN the Manual Bill Editor SHALL display the original bill image/PDF on the left and extracted data fields on the right
2. WHEN a user clicks on a field THEN the Manual Bill Editor SHALL highlight the corresponding region in the original document
3. THE Manual Bill Editor SHALL support zooming and panning of the original document
4. WHEN the document has multiple pages THEN the Manual Bill Editor SHALL allow navigation between pages
5. THE Manual Bill Editor SHALL display confidence scores next to each field with color coding (green >0.9, yellow 0.7-0.9, red <0.7)

### Requirement 2

**User Story:** As a user, I want real-time validation as I edit fields, so that I can catch errors immediately.

#### Acceptance Criteria

1. WHEN a user modifies a field THEN the Manual Bill Editor SHALL validate the input against format rules (GSTIN regex, date format, numeric amounts)
2. WHEN validation fails THEN the Manual Bill Editor SHALL display an error message below the field without blocking further editing
3. WHEN amounts are edited THEN the Manual Bill Editor SHALL recalculate totals and validate that subtotal + taxes = grand total
4. THE Manual Bill Editor SHALL prevent saving if critical validation errors exist
5. WHEN a field is valid THEN the Manual Bill Editor SHALL display a green checkmark icon

### Requirement 3

**User Story:** As a user, I want auto-complete suggestions for vendor names and GSTINs, so that I can enter data faster and more accurately.

#### Acceptance Criteria

1. WHEN a user types in the vendor name field THEN the Manual Bill Editor SHALL suggest matching vendors from historical data
2. WHEN a vendor is selected from suggestions THEN the Manual Bill Editor SHALL auto-fill the vendor GSTIN if available
3. THE Manual Bill Editor SHALL provide auto-complete for frequently used values in custom fields
4. WHEN suggestions are displayed THEN the Manual Bill Editor SHALL show the most recently used values first
5. THE Manual Bill Editor SHALL limit suggestions to the user's organization data for privacy

### Requirement 4

**User Story:** As a user, I want keyboard shortcuts for common actions, so that I can edit bills efficiently without using the mouse.

#### Acceptance Criteria

1. THE Manual Bill Editor SHALL support Tab/Shift+Tab for navigating between fields
2. THE Manual Bill Editor SHALL support Ctrl+S (Cmd+S on Mac) for saving changes
3. THE Manual Bill Editor SHALL support Ctrl+Z/Ctrl+Y for undo/redo
4. THE Manual Bill Editor SHALL support Escape to cancel editing and revert to last saved state
5. THE Manual Bill Editor SHALL display a keyboard shortcuts help panel accessible via Ctrl+/
6. WHEN a user presses Enter in a single-line field THEN the Manual Bill Editor SHALL move focus to the next field

### Requirement 5

**User Story:** As a user, I want to add and remove line items, so that I can correct OCR errors in itemized bills.

#### Acceptance Criteria

1. WHEN a user clicks "Add Line Item" THEN the Manual Bill Editor SHALL insert a new empty row in the line items table
2. WHEN a user clicks "Delete" on a line item THEN the Manual Bill Editor SHALL remove the row and recalculate totals
3. WHEN line items are modified THEN the Manual Bill Editor SHALL automatically recalculate the subtotal
4. THE Manual Bill Editor SHALL support drag-and-drop reordering of line items
5. WHEN a line item is added or removed THEN the Manual Bill Editor SHALL update the item count

### Requirement 6

**User Story:** As a user, I want to save drafts while editing, so that I don't lose my work if I need to leave the page.

#### Acceptance Criteria

1. WHEN a user makes changes THEN the Manual Bill Editor SHALL auto-save a draft every 30 seconds
2. WHEN a user returns to an unsaved bill THEN the Manual Bill Editor SHALL restore the draft and prompt to continue editing
3. THE Manual Bill Editor SHALL display a "Draft saved" indicator with timestamp after each auto-save
4. WHEN a user explicitly saves THEN the Manual Bill Editor SHALL clear the draft and mark the bill as updated
5. THE Manual Bill Editor SHALL store drafts in browser localStorage for offline resilience

### Requirement 7

**User Story:** As a CA user, I want to lock specific fields to prevent accidental changes, so that I can protect verified data.

#### Acceptance Criteria

1. WHEN a CA or Admin user clicks a lock icon on a field THEN the Manual Bill Editor SHALL lock the field and prevent editing
2. WHEN a field is locked THEN the Manual Bill Editor SHALL display a lock icon and gray out the field
3. THE Manual Bill Editor SHALL allow only CA and Admin users to lock/unlock fields
4. WHEN a locked field is clicked THEN the Manual Bill Editor SHALL display a tooltip explaining the field is locked
5. THE Manual Bill Editor SHALL persist field lock status in the bill record

### Requirement 8

**User Story:** As a user, I want intelligent suggestions for correcting common OCR errors, so that I can fix mistakes quickly.

#### Acceptance Criteria

1. WHEN OCR confidence is low (<0.7) THEN the Manual Bill Editor SHALL analyze the field and suggest likely corrections
2. WHEN a GSTIN format is invalid THEN the Manual Bill Editor SHALL suggest the closest valid GSTIN from historical data
3. WHEN an amount doesn't match calculated totals THEN the Manual Bill Editor SHALL suggest the correct amount
4. THE Manual Bill Editor SHALL display suggestions as clickable chips below the field
5. WHEN a user clicks a suggestion THEN the Manual Bill Editor SHALL apply the value and mark the field as manually verified

### Requirement 9

**User Story:** As a user, I want to edit multiple bills in bulk, so that I can apply the same correction to many bills efficiently.

#### Acceptance Criteria

1. WHEN a user selects multiple bills THEN the Manual Bill Editor SHALL open a bulk edit mode
2. WHEN in bulk edit mode THEN the Manual Bill Editor SHALL allow editing common fields (vendor name, GSTIN, tax rates)
3. WHEN a field is edited in bulk mode THEN the Manual Bill Editor SHALL apply the change to all selected bills
4. THE Manual Bill Editor SHALL display a preview showing which bills will be affected before applying changes
5. WHEN bulk edits are saved THEN the Manual Bill Editor SHALL create change events for each modified bill

### Requirement 10

**User Story:** As a user, I want to see validation warnings for unusual values, so that I can catch potential errors.

#### Acceptance Criteria

1. WHEN an amount is significantly different from historical averages for the vendor THEN the Manual Bill Editor SHALL display a warning
2. WHEN an invoice date is more than 90 days in the past THEN the Manual Bill Editor SHALL warn the user
3. WHEN a GSTIN is used for the first time THEN the Manual Bill Editor SHALL prompt the user to verify it
4. THE Manual Bill Editor SHALL allow users to acknowledge warnings and proceed with saving
5. WHEN a warning is acknowledged THEN the Manual Bill Editor SHALL record the acknowledgment in the change log

### Requirement 11

**User Story:** As a user, I want to copy data from one bill to another, so that I can quickly create similar bills.

#### Acceptance Criteria

1. WHEN a user clicks "Copy from another bill" THEN the Manual Bill Editor SHALL display a searchable list of recent bills
2. WHEN a source bill is selected THEN the Manual Bill Editor SHALL allow choosing which fields to copy
3. WHEN fields are copied THEN the Manual Bill Editor SHALL preserve the original bill's data and mark copied fields as manually entered
4. THE Manual Bill Editor SHALL not copy unique fields like invoice number and invoice date
5. WHEN data is copied THEN the Manual Bill Editor SHALL record the source bill ID in the change log

### Requirement 12

**User Story:** As a developer, I want the editor to be responsive and performant, so that users have a smooth editing experience.

#### Acceptance Criteria

1. THE Manual Bill Editor SHALL load and display a bill within 2 seconds
2. WHEN a user types in a field THEN the Manual Bill Editor SHALL respond within 100 milliseconds
3. THE Manual Bill Editor SHALL support editing bills with up to 100 line items without performance degradation
4. WHEN validation runs THEN the Manual Bill Editor SHALL complete checks within 200 milliseconds
5. THE Manual Bill Editor SHALL lazy-load the original document image to improve initial load time
