# Requirements Document - Bill Processing Pipeline

## Introduction

The Bill Processing Pipeline automates the end-to-end workflow of converting uploaded bill documents (PDF/images) into structured, validated JSON data. The pipeline includes OCR extraction, template detection, data parsing, validation, and storage, enabling automated GST compliance and reducing manual data entry for CA firms.

## Glossary

- **Bill Processing Pipeline**: The automated workflow that processes uploaded bills from raw files to structured data
- **OCR (Optical Character Recognition)**: Technology that extracts text and coordinates from images and PDFs
- **Template Detection**: AI-powered identification of bill format, layout, and vendor
- **Template**: A predefined structure that maps bill layouts to data fields
- **JSON Output**: Structured data format containing extracted bill information
- **Processing Status**: Current state of a bill (uploaded, processing, processed, failed)
- **Confidence Score**: Numerical measure (0-1) of OCR extraction accuracy
- **Field Extraction**: Process of identifying and extracting specific data fields from OCR text
- **Validation**: Verification that extracted data meets business rules and GST requirements
- **Bill Metadata**: Information about the bill file (size, type, upload time, user)
- **Processing Queue**: Asynchronous job queue for handling bill processing tasks
- **Retry Logic**: Automatic re-processing of failed bills with exponential backoff
- **Page Size Detection**: Identification of document dimensions (A4, Letter, custom)
- **Bill Type**: Category of bill (invoice, receipt, credit note, debit note)
- **Vendor**: The business entity that issued the bill
- **Line Items**: Individual products or services listed on the bill

## Requirements

### Requirement 1

**User Story:** As a client user, I want to upload bill documents in various formats, so that I can process invoices regardless of how I receive them from vendors.

#### Acceptance Criteria

1. WHEN a user uploads a file THEN the Bill Processing Pipeline SHALL accept PDF, JPEG, PNG, and TIFF formats
2. WHEN a file is uploaded THEN the Bill Processing Pipeline SHALL validate the file size does not exceed 10 MB
3. WHEN a file is uploaded THEN the Bill Processing Pipeline SHALL validate the file is not corrupted or empty
4. WHEN a valid file is uploaded THEN the Bill Processing Pipeline SHALL store the file in S3 with a unique identifier
5. WHEN a file is uploaded THEN the Bill Processing Pipeline SHALL create a bill record in MongoDB with status "uploaded"
6. WHEN an invalid file is uploaded THEN the Bill Processing Pipeline SHALL reject the upload and return a descriptive error message
7. THE Bill Processing Pipeline SHALL support multi-page PDF documents with up to 20 pages

### Requirement 2

**User Story:** As a system, I want to automatically trigger OCR processing when a bill is uploaded, so that data extraction begins immediately without manual intervention.

#### Acceptance Criteria

1. WHEN a bill record is created with status "uploaded" THEN the Bill Processing Pipeline SHALL add the bill to the processing queue within 5 seconds
2. WHEN a bill is added to the processing queue THEN the Bill Processing Pipeline SHALL update the bill status to "processing"
3. WHEN the processing queue is full THEN the Bill Processing Pipeline SHALL queue additional bills and process them in FIFO order
4. THE Bill Processing Pipeline SHALL process bills asynchronously without blocking the upload API response
5. WHEN a bill is queued THEN the Bill Processing Pipeline SHALL return a job ID to the client for status tracking

### Requirement 3

**User Story:** As a system, I want to extract text and coordinates from bill images using OCR, so that I can identify and parse data fields accurately.

#### Acceptance Criteria

1. WHEN a bill enters OCR processing THEN the Bill Processing Pipeline SHALL use PaddleOCR to extract text and bounding box coordinates
2. WHEN OCR processing completes THEN the Bill Processing Pipeline SHALL store the raw OCR output with confidence scores for each text block
3. WHEN OCR confidence is below 0.7 for critical fields THEN the Bill Processing Pipeline SHALL flag the bill for manual review
4. THE Bill Processing Pipeline SHALL extract text in English and Hindi languages
5. WHEN OCR processing fails THEN the Bill Processing Pipeline SHALL retry up to 3 times with exponential backoff (5s, 15s, 45s)
6. WHEN all OCR retries fail THEN the Bill Processing Pipeline SHALL update bill status to "failed" and log the error

### Requirement 4

**User Story:** As a system, I want to detect the bill template automatically, so that I can apply the correct field extraction rules.

#### Acceptance Criteria

1. WHEN OCR extraction completes THEN the Bill Processing Pipeline SHALL analyze the layout to detect page size (A4, Letter, custom)
2. WHEN page size is detected THEN the Bill Processing Pipeline SHALL identify bill type (invoice, receipt, credit note, debit note)
3. WHEN bill type is identified THEN the Bill Processing Pipeline SHALL search for matching templates based on vendor name, layout, and keywords
4. WHEN a matching template is found THEN the Bill Processing Pipeline SHALL use the template for field extraction
5. WHEN no matching template is found THEN the Bill Processing Pipeline SHALL use generic extraction rules and flag for template creation
6. THE Bill Processing Pipeline SHALL store the detected template ID in the bill record

### Requirement 5

**User Story:** As a system, I want to extract structured data fields from bills, so that I can generate accurate GST reports.

#### Acceptance Criteria

1. WHEN a template is selected THEN the Bill Processing Pipeline SHALL extract invoice number, invoice date, vendor name, and vendor GSTIN
2. WHEN extracting amounts THEN the Bill Processing Pipeline SHALL identify subtotal, CGST, SGST, IGST, and grand total
3. WHEN extracting line items THEN the Bill Processing Pipeline SHALL parse item description, quantity, rate, and amount for each line
4. WHEN extraction completes THEN the Bill Processing Pipeline SHALL store extracted data in JSON format in the bill record
5. THE Bill Processing Pipeline SHALL calculate confidence scores for each extracted field based on OCR confidence and validation rules
6. WHEN a required field cannot be extracted THEN the Bill Processing Pipeline SHALL set the field value to null and flag for manual entry

### Requirement 6

**User Story:** As a system, I want to validate extracted data against GST rules, so that I can ensure compliance and detect errors early.

#### Acceptance Criteria

1. WHEN data extraction completes THEN the Bill Processing Pipeline SHALL validate GSTIN format using regex pattern
2. WHEN amounts are extracted THEN the Bill Processing Pipeline SHALL verify that subtotal + taxes = grand total within 1 rupee tolerance
3. WHEN tax amounts are extracted THEN the Bill Processing Pipeline SHALL validate CGST + SGST rates match standard GST rates (2.5%, 6%, 9%, 14%)
4. WHEN IGST is present THEN the Bill Processing Pipeline SHALL verify CGST and SGST are zero (interstate transaction)
5. WHEN validation fails THEN the Bill Processing Pipeline SHALL store validation errors in the bill record and flag for review
6. THE Bill Processing Pipeline SHALL check that invoice date is not in the future

### Requirement 7

**User Story:** As a system, I want to update bill processing status in real-time, so that users can track progress and know when processing is complete.

#### Acceptance Criteria

1. WHEN processing status changes THEN the Bill Processing Pipeline SHALL update the bill record in MongoDB immediately
2. WHEN processing completes successfully THEN the Bill Processing Pipeline SHALL set status to "processed" and record the processed_at timestamp
3. WHEN processing fails THEN the Bill Processing Pipeline SHALL set status to "failed" and store the error message
4. THE Bill Processing Pipeline SHALL emit status change events that can be consumed by WebSocket or polling endpoints
5. WHEN a user queries bill status THEN the Bill Processing Pipeline SHALL return current status, progress percentage, and estimated completion time

### Requirement 8

**User Story:** As a user, I want to view extracted bill data immediately after processing, so that I can verify accuracy and make corrections if needed.

#### Acceptance Criteria

1. WHEN a bill status is "processed" THEN the Bill Processing Pipeline SHALL make the extracted JSON data available via API
2. WHEN extracted data is retrieved THEN the Bill Processing Pipeline SHALL include confidence scores for each field
3. WHEN validation errors exist THEN the Bill Processing Pipeline SHALL include error details in the API response
4. THE Bill Processing Pipeline SHALL return extracted data in a standardized JSON schema regardless of template used
5. WHEN a user requests bill data THEN the Bill Processing Pipeline SHALL enforce RBAC permissions based on user role and organization

### Requirement 9

**User Story:** As a system administrator, I want to monitor pipeline performance and errors, so that I can optimize processing and troubleshoot issues.

#### Acceptance Criteria

1. THE Bill Processing Pipeline SHALL log processing time for each stage (upload, OCR, template detection, extraction, validation)
2. WHEN processing completes THEN the Bill Processing Pipeline SHALL record total processing time in the bill record
3. THE Bill Processing Pipeline SHALL maintain metrics for success rate, average processing time, and error rate
4. WHEN errors occur THEN the Bill Processing Pipeline SHALL log detailed error information including stack traces
5. THE Bill Processing Pipeline SHALL expose metrics via a monitoring endpoint for integration with observability tools

### Requirement 10

**User Story:** As a CA user, I want to reprocess failed bills, so that I can retry processing after fixing issues or updating templates.

#### Acceptance Criteria

1. WHEN a CA or Admin user requests reprocessing THEN the Bill Processing Pipeline SHALL reset the bill status to "uploaded"
2. WHEN reprocessing is triggered THEN the Bill Processing Pipeline SHALL add the bill back to the processing queue
3. WHEN reprocessing THEN the Bill Processing Pipeline SHALL preserve the original file and metadata
4. THE Bill Processing Pipeline SHALL allow manual template selection for reprocessing
5. WHEN reprocessing completes THEN the Bill Processing Pipeline SHALL update the bill record with new extracted data and increment a reprocess counter

### Requirement 11

**User Story:** As a system, I want to handle multi-page bills correctly, so that I can extract data from complex invoices with multiple pages.

#### Acceptance Criteria

1. WHEN a multi-page PDF is uploaded THEN the Bill Processing Pipeline SHALL process each page separately
2. WHEN processing multiple pages THEN the Bill Processing Pipeline SHALL detect which page contains the main invoice data
3. WHEN line items span multiple pages THEN the Bill Processing Pipeline SHALL aggregate line items from all pages
4. THE Bill Processing Pipeline SHALL store page-level OCR results for each page
5. WHEN multi-page processing completes THEN the Bill Processing Pipeline SHALL merge data from all pages into a single JSON output

### Requirement 12

**User Story:** As a developer, I want the pipeline to be extensible, so that I can add new processing steps or integrate additional AI models.

#### Acceptance Criteria

1. THE Bill Processing Pipeline SHALL implement a plugin architecture that allows adding custom processing steps
2. WHEN a custom processing step is registered THEN the Bill Processing Pipeline SHALL execute it in the configured order
3. THE Bill Processing Pipeline SHALL provide hooks for pre-processing and post-processing stages
4. WHEN a plugin fails THEN the Bill Processing Pipeline SHALL continue processing and log the plugin error
5. THE Bill Processing Pipeline SHALL allow configuration of processing steps via environment variables or config files
