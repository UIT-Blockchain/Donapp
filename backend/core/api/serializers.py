from rest_framework import serializers
from ..models import QuestCounter


class QuestCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestCounter
        fields = ('pk', 'quest_id', 'user_id')

    def create(self, validated_data):
        return QuestCounter.objects.create(**validated_data)
