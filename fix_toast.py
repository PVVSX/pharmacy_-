import os
import glob

files = glob.glob("src/**/*.tsx", recursive=True) + glob.glob("src/**/*.ts", recursive=True)

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if "toast." in content and "import { toast } from \"sonner\";" not in content and "import { toast } from 'sonner';" not in content:
        # add the import at the top
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.startswith("import"):
                lines.insert(i, 'import { toast } from "sonner";')
                break
        else:
            lines.insert(0, 'import { toast } from "sonner";')
            
        with open(f, 'w', encoding='utf-8') as file:
            file.write('\n'.join(lines))
        print("Fixed", f)
