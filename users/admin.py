# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.contrib import admin

from .models import User as UserModel

admin.site.register(UserModel)