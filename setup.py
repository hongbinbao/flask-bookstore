#!/usr/bin/env python

from distutils.core import setup

setup(name='BookStore',
      version='1.0',
      description='BookStore - Flask app',
      author='Minh Son Nguyen',
      author_email='minh.son.nguyen.1209@gmail.com',
      url='',
      packages=['app', 'app.routes', 'app.services'],
      install_requires=[
          'flask',
          'pymongo'
      ])
