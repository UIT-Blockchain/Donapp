from django.template.context_processors import request
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import QuestCounter, Quest
from .pagination import QuestCounterPageNumberPagination
from .serializers import QuestCounterSerializer, QuestSerializer


class QuestCounterViewSet(viewsets.ModelViewSet):
    queryset = QuestCounter.objects.all()
    serializer_class = QuestCounterSerializer

    permission_classes = (IsAuthenticated,)


class QuestCounterByIdViewSet(viewsets.ModelViewSet):
    queryset = QuestCounter.objects.all()
    serializer_class = QuestCounterSerializer

    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        quest_id = self.request.query_params.get('quest_id', None)
        if quest_id:
            count_query = QuestCounter.objects.filter(quest_id__exact=quest_id)
            if count_query:
                quest = count_query
            else:
                quest = []
        else:
            quest = []
        return quest


class VoteStatusViewSet(viewsets.ModelViewSet):
    queryset = QuestCounter.objects.all()
    serializer_class = QuestCounterSerializer

    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        quest_id = self.request.query_params.get('quest_id', None)
        user_id = self.request.query_params.get('user_id', None)

        if quest_id and user_id:
            count_query = QuestCounter.objects.filter(quest_id__exact=quest_id).filter(user_id__exact=user_id)
            if count_query:
                quest = count_query
            else:
                quest = []
        else:
            quest = []
        return quest


class QuestViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer

    permission_classes = (IsAuthenticated,)


class QuestByIdViewSet(viewsets.ModelViewSet):
    queryset = Quest.objects.all()
    serializer_class = QuestSerializer

    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        streamer_id = self.request.query_params.get('streamer_id', None)
        if quest_id:
            count_query = Quest.objects.filter(streamer_id__exact=streamer_id)
            if count_query:
                quest = count_query
            else:
                quest = []
        else:
            quest = []
        return quest

