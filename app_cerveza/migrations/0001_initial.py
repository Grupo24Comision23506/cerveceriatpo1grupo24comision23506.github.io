# Generated by Django 4.2.1 on 2023-12-12 02:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Cerveza",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=200)),
                ("rating", models.PositiveSmallIntegerField()),
                ("abv", models.FloatField(blank=True, null=True)),
            ],
            options={
                "db_table": "cerveza_table",
            },
        ),
    ]
