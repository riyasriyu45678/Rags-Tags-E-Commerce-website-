# Generated by Django 4.1.1 on 2022-12-14 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomapp', '0002_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='complete',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_ordered',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
