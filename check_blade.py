
import sys

def check_blade(content):
    stack = []
    directives = [
        ('if', 'endif'),
        ('auth', 'endauth'),
        ('guest', 'endguest'),
        ('unless', 'endunless'),
        ('section', 'endsection'),
        ('push', 'endpush'),
        ('prepend', 'endprepend'),
        ('foreach', 'endforeach'),
        ('forelse', 'endforelse'),
        ('for', 'endfor'),
        ('while', 'endwhile'),
        ('php', 'endphp'),
    ]
    
    starts = [d[0] for d in directives]
    ends = [d[1] for d in directives]
    
    import re
    # matches @directive or @directive(...)
    matches = re.finditer(r'@(\w+)', content)
    
    for match in matches:
        d = match.group(1)
        if d in starts:
            stack.append((d, content.count('\n', 0, match.start()) + 1))
        elif d in ends:
            # find matching start
            expected_start = next(start for start, end in directives if end == d)
            if not stack:
                print(f"Error: Found @{d} without starting @{expected_start} at line {content.count('\n', 0, match.start()) + 1}")
                continue
            
            last_start, line = stack.pop()
            if last_start != expected_start:
                print(f"Error: Found @{d} but expected @{next(end for start, end in directives if start == last_start)} (started at line {line})")
                stack.append((last_start, line)) # put it back
                
    for d, line in stack:
        print(f"Error: Unclosed @{d} starting at line {line}")

if __name__ == "__main__":
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        check_blade(f.read())
