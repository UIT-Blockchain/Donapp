from django.contrib import admin
from django.db import models
from django.forms import TextInput, Textarea
from .models import QuestCounter, Quest


class QuestCounterAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size': '100'})},
    }
    search_fields = ('quest_id', 'user_id')
    list_display = ('quest_id', 'user_id')
    list_filter = ('quest_id', 'user_id')

admin.site.register(QuestCounter, QuestCounterAdmin)


class QuestAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size': '100'})},
    }
    search_fields = ('streamer_id', 'quest_id', )
    list_display = ('streamer_id', 'quest_id', )
    list_filter = ('streamer_id', 'quest_id', )

admin.site.register(Quest, QuestAdmin)
