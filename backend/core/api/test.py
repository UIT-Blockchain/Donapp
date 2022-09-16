import requests
import json


API_IP = 'http://127.0.0.1:8080/core/api/v1/'
API_TOKEN = '83f867cc03316a9f8f65c82135b75ba3b3f0e8af'

def create_quest_counter_example(quest_id, user_id):
    payload = {
        'quest_id': quest_id,
        'user_id': user_id,
    }
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + API_TOKEN
    }
    response = requests.request("POST", API_IP + "quest-counter/", headers=headers, data=json.dumps(payload))
    print(response.status_code, response.content)
    return response.status_code, response.content


if __name__ == '__main__':
    create_quest_counter_example("test.pool.quest_1", "user1")