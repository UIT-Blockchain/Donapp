from rest_framework import serializers
from ..models import QuestCounter, Quest
import string
import random


# initializing size of quest_id
N = 10


class QuestCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestCounter
        fields = ('pk', 'quest_id', 'user_id')

    def create(self, validated_data):
        return QuestCounter.objects.create(**validated_data)


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('pk', 'streamer_id', 'quest_id')

    def create(self, validated_data):
        # using random.choices()
        # generating random strings
        if validated_data['quest_id'] == 'auto':
            res = validated_data['streamer_id'] + '.pool.' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
            validated_data["quest_id"] = res
        return Quest.objects.create(**validated_data)


class QuestRetrievalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ('pk', 'streamer_id', 'quest_id')
