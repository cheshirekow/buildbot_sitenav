from __future__ import absolute_import
from __future__ import unicode_literals

import io
import setuptools

with io.open("buildbot_sitenav/VERSION", encoding="utf-8") as infile:
  VERSION = infile.read().strip()

GITHUB_URL = 'https://github.com/cheshirekow/buildbot_sitenav'

with io.open('README.rst', encoding='utf-8') as infile:
  long_description = infile.read()

setuptools.setup(
    name='buildbot-sitenav',
    version=VERSION,
    description='Buildbot site navigation plugin',
    long_description=long_description,
    author='Josh Bialkowski',
    author_email='josh.bialkowski@gmail.com',
    url=GITHUB_URL,
    download_url='{}/archive/{}.tar.gz'.format(GITHUB_URL, VERSION),
    license='GNU GPL',
    packages=['buildbot_sitenav'],
    package_data={
        '': ['VERSION', 'static/*', 'doc/*']
    },
    entry_points="""
        [buildbot.www]
        sitenav = buildbot_sitenav:ep
    """,
)
