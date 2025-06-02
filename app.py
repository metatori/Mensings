
from flask import Flask, request, jsonify
from services.attendance_service import check_attendance

app = Flask(__name__)

@app.route('/')
def home():
    return "Lotto Backend Running!"

@app.route('/attendance', methods=['POST'])
def attendance():
    user_id = request.json.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID required"}), 400
    return check_attendance(user_id)

if __name__ == '__main__':
    app.run(debug=True)
