let pyodide = null;
let isPyodideLoaded = false;

// Initialize Pyodide
async function initPyodide() {
    try {
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        
        isPyodideLoaded = true;
        document.getElementById('loadingStatus').classList.add('hidden');
        console.log('Pyodide loaded successfully!');
    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        document.getElementById('loadingStatus').innerHTML = 
            '<span style="color: #f85149;">❌ Failed to load Python. Please refresh the page.</span>';
    }
}

// Start loading Pyodide on page load
window.addEventListener('load', initPyodide);

// Run code
async function runCode() {
    const code = document.getElementById('codeEditor').value;
    const outputDiv = document.getElementById('output');
    const runBtn = document.getElementById('runBtn');
    
    if (!code.trim()) {
        outputDiv.innerHTML = '<div class="output-error">⚠️ Please enter some code first!</div>';
        return;
    }
    
    if (!isPyodideLoaded) {
        outputDiv.innerHTML = '<div class="output-error">⏳ Python is still loading... Please wait a moment.</div>';
        return;
    }
    
    // Disable button and show loading
    runBtn.disabled = true;
    runBtn.innerHTML = '<span>⏳</span> Running...';
    
    // Clear previous output
    outputDiv.innerHTML = '';
    
    try {
        // Capture output
        let output = [];
        let errors = [];
        
        // Redirect stdout and stderr
        pyodide.setStdout({ batched: (msg) => output.push(msg) });
        pyodide.setStderr({ batched: (msg) => errors.push(msg) });
        
        // Run the code
        await pyodide.runPythonAsync(code);
        
        // Display output
        let html = '<div class="output-content">';
        
        if (output.length > 0) {
            html += output.join('\n');
        }
        
        if (errors.length > 0) {
            html += '</div><div class="output-error">' + errors.join('\n') + '</div><div class="output-content">';
        }
        
        html += '</div>';
        
        outputDiv.innerHTML = html;
        
    } catch (error) {
        outputDiv.innerHTML = `<div class="output-error">❌ Error: ${error.message}</div>`;
    } finally {
        // Re-enable button
        runBtn.disabled = false;
        runBtn.innerHTML = '<span>▶️</span> Run Code';
    }
}

// Clear code
function clearCode() {
    document.getElementById('codeEditor').value = '';
    updateCharCount();
}

// Clear output
function clearOutput() {
    document.getElementById('output').innerHTML = '<div class="output-placeholder"><p>👆 Click "Run Code" to see results here</p></div>';
}

// Update character count
function updateCharCount() {
    const code = document.getElementById('codeEditor').value;
    document.getElementById('charCount').textContent = code.length;
}

// Load example code
function loadExample() {
    const example = `# Welcome to Python Code Runner!
# Try this example and click "Run Code"

print("🚀 Welcome to CodeHub Python Runner!")
print("=" * 50)

# Variables
name = "Coder"
age = 20

print(f"Hello, {name}!")
print(f"You are {age} years old")

# Loop
print("\\n📊 Counting from 1 to 5:")
for i in range(1, 6):
    print(f"  Number: {i}")

# List
fruits = ["🍎 Apple", "🍌 Banana", "🍇 Grapes"]
print("\\n🍓 Fruits list:")
for fruit in fruits:
    print(f"  - {fruit}")

print("\\n✅ Code executed successfully!")`;
    
    document.getElementById('codeEditor').value = example;
    updateCharCount();
}

// Load sample codes
function loadSample(type) {
    const samples = {
        heart: `# ❤️ Heart Animation using Turtle
import turtle
import math

def heart1(M):
    return 15*math.sin(M)**3

def heart2(M):
    return 12*math.cos(M)-5*math.cos(2*M)-2*math.cos(3*M)-math.cos(4*M)

print("Drawing heart...")
print("This will open a window with a heart animation")
print("Close the window to continue")

# Note: This requires a display window
# For browser testing, use simple print version:

print("❤️ Heart Pattern:")
for i in range(10, 0, -1):
    spaces = ' ' * (10 - i)
    hearts = '❤️ ' * i
    print(spaces + hearts)

print("\\n💖 Love from CodeHub!")`,

        calculator: `# 🧮 Simple Calculator

def calculator():
    print("🧮 Simple Calculator")
    print("=" * 30)
    
    # Get numbers from user
    num1 = float(input("Enter first number: "))
    operator = input("Enter operator (+, -, *, /): ")
    num2 = float(input("Enter second number: "))
    
    # Calculate
    if operator == '+':
        result = num1 + num2
    elif operator == '-':
        result = num1 - num2
    elif operator == '*':
        result = num1 * num2
    elif operator == '/':
        if num2 != 0:
            result = num1 / num2
        else:
            return "Error: Division by zero!"
    else:
        return "Error: Invalid operator!"
    
    return f"Result: {num1} {operator} {num2} = {result}"

# For demo purposes, let's use fixed values
print("Demo calculation:")
print("10 + 5 =", 10 + 5)
print("20 - 8 =", 20 - 8)
print("6 * 7 =", 6 * 7)
print("15 / 3 =", 15 / 3)

print("\\n✅ Calculator ready!")`,

        pattern: `# 🔢 Number Patterns

print("Pattern 1: Pyramid")
print("-" * 30)
rows = 5
for i in range(1, rows + 1):
    spaces = ' ' * (rows - i)
    numbers = ''.join(str(j) for j in range(1, i + 1))
    print(spaces + numbers)

print("\\nPattern 2: Diamond")
print("-" * 30)
n = 4
# Upper half
for i in range(1, n + 1):
    spaces = ' ' * (n - i)
    stars = '* ' * i
    print(spaces + stars)
# Lower half
for i in range(n - 1, 0, -1):
    spaces = ' ' * (n - i)
    stars = '* ' * i
    print(spaces + stars)

print("\\nPattern 3: Fibonacci Sequence")
print("-" * 30)
a, b = 0, 1
for i in range(10):
    print(a, end=' ')
    a, b = b, a + b

print("\\n\\n✅ Patterns complete!")`,

        plot: `# 📈 Simple Graph Plotting
# Note: Full matplotlib needs GUI, using text-based plot

import math

print("📈 Sine Wave Pattern")
print("=" * 40)

# Create text-based sine wave
for i in range(20):
    x = i * 0.3
    y = math.sin(x)
    # Convert y (-1 to 1) to spaces (0 to 40)
    spaces = int((y + 1) * 20)
    print(' ' * spaces + '●')

print("\\n📊 Data Visualization")
print("=" * 40)

# Simple bar chart
data = {'Jan': 30, 'Feb': 45, 'Mar': 60, 'Apr': 40, 'May': 55}
for month, value in data.items():
    bar = '█' * (value // 2)
    print(f"{month}: {bar} {value}")

print("\\n✅ Graph complete!")`
    };
    
    document.getElementById('codeEditor').value = samples[type];
    updateCharCount();
}

// Event listeners
document.getElementById('codeEditor').addEventListener('input', updateCharCount);

// Keyboard shortcut (Ctrl/Cmd + Enter to run)
document.getElementById('codeEditor').addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        runCode();
    }
});