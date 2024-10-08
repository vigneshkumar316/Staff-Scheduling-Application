# Generated by Django 5.0.7 on 2024-08-13 03:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Boat',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=100)),
                ('user_email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='BoatData',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=50)),
                ('capacity', models.IntegerField()),
                ('features', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('age', models.IntegerField()),
                ('date', models.DateField()),
                ('persons', models.IntegerField()),
                ('rooms', models.IntegerField()),
                ('food', models.CharField(max_length=50)),
                ('days', models.IntegerField()),
                ('boat_name', models.CharField(max_length=100)),
                ('boat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.boat')),
            ],
        ),
    ]
