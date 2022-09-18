from django.db import models
from django.db.models.functions import Lower


class Quest(models.Model):
    class Meta:
        ordering = ['streamer_id', 'quest_id']
        verbose_name = 'Quest'
        verbose_name_plural = 'Quests'
        unique_together = ('streamer_id', 'quest_id',)
    streamer_id = models.CharField("Streamer ID", max_length=50, null=False, blank=False)
    quest_id = models.CharField("Quest ID", max_length=100, null=False, blank=False)

    def __str__(self):
        return self.streamer_id

    def get_sum_quest(self):
        return Quest.objects.filter(streamer_id=self).count()


class QuestCounter(models.Model):
    class Meta:
        ordering = ['quest_id', 'user_id']
        verbose_name = 'QuestCounter'
        verbose_name_plural = 'QuestCounters'
        unique_together = ('quest_id', 'user_id',)
        constraints = [
            models.UniqueConstraint(
                fields=["quest_id", "user_id"],
                name="unique_user_id_for_quest_id",
            ),
            models.UniqueConstraint(
                Lower("quest_id"), Lower("user_id"),
                name="unique_user_id_quest_id_lower",
            ),
        ]
        db_table = 'quest_counter'
    quest_id = models.CharField("Quest ID", max_length=100, null=False, blank=False)
    user_id = models.CharField("User ID", max_length=50, null=False, blank=False)

    def __str__(self):
        return self.quest_id

    def get_sum_votes(self):
        return QuestCounter.objects.filter(quest_id=self).count()
