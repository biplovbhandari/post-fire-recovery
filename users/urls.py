# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from users import views

urlpatterns = [
    url(r'^api/v1/user/$', views.UserList.as_view(), name='user-list'),
    url(r'^api/v1/user/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^api/v1/user/login/', views.login),
    url(r'^api/v1/user/register/', views.UserCreate.as_view(), name='user-create'),
]
