from rest_framework.pagination import PageNumberPagination


class QuestCounterPageNumberPagination(PageNumberPagination):
    """
    Custom pagination for good news
    """
    page_size = 50 # for testing


class QuestPageNumberPagination(PageNumberPagination):
    """
    Custom pagination for good news
    """
    page_size = 50 # for testing
