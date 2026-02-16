import cv2
import numpy as np
from typing import List, Dict, Tuple

class LayoutDetector:
    """Detect layout and structure of invoice documents"""
    
    def __init__(self):
        self.min_contour_area = 100
    
    def detect_layout(self, image_path: str) -> Dict:
        """Detect document layout"""
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Failed to read image")
        
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Detect regions
        text_regions = self._detect_text_regions(gray)
        table_regions = self._detect_tables(gray)
        logo_regions = self._detect_logos(gray)
        
        return {
            "text_regions": text_regions,
            "table_regions": table_regions,
            "logo_regions": logo_regions,
            "layout_type": self._classify_layout(text_regions, table_regions)
        }
    
    def _detect_text_regions(self, gray_image: np.ndarray) -> List[Dict]:
        """Detect text regions in image"""
        # Apply threshold
        _, binary = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        
        # Find contours
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        regions = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > self.min_contour_area:
                x, y, w, h = cv2.boundingRect(contour)
                regions.append({
                    "x": int(x),
                    "y": int(y),
                    "width": int(w),
                    "height": int(h),
                    "area": int(area)
                })
        
        return regions
    
    def _detect_tables(self, gray_image: np.ndarray) -> List[Dict]:
        """Detect table structures"""
        # Detect horizontal and vertical lines
        horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 1))
        vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 40))
        
        # Detect horizontal lines
        horizontal = cv2.morphologyEx(gray_image, cv2.MORPH_OPEN, horizontal_kernel)
        
        # Detect vertical lines
        vertical = cv2.morphologyEx(gray_image, cv2.MORPH_OPEN, vertical_kernel)
        
        # Combine
        table_mask = cv2.add(horizontal, vertical)
        
        # Find table contours
        contours, _ = cv2.findContours(table_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        tables = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 1000:  # Minimum table size
                x, y, w, h = cv2.boundingRect(contour)
                tables.append({
                    "x": int(x),
                    "y": int(y),
                    "width": int(w),
                    "height": int(h)
                })
        
        return tables
    
    def _detect_logos(self, gray_image: np.ndarray) -> List[Dict]:
        """Detect logo regions (usually top of document)"""
        height, width = gray_image.shape
        
        # Focus on top 20% of document
        top_region = gray_image[0:int(height * 0.2), :]
        
        # Find high-contrast regions
        _, binary = cv2.threshold(top_region, 200, 255, cv2.THRESH_BINARY)
        
        contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        logos = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if 500 < area < 10000:  # Logo size range
                x, y, w, h = cv2.boundingRect(contour)
                logos.append({
                    "x": int(x),
                    "y": int(y),
                    "width": int(w),
                    "height": int(h)
                })
        
        return logos
    
    def _classify_layout(self, text_regions: List, table_regions: List) -> str:
        """Classify document layout type"""
        if len(table_regions) > 0:
            return "structured_with_table"
        elif len(text_regions) > 10:
            return "text_heavy"
        else:
            return "simple"
