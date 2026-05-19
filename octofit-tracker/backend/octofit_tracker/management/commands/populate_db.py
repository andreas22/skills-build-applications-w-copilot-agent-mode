
from django.core.management.base import BaseCommand
from django.db import connection
from octofit_tracker import models as octo_models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear collections using ORM
        from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Insert test data
        users = [
            {'name': 'Clark Kent', 'email': 'clark@dc.com', 'team': 'dc'},
            {'name': 'Bruce Wayne', 'email': 'bruce@dc.com', 'team': 'dc'},
            {'name': 'Diana Prince', 'email': 'diana@dc.com', 'team': 'dc'},
            {'name': 'Peter Parker', 'email': 'peter@marvel.com', 'team': 'marvel'},
            {'name': 'Tony Stark', 'email': 'tony@marvel.com', 'team': 'marvel'},
            {'name': 'Steve Rogers', 'email': 'steve@marvel.com', 'team': 'marvel'},
        ]
        teams = [
            {'name': 'marvel', 'members': ['Peter Parker', 'Tony Stark', 'Steve Rogers']},
            {'name': 'dc', 'members': ['Clark Kent', 'Bruce Wayne', 'Diana Prince']},
        ]
        activities = [
            {'user': 'Clark Kent', 'activity': 'Flight', 'duration': 60},
            {'user': 'Bruce Wayne', 'activity': 'Martial Arts', 'duration': 45},
            {'user': 'Diana Prince', 'activity': 'Lasso Training', 'duration': 30},
            {'user': 'Peter Parker', 'activity': 'Wall Climbing', 'duration': 50},
            {'user': 'Tony Stark', 'activity': 'Suit Testing', 'duration': 40},
            {'user': 'Steve Rogers', 'activity': 'Shield Practice', 'duration': 35},
        ]
        leaderboard = [
            {'team': 'marvel', 'points': 125},
            {'team': 'dc', 'points': 135},
        ]
        workouts = [
            {'name': 'Super Strength', 'suggested_for': ['Clark Kent', 'Steve Rogers']},
            {'name': 'Tech Mastery', 'suggested_for': ['Tony Stark']},
            {'name': 'Agility', 'suggested_for': ['Peter Parker', 'Diana Prince']},
        ]

        for user in users:
            User.objects.create(**user)
        for team in teams:
            Team.objects.create(**team)
        for activity in activities:
            Activity.objects.create(**activity)
        for entry in leaderboard:
            Leaderboard.objects.create(**entry)
        for workout in workouts:
            Workout.objects.create(**workout)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
