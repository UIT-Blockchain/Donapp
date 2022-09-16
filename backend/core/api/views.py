from django.template.context_processors import request
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import QuestCounter
from .pagination import QuestCounterPageNumberPagination
from .serializers import QuestCounterSerializer


class QuestCounterViewSet(viewsets.ModelViewSet):
    queryset = QuestCounter.objects.all()
    serializer_class = QuestCounterSerializer

    permission_classes = (IsAuthenticated,)
