import os
from PIL import Image

customer_dir = r"d:\projects\poster-project\src\assets\customers"

def erode_white_edges(img, iterations=2):
    for _ in range(iterations):
        width, height = img.size
        data = list(img.getdata())
        new_data = list(data)
        
        for y in range(height):
            for x in range(width):
                idx = y * width + x
                r, g, b, a = data[idx]
                
                # Check if it's a visible pixel
                if a > 0:
                    # Check if it is a "white-ish" pixel (potential halo)
                    if r > 180 and g > 180 and b > 180:
                        # Check neighbors to see if it's an edge
                        is_edge = False
                        # Check 4-way neighbors
                        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < width and 0 <= ny < height:
                                n_idx = ny * width + nx
                                n_a = data[n_idx][3]
                                if n_a == 0:  # touches transparent background
                                    is_edge = True
                                    break
                        
                        if is_edge:
                            # Erase the white edge pixel
                            new_data[idx] = (r, g, b, 0)
        
        img.putdata(new_data)
        
    return img

for filename in os.listdir(customer_dir):
    if filename.endswith(".png"):
        filepath = os.path.join(customer_dir, filename)
        try:
            img = Image.open(filepath).convert("RGBA")
            img = erode_white_edges(img, iterations=3)  # Erode white fringes up to 3 pixels deep
            img.save(filepath, "PNG")
            print(f"Refined {filename}")
        except Exception as e:
            print(f"Error {filename}: {e}")

print("Done refining all logos!")
