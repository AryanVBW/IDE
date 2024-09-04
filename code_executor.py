from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/run-python', methods=['POST'])
def run_python():
  code = request.json['code']

  try:
    # Execute Python code (consider using a sandbox for security)
    exec(code)
    output = "Code executed successfully"  # Replace with actual output capture if needed
  except Exception as e:
    output = f"Error: {e}"

  return jsonify({'output': output})

if __name__ == '__main__':
  app.run(debug=True)
