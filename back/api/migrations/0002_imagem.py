# Generated by Django 5.0.7 on 2024-09-20 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Imagem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Imagem', models.ImageField(blank=True, null=True, upload_to='capas/')),
            ],
        ),
    ]
