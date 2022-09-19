import requests
import json


API_IP = 'http://127.0.0.1:8080/core/api/v1/'
API_TOKEN = 'b7cc230a3fed86e884cbf30c2d1cbac21d84de6b'


def create_quest(streamer_id):
    payload = {
        'streamer_id': streamer_id,
        'quest_id': 'auto'
    }
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + API_TOKEN
    }
    response = requests.request("POST", API_IP + "quest/", headers=headers, data=json.dumps(payload))
    print(response.status_code, response.content)
    return response.status_code, response.content


def get_all_quest_by_streamer_id(streamer_id):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + API_TOKEN
    }
    response = requests.request("GET", API_IP + f"get-quest-by-streamer/?streamer_id={streamer_id}&format=json", headers=headers)
    print(response.status_code, response.content)
    return response.status_code, response.content


def get_all_quest_counter_example():
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + API_TOKEN
    }
    response = requests.request("GET", API_IP + "quest-counter/?format=json", headers=headers)
    print(response.status_code, response.content)
    return response.status_code, response.content


def create_quest_counter(quest_id, user_id):
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


def get_all_quest_counter_by_quest_id(quest_id):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + API_TOKEN
    }
    response = requests.request("GET", API_IP + f"get-quest-counter-by-id/?quest_id={quest_id}&format=json", headers=headers)
    print(response.status_code, response.content)
    return response.status_code, response.content


def get_vote_status(quest_id, user_id):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'token ' + API_TOKEN
    }
    response = requests.request("GET", API_IP + f"get-vote-status/?quest_id={quest_id}&user_id={user_id}&format=json", headers=headers)
    print(response.status_code, response.content)
    return response.status_code, response.content


if __name__ == '__main__':
    create_quest("hoho")
    # get_all_quest_by_streamer_id("haha")
    # create_quest_counter("test.pool.quest_1", "user1")
    # get_all_quest_counter_example()
    # get_all_quest_counter_by_quest_id("test.pool.quest_1")
    # get_vote_status("test.pool.quest_1", "user1")