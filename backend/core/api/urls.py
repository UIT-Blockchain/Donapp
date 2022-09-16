from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import QuestCounterViewSet

router = routers.DefaultRouter()
router.register(r'quest-counter', QuestCounterViewSet)


schema_view = get_schema_view(
   openapi.Info(
      title="Web API",
      default_version='v1',
      description="Description",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
app_name = 'news_api'
urlpatterns = [
    path('v1/', include(router.urls)),
    path('doc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]
