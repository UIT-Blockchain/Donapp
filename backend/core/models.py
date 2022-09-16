from django.db import models


class QuestCounter(models.Model):
    quest_id = models.CharField("Quest ID", max_length=100, null=False, blank=False)
    user_id = models.CharField("User ID", max_length=50, null=False, blank=False)

    def __str__(self):
        return self.quest_id

    def get_sum_votes(self):
        return QuestCounter.objects.filter(quest_id=self).count()

    class Meta:
        ordering = ['quest_id']