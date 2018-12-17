# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from rest_framework import serializers

from users.models import User as UserModel


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = UserModel.objects.create(
            username=validated_data.get('username', None)
        )
        user.set_password(validated_data.get('password', None))
        user.save()

        return user

    def update(self, instance, validated_data):
        for field in validated_data:
            if field == 'password':
                instance.set_password(validated_data.get(field))
            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return instance

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'password', 'first_name', 'last_name',)
