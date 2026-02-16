import re
from typing import Optional, Dict

def validate_gstin(gstin: str) -> bool:
    """Validate GSTIN format"""
    if not gstin or len(gstin) != 15:
        return False
    
    # GSTIN format: 2 digits (state) + 10 chars (PAN) + 1 char (entity) + 1 char (Z) + 1 char (checksum)
    pattern = r'^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$'
    
    return bool(re.match(pattern, gstin))

def extract_state_from_gstin(gstin: str) -> Optional[str]:
    """Extract state code from GSTIN"""
    if not validate_gstin(gstin):
        return None
    
    state_codes = {
        "01": "Jammu and Kashmir",
        "02": "Himachal Pradesh",
        "03": "Punjab",
        "04": "Chandigarh",
        "05": "Uttarakhand",
        "06": "Haryana",
        "07": "Delhi",
        "08": "Rajasthan",
        "09": "Uttar Pradesh",
        "10": "Bihar",
        "11": "Sikkim",
        "12": "Arunachal Pradesh",
        "13": "Nagaland",
        "14": "Manipur",
        "15": "Mizoram",
        "16": "Tripura",
        "17": "Meghalaya",
        "18": "Assam",
        "19": "West Bengal",
        "20": "Jharkhand",
        "21": "Odisha",
        "22": "Chhattisgarh",
        "23": "Madhya Pradesh",
        "24": "Gujarat",
        "25": "Daman and Diu",
        "26": "Dadra and Nagar Haveli",
        "27": "Maharashtra",
        "28": "Andhra Pradesh",
        "29": "Karnataka",
        "30": "Goa",
        "31": "Lakshadweep",
        "32": "Kerala",
        "33": "Tamil Nadu",
        "34": "Puducherry",
        "35": "Andaman and Nicobar Islands",
        "36": "Telangana",
        "37": "Andhra Pradesh (New)",
    }
    
    state_code = gstin[:2]
    return state_codes.get(state_code)

def is_interstate_supply(seller_gstin: str, buyer_gstin: str) -> bool:
    """Check if supply is interstate"""
    if not validate_gstin(seller_gstin) or not validate_gstin(buyer_gstin):
        return False
    
    return seller_gstin[:2] != buyer_gstin[:2]

def calculate_gst_breakdown(amount: float, gst_rate: float, is_interstate: bool) -> Dict:
    """Calculate GST breakdown"""
    taxable_value = amount / (1 + gst_rate / 100)
    total_gst = amount - taxable_value
    
    if is_interstate:
        return {
            "taxable_value": round(taxable_value, 2),
            "cgst": 0,
            "sgst": 0,
            "igst": round(total_gst, 2),
            "total": round(amount, 2)
        }
    else:
        cgst = total_gst / 2
        sgst = total_gst / 2
        return {
            "taxable_value": round(taxable_value, 2),
            "cgst": round(cgst, 2),
            "sgst": round(sgst, 2),
            "igst": 0,
            "total": round(amount, 2)
        }
