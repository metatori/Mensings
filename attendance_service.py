
from flask import jsonify

# 임시로 사용자 정보를 메모리에 저장 (DB는 추후 연결 예정)
users = {}

def check_attendance(user_id):
    if user_id not in users:
        users[user_id] = 0

    users[user_id] += 10  # 출석 시 10포인트 지급
    return jsonify({"message": "출석 완료", "points": users[user_id]})
