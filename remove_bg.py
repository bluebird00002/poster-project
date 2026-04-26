import os
from PIL import Image

customer_dir = r"d:\projects\poster-project\src\assets\customers"

for filename in os.listdir(customer_dir):
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        filepath = os.path.join(customer_dir, filename)
        try:
            img = Image.open(filepath).convert("RGBA")
            data = img.getdata()
            new_data = []
            
            # Simple thresholding for "white"
            threshold = 240
            for item in data:
                # If pixel is close to white (R, G, B all > threshold)
                if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                    # Make it completely transparent
                    new_data.append((255, 255, 255, 0))
                else:
                    new_data.append(item)
                    
            img.putdata(new_data)
            
            # Save it back (always as PNG to preserve transparency)
            base_name = os.path.splitext(filename)[0]
            new_filepath = os.path.join(customer_dir, base_name + ".png")
            
            img.save(new_filepath, "PNG")
            
            # If it was a JPG originally, remove the original so we don't have duplicates
            if filepath != new_filepath:
                os.remove(filepath)
                
            print(f"Processed {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("Done processing all logos!")
