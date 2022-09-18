from rest_framework import serializers
from ..models import QuestCounter, Quest


class QuestCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestCounter
        fields = ('pk', 'quest_id', 'user_id')

    def create(self, validated_data):
        return QuestCounter.objects.create(**validated_data)


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestCounter
        fields = ('pk', 'streamer_id', 'quest_id')

    def create(self, validated_data):
        return Quest.objects.create(**validated_data)
