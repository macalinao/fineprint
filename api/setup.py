from setuptools import setup

setup(
    name = 'server',
    packages=['server'],
    entry_points={
        'console_scripts': ['server = server.app:main'],
    },
    install_requires=[
        'flask==0.12.2',
        'mastercard-blockchain==0.0.2',
        'protobuf==3.4.0'
    ],
)
