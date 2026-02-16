import cv2
import numpy as np
from typing import List, Dict

class TableExtractor:
    """Extract tables from invoice images"""
    
    def extract_table(self, image_path: str, table_bbox: Dict) -> List[List[str]]:
        """Extract table data from image"""
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Failed to read image")
        
        # Crop table region
        x, y, w, h = table_bbox["x"], table_bbox["y"], table_bbox["width"], table_bbox["height"]
        table_img = image[y:y+h, x:x+w]
        
        # Detect rows and columns
        rows = self._detect_rows(table_img)
        cols = self._detect_columns(table_img)
        
        # Extract cells
        cells = self._extract_cells(table_img, rows, cols)
        
        return cells
    
    def _detect_rows(self, table_img: np.ndarray) -> List[int]:
        """Detect table rows"""
        gray = cv2.cvtColor(table_img, cv2.COLOR_BGR2GRAY)
        
        # Detect horizontal lines
        horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 1))
        horizontal_lines = cv2.morphologyEx(gray, cv2.MORPH_OPEN, horizontal_kernel)
        
        # Find row positions
        row_positions = []
        for i in range(horizontal_lines.shape[0]):
            if np.sum(horizontal_lines[i, :]) > horizontal_lines.shape[1] * 100:
                row_positions.append(i)
        
        return row_positions
    
    def _detect_columns(self, table_img: np.ndarray) -> List[int]:
        """Detect table columns"""
        gray = cv2.cvtColor(table_img, cv2.COLOR_BGR2GRAY)
        
        # Detect vertical lines
        vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 40))
        vertical_lines = cv2.morphologyEx(gray, cv2.MORPH_OPEN, vertical_kernel)
        
        # Find column positions
        col_positions = []
        for i in range(vertical_lines.shape[1]):
            if np.sum(vertical_lines[:, i]) > vertical_lines.shape[0] * 100:
                col_positions.append(i)
        
        return col_positions
    
    def _extract_cells(self, table_img: np.ndarray, rows: List[int], cols: List[int]) -> List[List[str]]:
        """Extract cell contents"""
        cells = []
        
        for i in range(len(rows) - 1):
            row_cells = []
            for j in range(len(cols) - 1):
                # Extract cell region
                cell_img = table_img[rows[i]:rows[i+1], cols[j]:cols[j+1]]
                
                # OCR would be applied here
                # For now, return placeholder
                row_cells.append("")
            
            cells.append(row_cells)
        
        return cells
