#!/usr/bin/env python3
"""
Simple image optimization script for Vantage View website
Optimizes images for web by reducing file size while maintaining quality
"""

import os
import sys
from PIL import Image
import argparse

def optimize_image(input_path, output_path=None, quality=85, max_width=1920):
    """
    Optimize an image for web use
    
    Args:
        input_path (str): Path to input image
        output_path (str): Path to output image (optional)
        quality (int): JPEG quality (1-100)
        max_width (int): Maximum width in pixels
    """
    try:
        # Open image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Resize if too large
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Set output path
            if output_path is None:
                name, ext = os.path.splitext(input_path)
                output_path = f"{name}-optimized.jpg"
            
            # Save optimized image
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            reduction = ((original_size - optimized_size) / original_size) * 100
            
            print(f"✓ Optimized: {os.path.basename(input_path)}")
            print(f"  Original: {original_size:,} bytes")
            print(f"  Optimized: {optimized_size:,} bytes")
            print(f"  Reduction: {reduction:.1f}%")
            
            return True
            
    except Exception as e:
        print(f"✗ Error optimizing {input_path}: {e}")
        return False

def optimize_directory(directory_path, quality=85, max_width=1920):
    """
    Optimize all images in a directory
    """
    image_extensions = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')
    optimized_count = 0
    
    print(f"Optimizing images in: {directory_path}")
    print(f"Quality: {quality}, Max width: {max_width}px")
    print("-" * 50)
    
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.lower().endswith(image_extensions):
                input_path = os.path.join(root, file)
                if optimize_image(input_path, quality=quality, max_width=max_width):
                    optimized_count += 1
    
    print("-" * 50)
    print(f"Optimization complete! {optimized_count} images processed.")

def main():
    parser = argparse.ArgumentParser(description='Optimize images for web')
    parser.add_argument('path', help='Path to image file or directory')
    parser.add_argument('-q', '--quality', type=int, default=85, 
                       help='JPEG quality (1-100, default: 85)')
    parser.add_argument('-w', '--max-width', type=int, default=1920,
                       help='Maximum width in pixels (default: 1920)')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.path):
        print(f"Error: Path '{args.path}' does not exist")
        sys.exit(1)
    
    if os.path.isfile(args.path):
        optimize_image(args.path, quality=args.quality, max_width=args.max_width)
    elif os.path.isdir(args.path):
        optimize_directory(args.path, quality=args.quality, max_width=args.max_width)
    else:
        print(f"Error: '{args.path}' is neither a file nor directory")
        sys.exit(1)

if __name__ == '__main__':
    main()
